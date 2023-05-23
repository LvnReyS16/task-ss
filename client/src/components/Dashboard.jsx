import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import moment from "moment";
export default function Dashboard() {
  const [valuesStreak, setValuesStreak] = useState({
    streak: 0,
    coins: 0,
    lastClaimedDate: null,
  });

  const { logout } = useAuth();
  const token = sessionStorage.getItem("token");
  const [showConfetti, setShowConfetti] = useState(false);

  const [showStreakInfo, setShowStreakInfo] = useState(true);

  const daysOf5 = Array.from({ length: 5 }, (_, index) => index);

  const today = moment(valuesStreak.lastClaimedDate).format("YYYY-MM-DD");
  // Check if the streak has already been claimed today

  const claimStreak = async () => {
    let newStreak = valuesStreak.streak + 1;
    let newTotalCoins = valuesStreak.coins + 1;

    if (newStreak % 5 === 0) {
      newTotalCoins += 5; // Bonus coins every 5 days
    }

    try {
      await axios.post(
        "http://localhost:3000/api/users/updateStreakAndCoins",
        {
          streak: newStreak,
          coins: newTotalCoins,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setValuesStreak((items) => ({
        ...items,
        streak: newStreak,
        coins: newTotalCoins,
      }));
      setShowConfetti(true);
      setShowStreakInfo(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users", {
          headers: {
            Authorization: token,
          },
        });
        const { data } = response;

        if (today === data.lastClaimedDate) {
          setShowConfetti(true);
          setShowStreakInfo(false);
        }
        setValuesStreak(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [token, today]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {showStreakInfo && (
        <React.Fragment>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded shadow mb-4"
            onClick={claimStreak}
          >
            Claim Streak
          </button>
        </React.Fragment>
      )}

      {!showStreakInfo && (
        <div className="streak">
          <div className="streak-info m-2 ">
            <div className="streak-number">{valuesStreak.streak}</div>
            <div className="streak-label">Days Streak</div>
          </div>
          <p className="mb-4 text-center">Total Coins: {valuesStreak.coins}</p>

          <div className="flex mb-2">
            {daysOf5.map((day, index) => (
              <div
                key={day}
                className={`w-8 h-8 rounded-full mx-1 ${
                  index < valuesStreak.streak
                    ? "claimed-day animate-streak"
                    : "unclaimed-day"
                }`}
              ></div>
            ))}
          </div>

          <p className="mt-5">Come back again for streak</p>
          <div className="flex items-center justify-center mt-5">
            <button
              className=" bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded shadow mb-4"
              onClick={logout}
            >
              Logout
            </button>
          </div>

          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              onConfettiComplete={() => setShowConfetti(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
