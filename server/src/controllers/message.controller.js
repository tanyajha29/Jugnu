const prisma = require("../config/db");

exports.getDailyMessage = async (req, res) => {
  try {
    const userPhase = req.user.currentPhase;

    if (!userPhase) {
      return res.json({ message: "No phase assigned yet" });
    }

    const message = await prisma.dailyMessage.findFirst({
      where: { phase: userPhase },
      orderBy: { createdAt: "desc" }
    });

    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
