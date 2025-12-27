const prisma = require("../config/db");

/**
 * Dashboard summary:
 * - avg mood (last 7 days)
 * - current phase
 * - total moods logged
 */
exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const moods = await prisma.mood.findMany({
      where: {
        userId,
        date: { gte: sevenDaysAgo }
      }
    });

    const avgMood =
      moods.length > 0
        ? moods.reduce((sum, m) => sum + m.value, 0) / moods.length
        : null;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { currentPhase: true }
    });

    res.json({
      averageMood: avgMood,
      currentPhase: user.currentPhase,
      moodsThisWeek: moods.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
