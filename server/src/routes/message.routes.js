const express = require("express");
const router = express.Router();
const { getDailyMessage } = require("../controllers/message.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/daily", authMiddleware, getDailyMessage);

module.exports = router;
