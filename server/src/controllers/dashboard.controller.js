const prisma = require("../config/db");
const { sendSuccess } = require("../utils/http");
const {
  fallbackDailyMessages,
  fallbackReflectionPrompt,
} = require("../services/ai.prompts");
const {
  generateDailyMessage,
  generateReflectionPrompt,
  generateWeeklyInsight,
} = require("../services/ai.service");

const getTimeOfDay = (date = new Date()) => {
  const hour = date.getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
};

const buildWeeklyTrend = (moods) => {
  const dayMap = new Map();
  const toKey = (d) => d.toISOString().slice(0, 10);

  moods.forEach((mood) => {
    const key = toKey(mood.date);
    const current = dayMap.get(key) || { sum: 0, count: 0 };
    current.sum += mood.value;
    current.count += 1;
    dayMap.set(key, current);
  });

  const today = new Date();
  const days = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (6 - index));
    return day;
  });

  return days.map((day) => {
    const key = toKey(day);
    const bucket = dayMap.get(key);
    const mood = bucket ? Number((bucket.sum / bucket.count).toFixed(2)) : null;
    return {
      day: day.toLocaleDateString("en-US", { weekday: "short" }),
      mood,
    };
  });
};

exports.getDashboard = async (req, res, next) => {
  try {
    const user = req.user;
    const userId = user.id;
    const phase = user.currentPhase || "CALM";
    const safePhase = fallbackDailyMessages[phase] ? phase : "CALM";

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const moods = await prisma.mood.findMany({
      where: {
        userId,
        date: { gte: sevenDaysAgo },
      },
      orderBy: { date: "asc" },
    });

    const weeklyTrend = buildWeeklyTrend(moods);

    const averageMood =
      moods.length > 0
        ? moods.reduce((sum, mood) => sum + mood.value, 0) / moods.length
        : null;

    const timeOfDay = getTimeOfDay();

    const recentMoods = moods
      .slice()
      .sort((a, b) => b.date - a.date)
      .slice(0, 3)
      .map((mood) => mood.value);

    const [dailyMessage, reflectionPrompt, weeklyInsight] = await Promise.all([
      generateDailyMessage({
        userId: userId,
        currentPhase: safePhase,
        lastThreeMoods: recentMoods,
        timeOfDay,
        allowFallbackOnLimit: true,
      }),
      generateReflectionPrompt({
        userId: userId,
        currentPhase: safePhase,
        latestMood: recentMoods[0],
        allowFallbackOnLimit: true,
      }),
      generateWeeklyInsight({
        userId: userId,
        weeklyTrend,
        averageMood,
        allowFallbackOnLimit: true,
      }),
    ]);

    return sendSuccess(res, {
      timeOfDay,
      userName: user.name,
      currentPhase: safePhase,
      latestMood: recentMoods[0] ?? null,
      reflectionPrompt: {
        text: reflectionPrompt.prompt || fallbackReflectionPrompt,
        source: reflectionPrompt.source || "fallback",
      },
      insight: weeklyInsight,
      dailyMessage: {
        text: dailyMessage.text,
        source: dailyMessage.source,
        generatedAt: dailyMessage.generatedAt,
      },
      weeklyTrend,
      averageMood,
    });
  } catch (error) {
    next(error);
  }
};
