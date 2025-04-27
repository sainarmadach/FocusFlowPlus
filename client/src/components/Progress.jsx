import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement
);

const BASE_URL = "https://focusflow-backend.onrender.com";

export default function Progress() {
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [tasksPending, setTasksPending] = useState(0);
  const [focusSessions, setFocusSessions] = useState(0);
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = () => {
    fetchTasks();
    fetchFocus();
    fetchMood();
  };

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/tasks/`);
      const completed = data.filter((t) => t.is_completed).length;
      setTasksCompleted(completed);
      setTasksPending(data.length - completed);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchFocus = () => {
    const todayKey = `pomodoro_count_${new Date().toISOString().split("T")[0]}`;
    setFocusSessions(parseInt(localStorage.getItem(todayKey) || "0", 10));
  };

  const fetchMood = () => {
    const mh = JSON.parse(localStorage.getItem("mood_history") || "[]");
    setMoodHistory(mh);
  };

  // Chart data
  const taskData = {
    labels: ["M", "T", "W", "Th", "F", "Sa", "Su"],
    datasets: [
      {
        label: "Tasks",
        data: [], // we'll fill in weekly data if you store it; for now just show totals
        backgroundColor: "#60A5FA",
      },
    ],
  };

  // For now we show totals in bar, not weekly breakdown:
  taskData.labels = ["Completed", "Pending"];
  taskData.datasets[0].data = [tasksCompleted, tasksPending];

  const focusData = {
    labels: ["Done", "Target"],
    datasets: [
      {
        data: [focusSessions, Math.max(0, 8 - focusSessions)],
        backgroundColor: ["#A78BFA", "#E5E7EB"],
        cutout: "70%",
      },
    ],
  };

  const moodCounts = moodHistory.reduce((acc, e) => {
    acc[e.mood] = (acc[e.mood] || 0) + 1;
    return acc;
  }, {});
  const moodPieData = {
    labels: Object.keys(moodCounts),
    datasets: [
      {
        data: Object.values(moodCounts),
        backgroundColor: ["#34D399", "#93C5FD", "#FCD34D", "#F87171"],
      },
    ],
  };

  const moodLineData = {
    labels: moodHistory.map((e) => e.date.split(",")[0]),
    datasets: [
      {
        label: "Mood Level",
        data: moodHistory.map((e) => {
          switch (e.mood) {
            case "happy":
              return 3;
            case "neutral":
              return 2;
            case "stressed":
              return 1;
            case "sad":
              return 0;
            default:
              return 2;
          }
        }),
        fill: false,
        borderColor: "#34D399",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Progress</h1>
      <button
        onClick={fetchAll}
        className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        🔄 Refresh
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tasks Completed */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Tasks Completed</h2>
          <Bar
            data={taskData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold">{tasksCompleted}</span>
            <span className="text-gray-600">tasks completed</span>
            <span className="ml-auto text-gray-600">
              {tasksPending} pending
            </span>
          </div>
        </div>

        {/* Focus Sessions */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Focus Sessions</h2>
          <Doughnut
            data={focusData}
            options={{
              cutout: "70%",
              responsive: true,
              plugins: { legend: { display: false } },
            }}
            className="w-48 h-48"
          />
          <span className="mt-4 text-2xl font-bold">{focusSessions}</span>
          <span className="text-gray-600">sessions today</span>
          <span className="text-gray-600">
            {((focusSessions * 25) / 60).toFixed(1)} hrs total
          </span>
        </div>

        {/* Mood Trends */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Mood Trends</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Line
              data={moodLineData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
            <Pie
              data={moodPieData}
              options={{
                responsive: true,
                plugins: { legend: { position: "bottom" } },
              }}
            />
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4">Achievements</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-2xl">🏅</span>
                {tasksCompleted >= 10
                  ? "Completed 10 tasks this week!"
                  : "Complete 10 tasks to earn a badge"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                {focusSessions >= 5
                  ? "5-day focus streak!"
                  : "Hit 5 sessions for a streak"}
              </li>
            </ul>
          </div>
          <div className="mt-6 border-t border-gray-200 pt-4 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-indigo-500 rounded-full"></span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <p className="ml-4 mt-1">{focusSessions} Pomodoros completed!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
