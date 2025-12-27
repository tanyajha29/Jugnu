const prisma = require("../config/db");
const prompts=require("../utils/reflections.prompts");
exports.addReflection = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer are required" });
    }

    const reflection = await prisma.reflection.create({
      data: {
        question,
        answer,
        userId: req.user.id
      }
    });

    res.status(201).json(reflection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getPrompt = (req, res) => {
  res.json({ prompt: prompts[req.user.currentPhase] });
};


exports.getReflections = async (req, res) => {
  try {
    const reflections = await prisma.reflection.findMany({
      where: { userId: req.user.id },
      orderBy: { date: "desc" }
    });

    res.json(reflections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
