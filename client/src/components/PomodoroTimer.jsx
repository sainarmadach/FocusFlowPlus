import React, { useState, useEffect, useRef } from "react";

const MODES = {
  "25-5": { work: 25 * 60, break: 5 * 60 },
  "50-10": { work: 50 * 60, break: 10 * 60 },
};

function PomodoroTimer() {
  const [mode, setMode] = useState("25-5"); // Default mode
  const [sessionType, setSessionType] = useState("work"); // 'work' or 'break'
  const [timeLeft, setTimeLeft] = useState(MODES["25-5"].work);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const storedEndTime = localStorage.getItem("pomodoro_endTime");
    const storedSession = localStorage.getItem("pomodoro_sessionType");
    const storedMode = localStorage.getItem("pomodoro_mode");
    const storedCount = localStorage.getItem("pomodoro_count");

    if (storedMode && MODES[storedMode]) {
      setMode(storedMode);
    }

    if (storedSession) {
      setSessionType(storedSession);
    }

    if (storedCount) {
      setCompletedPomodoros(parseInt(storedCount, 10));
    }

    if (storedEndTime) {
      const endTime = parseInt(storedEndTime, 10);
      const remaining = Math.ceil((endTime - Date.now()) / 1000);

      if (remaining > 0) {
        setTimeLeft(remaining);
        setIsRunning(true);
        startTimer(endTime);
      } else {
        clearStorage();
      }
    } else {
      setTimeLeft(MODES["25-5"].work); // Default on load
    }

    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = (endTime) => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const remaining = Math.ceil((endTime - Date.now()) / 1000);
      if (remaining <= 0) {
        clearInterval(timerRef.current);
        completeSession();
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);
  };

  const completeSession = () => {
    if (sessionType === "work") {
      const today = new Date().toISOString().split("T")[0];
      const countKey = `pomodoro_count_${today}`;
      const newCount = completedPomodoros + 1;
      setCompletedPomodoros(newCount);
      localStorage.setItem(countKey, newCount.toString());
    }

    const nextSession = sessionType === "work" ? "break" : "work";
    setSessionType(nextSession);
    const nextDuration = MODES[mode][nextSession];
    setTimeLeft(nextDuration);
    const newEndTime = Date.now() + nextDuration * 1000;
    localStorage.setItem("pomodoro_endTime", newEndTime.toString());
    localStorage.setItem("pomodoro_sessionType", nextSession);
    startTimer(newEndTime);
  };

  const handleStart = () => {
    if (isRunning) return;
    const endTime = Date.now() + timeLeft * 1000;
    localStorage.setItem("pomodoro_endTime", endTime.toString());
    localStorage.setItem("pomodoro_sessionType", sessionType);
    localStorage.setItem("pomodoro_mode", mode);
    startTimer(endTime);
    setIsRunning(true);
  };

  const handlePause = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    localStorage.removeItem("pomodoro_endTime");
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setSessionType("work");
    setTimeLeft(MODES[mode].work);
    clearStorage();
  };

  const handleModeSwitch = (newMode) => {
    clearInterval(timerRef.current);
    setMode(newMode);
    setSessionType("work");
    setIsRunning(false);
    setTimeLeft(MODES[newMode].work);
    clearStorage();
  };

  const clearStorage = () => {
    localStorage.removeItem("pomodoro_endTime");
    localStorage.removeItem("pomodoro_sessionType");
    localStorage.removeItem("pomodoro_mode");
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-800 flex flex-col items-center justify-center p-6 text-white space-y-6">
      <h2 className="text-3xl font-bold">
        {sessionType === "work" ? "⏳ Focus Time" : "☕ Break Time"}
      </h2>

      <div className="text-6xl font-mono text-blue-200">
        {formatTime(timeLeft)}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          disabled={!isRunning}
          className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded disabled:opacity-50"
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => handleModeSwitch("25-5")}
          className={`px-4 py-2 rounded ${
            mode === "25-5" ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          25 / 5 Mode
        </button>
        <button
          onClick={() => handleModeSwitch("50-10")}
          className={`px-4 py-2 rounded ${
            mode === "50-10" ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          50 / 10 Mode
        </button>
      </div>

      <div className="mt-4 text-gray-300">
        Pomodoros completed today:{" "}
        <span className="text-blue-400 font-semibold">
          {completedPomodoros}
        </span>
      </div>
    </div>
  );
}

export default PomodoroTimer;
