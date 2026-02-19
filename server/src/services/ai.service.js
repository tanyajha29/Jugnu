const {
  buildDailyMessagePrompt,
  buildReflectionPrompt,
  buildWeeklyInsightPrompt,
  fallbackDailyMessages,
  fallbackReflectionPrompt,
  fallbackWeeklyInsight,
} = require("./ai.prompts");
const { safeOutput } = require("./ai.safety");

const OLLAMA_URL = process.env.OLLAMA_URL;
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "mistral";
const OLLAMA_TIMEOUT_MS = Number(process.env.OLLAMA_TIMEOUT_MS || 6000);

const dailyCache = new Map();
const weeklyCache = new Map();
const rateLimitStore = new Map();

class RateLimitError extends Error {
  constructor(message = "AI rate limit exceeded") {
    super(message);
    this.code = "RATE_LIMIT";
    this.status = 429;
  }
}

const withTimeout = async (promise, timeoutMs) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await promise(controller.signal);
    return response;
  } finally {
    clearTimeout(timeout);
  }
};

const callOllama = async (prompt) => {
  if (!OLLAMA_URL) {
    throw new Error("OLLAMA_URL not set");
  }
  const response = await withTimeout(
    (signal) =>
      fetch(OLLAMA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          prompt,
          stream: false,
        }),
        signal,
      }),
    OLLAMA_TIMEOUT_MS
  );

  if (!response || !response.ok) {
    throw new Error("Ollama request failed");
  }

  const payload = await response.json();
  if (!payload || typeof payload.response !== "string") {
    throw new Error("Invalid Ollama response");
  }

  return payload.response;
};

const getDateKey = (date = new Date()) => date.toISOString().slice(0, 10);

const getWeekKey = (date = new Date()) => {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(0, 0, 0, 0);
  return copy.toISOString().slice(0, 10);
};

const checkRateLimit = (userId) => {
  const now = Date.now();
  const windowStart = now - 60 * 60 * 1000;
  const history = rateLimitStore.get(userId) || [];
  const filtered = history.filter((timestamp) => timestamp > windowStart);

  if (filtered.length >= 5) {
    rateLimitStore.set(userId, filtered);
    return false;
  }

  filtered.push(now);
  rateLimitStore.set(userId, filtered);
  return true;
};

const getFallbackMessage = (phase) =>
  fallbackDailyMessages[phase] || fallbackDailyMessages.CALM;

const countWords = (text = "") => (text ? text.split(/\s+/).length : 0);

const isValidReflectionPrompt = (text) => {
  if (!text || !text.includes("?")) return false;
  const words = countWords(text);
  return words >= 6 && words <= 20;
};

const isValidWeeklyInsight = (text) => {
  const words = countWords(text);
  return words >= 20 && words <= 80;
};

const deriveTrend = (weeklyTrend = []) => {
  const values = weeklyTrend
    .map((entry) => entry.mood)
    .filter((value) => typeof value === "number");

  if (values.length < 2) return "NO_DATA";
  const first = values[0];
  const last = values[values.length - 1];
  if (last > first) return "IMPROVING";
  if (last < first) return "DECLINING";
  return "STABLE";
};

const generateDailyMessage = async ({
  userId,
  currentPhase,
  lastThreeMoods = [],
  timeOfDay,
  allowFallbackOnLimit = false,
}) => {
  const phase = currentPhase || "CALM";
  const cacheKey = `${userId}:${getDateKey()}`;

  if (dailyCache.has(cacheKey)) {
    return { ...dailyCache.get(cacheKey), cached: true };
  }

  if (!checkRateLimit(userId)) {
    if (allowFallbackOnLimit) {
      return {
        text: getFallbackMessage(phase),
        source: "fallback",
        generatedAt: new Date(),
        cached: false,
      };
    }
    throw new RateLimitError();
  }

  const prompt = buildDailyMessagePrompt({
    currentPhase: phase,
    lastThreeMoods,
    timeOfDay,
  });

  try {
    const raw = await callOllama(prompt);
    const safeText = safeOutput({
      text: raw,
      fallback: getFallbackMessage(phase),
    });

    const result = {
      text: safeText,
      source: safeText === getFallbackMessage(phase) ? "fallback" : "ai",
      generatedAt: new Date(),
      cached: false,
    };

    dailyCache.set(cacheKey, result);
    return result;
  } catch (error) {
    return {
      text: getFallbackMessage(phase),
      source: "fallback",
      generatedAt: new Date(),
      cached: false,
    };
  }
};

const generateReflectionPrompt = async ({
  userId,
  currentPhase,
  latestMood,
  allowFallbackOnLimit = false,
}) => {
  const phase = currentPhase || "CALM";

  if (!checkRateLimit(userId)) {
    if (allowFallbackOnLimit) {
      return {
        prompt: fallbackReflectionPrompt,
        source: "fallback",
      };
    }
    throw new RateLimitError();
  }

  const prompt = buildReflectionPrompt({
    currentPhase: phase,
    latestMood,
  });

  try {
    const raw = await callOllama(prompt);
    let safeText = safeOutput({
      text: raw,
      fallback: fallbackReflectionPrompt,
    });

    if (!isValidReflectionPrompt(safeText)) {
      safeText = fallbackReflectionPrompt;
    }

    return {
      prompt: safeText,
      source: safeText === fallbackReflectionPrompt ? "fallback" : "ai",
    };
  } catch (error) {
    return { prompt: fallbackReflectionPrompt, source: "fallback" };
  }
};

const generateWeeklyInsight = async ({
  userId,
  weeklyTrend = [],
  averageMood,
  allowFallbackOnLimit = false,
}) => {
  const cacheKey = `${userId}:${getWeekKey()}`;

  if (weeklyCache.has(cacheKey)) {
    return { ...weeklyCache.get(cacheKey), cached: true };
  }

  if (!checkRateLimit(userId)) {
    if (allowFallbackOnLimit) {
      return {
        ...fallbackWeeklyInsight,
        averageMood: averageMood ?? null,
        source: "fallback",
        cached: false,
      };
    }
    throw new RateLimitError();
  }

  const prompt = buildWeeklyInsightPrompt({
    weeklyTrend,
    averageMood,
  });

  try {
    const raw = await callOllama(prompt);
    let safeText = safeOutput({
      text: raw,
      fallback: fallbackWeeklyInsight.summary,
    });

    if (!isValidWeeklyInsight(safeText)) {
      safeText = fallbackWeeklyInsight.summary;
    }

    const result = {
      trend: deriveTrend(weeklyTrend),
      summary: safeText,
      averageMood: typeof averageMood === "number" ? averageMood : null,
      source: safeText === fallbackWeeklyInsight.summary ? "fallback" : "ai",
      cached: false,
    };

    weeklyCache.set(cacheKey, result);
    return result;
  } catch (error) {
    return {
      ...fallbackWeeklyInsight,
      trend: deriveTrend(weeklyTrend),
      averageMood: averageMood ?? null,
      source: "fallback",
      cached: false,
    };
  }
};

module.exports = {
  generateDailyMessage,
  generateReflectionPrompt,
  generateWeeklyInsight,
  RateLimitError,
};
