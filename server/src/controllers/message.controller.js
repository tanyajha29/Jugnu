const prisma = require("../config/db");
const { sendSuccess } = require("../utils/http");

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

    const message = await prisma.dailyMessage.findFirst({
      where: { phase: safePhase },
      orderBy: { createdAt: "desc" },
    });

    const text = message?.message || fallbackMessages[safePhase];

    return sendSuccess(res, {
      text,
      phase: safePhase,
      generatedAt: message?.createdAt || new Date(),
      source: message ? "seed" : "fallback",
    });
  } catch (err) {
    next(err);
  }
};
