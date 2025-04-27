import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const quotes = [
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  {
    text: "What you do today can improve all your tomorrows.",
    author: "Ralph Marston",
  },
  {
    text: "Success is the sum of small efforts repeated daily.",
    author: "Robert Collier",
  },
  {
    text: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#3b0764] via-40% to-[#00f5d4] flex flex-col justify-center items-center text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-bold text-white"
      >
        Welcome to <span className="text-blue-500">FocusFlow+</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg text-gray-300 mt-4"
      >
        Your AI-powered task & focus manager.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-md text-gray-400 mt-2 max-w-xl"
      >
        Plan smarter, stay motivated, and unlock deep productivity.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-6 flex gap-4"
      >
        {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow">
          🚀 Start Now
        </button> */}
        <Link
          to="/tasks"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
        >
          🚀 Start Now
        </Link>
        <a
          href="/how-it-works"
          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg shadow"
        >
          🎥 How It Works
        </a>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-12 bg-gray-700 bg-opacity-30 backdrop-blur-md p-6 rounded-xl max-w-xl mx-auto"
      >
        <p className="text-xl text-white italic">“{randomQuote.text}”</p>
        <p className="text-sm text-gray-300 mt-2 text-right">
          — {randomQuote.author}
        </p>
      </motion.div>
    </div>
  );
}

export default Home;
