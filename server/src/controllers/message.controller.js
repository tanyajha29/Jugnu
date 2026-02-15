const prisma = require("../config/db");
const { sendSuccess, sendError } = require("../utils/http");
const {
  generateDailyMessage,
  RateLimitError,
} = require("../services/ai.service");

const fallbackMessages = {
  STRESS: "It's okay to pause. Let's take one slow breath together.",
  ANXIETY: "You're safe in this moment. We can move gently, one step at a time.",
  LONELINESS: "You're not alone here. I'm glad you showed up today.",
  CONFUSION: "It's okay not to have everything figured out right now.",
  LOW_MOTIVATION: "Small steps still count. Let's keep it light and kind.",
  CALM: "Hold onto this steadiness. You're doing well.",
};

exports.getDailyMessage = async (req, res, next) => {
  try {
    const userPhase = req.user?.currentPhase || "CALM";
    const safePhase = fallbackMessages[userPhase] ? userPhase : "CALM";

    const recentMoods = await prisma.mood.findMany({
      where: { userId: req.user.id },
      orderBy: { date: "desc" },
      take: 3,
    });

    const timeOfDay = (() => {
      const hour = new Date().getHours();
      if (hour < 12) return "morning";
      if (hour < 18) return "afternoon";
      return "evening";
    })();

    const aiMessage = await generateDailyMessage({
      userId: req.user.id,
      currentPhase: safePhase,
      lastThreeMoods: recentMoods.map((mood) => mood.value),
      timeOfDay,
    });

    return sendSuccess(res, {
      text: aiMessage.text,
      phase: safePhase,
      generatedAt: aiMessage.generatedAt,
      source: aiMessage.source,
    });
  } catch (err) {
    if (err instanceof RateLimitError) {
      return sendError(res, 429, err.code, err.message);
    }
    next(err);
  }
};
