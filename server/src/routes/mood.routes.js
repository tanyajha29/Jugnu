const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  addMood,
  getMoodHistory
} = require("../controllers/moodController");

router.get("/weekly", auth, getMoodHistory);
router.post("/", auth, addMood);
router.get("/", auth, getMoodHistory);

module.exports = router;
