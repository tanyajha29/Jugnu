const prisma = require("../config/db");
const { sendSuccess, sendError } = require("../utils/http");

const allowedPhases = [
  "STRESS",
  "ANXIETY",
  "LONELINESS",
  "CONFUSION",
  "LOW_MOTIVATION",
  "CALM",
];

exports.getMe = async (req, res, next) => {
  try {
    if (req.user) {
      return sendSuccess(res, req.user);
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        currentPhase: true,
      },
    });

    if (!user) {
      return sendError(res, 404, "NOT_FOUND", "User not found");
    }

    return sendSuccess(res, user);
  } catch (error) {
    next(error);
  }
};

exports.getPhase = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { currentPhase: true },
    });
    return sendSuccess(res, { currentPhase: user.currentPhase });
  } catch (err) {
    next(err);
  }
};

exports.setPhase = async (req, res, next) => {
  try {
    let { phase } = req.body;

    if (!phase) {
      return sendError(res, 400, "VALIDATION_ERROR", "Phase required");
    }

    const normalizedPhase = phase.trim().toUpperCase();

    if (!allowedPhases.includes(normalizedPhase)) {
      return sendError(res, 400, "VALIDATION_ERROR", "Invalid life phase", {
        allowedPhases,
      });
    }

    await prisma.user.update({
      where: { id: req.user.id },
      data: { currentPhase: normalizedPhase },
    });

    return sendSuccess(res, { message: `Phase set to ${normalizedPhase}` });
  } catch (error) {
    next(error);
  }
};
