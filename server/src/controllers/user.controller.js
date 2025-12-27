const prisma = require("../config/db");

exports.getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        currentPhase: true
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

const allowedPhases = [
  "STRESS",
  "ANXIETY",
  "LONELINESS",
  "CONFUSION",
  "LOW_MOTIVATION",
];

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
    let { phase } = req.body;

    if (!phase) {
      return res.status(400).json({ message: "Phase required" });
    }

    // 🔹 Normalize user input
    const normalizedPhase = phase.trim().toUpperCase();

    // 🔹 Validate enum
    if (!allowedPhases.includes(normalizedPhase)) {
      return res.status(400).json({
        message: "Invalid life phase",
        allowedPhases,
      });
    }

    await prisma.user.update({
      where: { id: req.user.id },
      data: { currentPhase: normalizedPhase }, // ✅ ENUM SAFE
    });

    res.json({ message: `Phase set to ${normalizedPhase}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};