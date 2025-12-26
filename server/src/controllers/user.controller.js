const prisma = require("../config/db");

exports.getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};

exports.getPhase = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { currentPhase: true },
    });
    res.json({ currentPhase: user.currentPhase });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.setPhase = async (req, res) => {
  try {
    const { phase } = req.body;
    if (!phase) return res.status(400).json({ message: "Phase required" });

    await prisma.user.update({
      where: { id: req.user.id },
      data: { currentPhase: phase },
    });

    res.json({ message: `Phase set to ${phase}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};