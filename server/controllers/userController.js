const User = require("../models/user");

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ email: user.email, streak: user.streak, coins: user.coins });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.updateStreakAndCoins = async (req, res) => {
  try {
    const { userId } = req.user;
    const { streak, coins } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.streak = streak;
    user.coins = coins;
    await user.save();

    res.status(200).json({ message: "Streak and coins updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};
