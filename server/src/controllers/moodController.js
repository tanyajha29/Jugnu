const prisma = require("../config/db");

/**
 * POST /api/mood
 * Add today's mood
 */
exports.addMood = async (req, res) => {
  try {
    const { value } = req.body;

    if (!value || value < 1 || value > 5) {
      return res.status(400).json({ message: "Mood must be between 1 and 5" });
    }

    const mood = await prisma.mood.create({
      data: {
        value: Number(value),
        userId: req.user.id
      }
    });

    res.status(201).json(mood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/mood/history
 * Last 7 days mood history
 */
exports.getMoodHistory = async (req, res) => {
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

    res.json(moods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/mood/weekly-trend
 * Mood analytics (average + trend)
 */
exports.getWeeklyMoodTrend = async (req, res) => {
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
      return res.json({
        averageMood: 0,
        trend: "NO_DATA"
      });
    }

    const total = moods.reduce((sum, m) => sum + m.value, 0);
    const averageMood = (total / moods.length).toFixed(2);

    const first = moods[0].value;
    const last = moods[moods.length - 1].value;

    let trend = "STABLE";
    if (last > first) trend = "IMPROVING";
    if (last < first) trend = "DECLINING";

    res.json({
      averageMood,
      trend,
      dataPoints: moods.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
