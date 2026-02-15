const prisma = require("../config/db");
const { sendSuccess, sendError } = require("../utils/http");

/**
 * POST /api/mood
 * Add today's mood
 */
exports.addMood = async (req, res, next) => {
  try {
    const { value } = req.body;

    if (!value || value < 1 || value > 5) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Mood must be between 1 and 5"
      );
    }

    const mood = await prisma.mood.create({
      data: {
        value: Number(value),
        userId: req.user.id
      }
    });

    return res.status(201).json({ success: true, data: mood });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/mood/history
 * Last 7 days mood history
 */
exports.getMoodHistory = async (req, res, next) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const moods = await prisma.mood.findMany({
      where: {
        userId: req.user.id,
        date: {
          gte: sevenDaysAgo
        }
      },
      orderBy: {
        date: "asc"
      }
    });

    return sendSuccess(res, moods);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/mood/weekly-trend
 * Mood analytics (average + trend)
 */
exports.getWeeklyMoodTrend = async (req, res, next) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const moods = await prisma.mood.findMany({
      where: {
        userId: req.user.id,
        date: { gte: sevenDaysAgo }
      },
      orderBy: { date: "asc" }
    });

    if (moods.length === 0) {
      return sendSuccess(res, { averageMood: 0, trend: "NO_DATA" });
    }

    const total = moods.reduce((sum, m) => sum + m.value, 0);
    const averageMood = (total / moods.length).toFixed(2);

    const first = moods[0].value;
    const last = moods[moods.length - 1].value;

    let trend = "STABLE";
    if (last > first) trend = "IMPROVING";
    if (last < first) trend = "DECLINING";

    return sendSuccess(res, {
      averageMood,
      trend,
      dataPoints: moods.length,
    });
  } catch (error) {
    next(error);
  }
};
