import React, { useState, useEffect, useRef } from "react";

function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(1500); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setIsRunning(false);
      setSecondsLeft(1500);
    }
  }, [secondsLeft]);

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
      <div className="text-center bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-white">
          ⏳ Pomodoro Timer
        </h2>
        <div className="text-6xl font-mono mb-6 text-blue-400">
          {formatTime(secondsLeft)}
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsRunning(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Start
          </button>
          <button
            onClick={() => setIsRunning(false)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Pause
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setSecondsLeft(1500);
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default PomodoroTimer;
