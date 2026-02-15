const prisma = require("../config/db");
const { sendSuccess, sendError } = require("../utils/http");
const {
  generateReflectionPrompt,
  RateLimitError,
} = require("../services/ai.service");

exports.addReflection = async (req, res, next) => {
  try {
    const { prompt, question, answer } = req.body;
    const resolvedPrompt = prompt || question;

    if (!resolvedPrompt || !answer) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Prompt and answer are required"
      );
    }

    const reflection = await prisma.reflection.create({
      data: {
        question: resolvedPrompt,
        answer,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      success: true,
      data: {
        id: reflection.id,
        prompt: reflection.question,
        answer: reflection.answer,
        date: reflection.date,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getPrompt = async (req, res, next) => {
  try {
    const phase = req.user?.currentPhase || "CALM";
    const latestMood = await prisma.mood.findFirst({
      where: { userId: req.user.id },
      orderBy: { date: "desc" },
    });

    const aiPrompt = await generateReflectionPrompt({
      userId: req.user.id,
      currentPhase: phase,
      latestMood: latestMood?.value,
    });

    return sendSuccess(res, { prompt: aiPrompt.prompt, source: aiPrompt.source });
  } catch (err) {
    if (err instanceof RateLimitError) {
      return sendError(res, 429, err.code, err.message);
    }
    next(err);
  }
};

exports.getReflections = async (req, res, next) => {
  try {
    const reflections = await prisma.reflection.findMany({
      where: { userId: req.user.id },
      orderBy: { date: "desc" },
    });

    return sendSuccess(
      res,
      reflections.map((reflection) => ({
        id: reflection.id,
        prompt: reflection.question,
        answer: reflection.answer,
        date: reflection.date,
      }))
    );
  } catch (error) {
    next(error);
  }
};
