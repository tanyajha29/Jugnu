const prisma = require("../config/db");
const { sendSuccess } = require("../utils/http");
const prompts = require("../utils/reflections.prompts");

const fallbackMessages = {
  STRESS: "It's okay to pause. Let's take one slow breath together.",
  ANXIETY: "You're safe in this moment. We can move gently, one step at a time.",
  LONELINESS: "You're not alone here. I'm glad you showed up today.",
  CONFUSION: "It's okay not to have everything figured out right now.",
  LOW_MOTIVATION: "Small steps still count. Let's keep it light and kind.",
  CALM: "Hold onto this steadiness. You're doing well.",
};

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

const buildWeeklyInsight = (weeklyTrend) => {
  const moodValues = weeklyTrend
    .map((entry) => entry.mood)
    .filter((value) => typeof value === "number");

  if (moodValues.length < 2) {
    return {
      trend: "NO_DATA",
      summary: "We'll learn your rhythm over time. Keep checking in gently.",
      averageMood: moodValues[0] ?? null,
    };
  }

  const averageMood =
    moodValues.reduce((sum, value) => sum + value, 0) / moodValues.length;
  const first = moodValues[0];
  const last = moodValues[moodValues.length - 1];

  let trend = "STABLE";
  if (last > first) trend = "IMPROVING";
  if (last < first) trend = "DECLINING";

  const summaries = {
    IMPROVING:
      "Your week looks a little lighter toward the end. That's worth noticing.",
    DECLINING:
      "It looks like the week felt heavier over time. Let's keep things gentle.",
    STABLE:
      "Your mood has been fairly steady this week. Consistency can be calming.",
  };

  return {
    trend,
    summary: summaries[trend],
    averageMood: Number(averageMood.toFixed(2)),
  };
};

exports.getDashboard = async (req, res, next) => {
  try {
    const user = req.user;
    const userId = user.id;
    const phase = user.currentPhase || "CALM";
    const safePhase = fallbackMessages[phase] ? phase : "CALM";

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
    const insight = buildWeeklyInsight(weeklyTrend);

    const dailyMessage = await prisma.dailyMessage.findFirst({
      where: { phase: safePhase },
      orderBy: { createdAt: "desc" },
    });

    return sendSuccess(res, {
      timeOfDay: getTimeOfDay(),
      userName: user.name,
      currentPhase: safePhase,
      reflectionPrompt: {
        text: prompts[safePhase] || "What felt most present for you today?",
      },
      insight,
      dailyMessage: {
        text: dailyMessage?.message || fallbackMessages[safePhase],
        source: dailyMessage ? "seed" : "fallback",
        generatedAt: dailyMessage?.createdAt || new Date(),
      },
      weeklyTrend,
    });
  } catch (error) {
    next(error);
  }
};
