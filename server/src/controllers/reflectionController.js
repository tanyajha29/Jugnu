const prisma = require("../config/db");
const prompts = require("../utils/reflections.prompts");
const { sendSuccess, sendError } = require("../utils/http");

const fallbackPrompt = "What felt most present for you today?";

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

exports.getPrompt = (req, res) => {
  const phase = req.user?.currentPhase;
  return sendSuccess(res, { prompt: prompts[phase] || fallbackPrompt });
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
