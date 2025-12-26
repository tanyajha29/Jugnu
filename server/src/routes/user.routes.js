const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getMe } = require("../controllers/user.controller");
const {getPhase, setPhase} = require("../controllers/user.controller");

router.get("/me", authMiddleware, getMe);
router.get("/phase", authMiddleware, getPhase);
router.post("/phase", authMiddleware, setPhase);
module.exports = router;
