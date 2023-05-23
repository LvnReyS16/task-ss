const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  streak: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },
  lastClaimedDate: { type: Date, default: new Date().toDateString() },
});

module.exports = mongoose.model("User", userSchema);
