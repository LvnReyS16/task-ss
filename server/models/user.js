const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  streak: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
