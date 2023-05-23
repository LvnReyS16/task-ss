const moment = require("moment/moment");
const User = require("../models/user");

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const formattedDate = moment(user.formattedDate).format("YYYY-MM-DD");

    res.status(200).json({
      lastClaimedDate: formattedDate,
      streak: user.streak,
      coins: user.coins,
    });
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

    const today = moment().utc().startOf("day").toDate();

    if (user.lastClaimedDate === today) {
      return res.status(400).json({ message: "Streak already claimed today" });
    }

    user.streak = streak;
    user.coins = coins;
    user.lastClaimedDate = today; // Update the last claimed date
    await user.save();

    res.status(200).json({ message: "Streak and coins updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};
