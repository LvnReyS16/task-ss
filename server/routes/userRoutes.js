const express = require("express");
const {
  getUser,
  updateStreakAndCoins,
} = require("../controllers/userController");
const { authenticate } = require("../utils/auth");

const router = express.Router();

// Protected route
router.get("/", authenticate, getUser);
router.post("/updateStreakAndCoins", authenticate, updateStreakAndCoins);

module.exports = router;
