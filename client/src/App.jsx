// App component with routing
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskManager from "./components/TaskManager";
import PomodoroTimer from "./components/PomodoroTimer";
import MotivationGallery from "./components/MotivationGallery";
import MoodTracker from "./components/MoodTracker";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="p-4 bg-gray-800">
          <nav className="container mx-auto flex justify-between">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/tasks" className="hover:underline">
              Tasks
            </Link>
            <Link to="/pomodoro" className="hover:underline">
              Pomodoro
            </Link>
            <Link to="/motivation" className="hover:underline">
              Motivation
            </Link>
            <Link to="/mood" className="hover:underline">
              Mood Tracker
            </Link>
            <Link to="/analytics" className="hover:underline">
              Analytics
            </Link>
          </nav>
        </header>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<div>Welcome to FocusFlow+</div>} />
            <Route path="/tasks" element={<TaskManager />} />
            <Route path="/pomodoro" element={<PomodoroTimer />} />
            <Route path="/motivation" element={<MotivationGallery />} />
            <Route path="/mood" element={<MoodTracker />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
