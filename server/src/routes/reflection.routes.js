
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  addReflection,
  getReflections
} = require("../controllers/reflectionController");

router.post("/", auth, addReflection);
router.get("/", auth, getReflections);
router.get("/prompt", auth, require("../controllers/reflectionController").getPrompt);

module.exports = router;
