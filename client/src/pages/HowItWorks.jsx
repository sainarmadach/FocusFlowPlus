import React from "react";

function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        🧠 How FocusFlow+ Works
      </h1>

      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            ✅ 1. Smart Task Management
          </h2>
          <p className="text-gray-300">
            Add, edit, delete tasks and break them into subtasks using AI.
            Organize them by priority, deadlines, or tags.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            ⏱️ 2. Focus Mode with Pomodoro Timer
          </h2>
          <p className="text-gray-300">
            Start a 25-minute deep work session with short breaks in between.
            Stay distraction-free and track your focus blocks.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            🎨 3. Daily Motivation
          </h2>
          <p className="text-gray-300">
            Click “I need motivation” to get an AI-generated quote + image that
            boosts your energy and drive.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            📊 4. Progress & Mood Tracking
          </h2>
          <p className="text-gray-300">
            Get insights on your productivity trends, session counts, and mood
            patterns. Visualized beautifully.
          </p>
        </div>

        <div className="text-center mt-12">
          <a href="/" className="text-blue-400 hover:underline text-lg">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
