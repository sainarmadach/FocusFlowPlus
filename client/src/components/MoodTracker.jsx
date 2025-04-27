import React, { useState, useEffect } from "react";

function MoodTracker() {
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");
  const [history, setHistory] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editMood, setEditMood] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const moodIcons = {
    happy: "😊",
    neutral: "😐",
    sad: "😢",
    stressed: "😟",
  };

  // On first load, restore from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("mood_history");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const saveToLocalStorage = (newHistory) => {
    localStorage.setItem("mood_history", JSON.stringify(newHistory));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood) return;

    const newEntry = {
      id: Date.now(),
      mood,
      notes,
      date: new Date().toLocaleString(),
    };

    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    saveToLocalStorage(updatedHistory);

    setMood("");
    setNotes("");
  };

  const handleDelete = (id) => {
    const updated = history.filter((entry) => entry.id !== id);
    setHistory(updated);
    saveToLocalStorage(updated);
  };

  const handleEdit = (entry) => {
    setEditId(entry.id);
    setEditMood(entry.mood);
    setEditNotes(entry.notes);
  };

  const handleUpdate = (id) => {
    const updated = history.map((entry) =>
      entry.id === id ? { ...entry, mood: editMood, notes: editNotes } : entry
    );
    setHistory(updated);
    saveToLocalStorage(updated);
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#0f172a] via-[#6366f1] to-[#00f5d4] text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Mood Form */}
        <div className="lg:sticky lg:top-6 h-fit bg-[#1e293b] bg-opacity-80 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">
            🧘 Mood Tracker
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm mb-2">How do you feel?</label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select mood</option>
                <option value="happy">😊 Happy</option>
                <option value="neutral">😐 Neutral</option>
                <option value="sad">😢 Sad</option>
                <option value="stressed">😟 Stressed</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">Notes (optional):</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type anything you want to reflect on..."
                rows="3"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full shadow"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right: Mood History */}
        <div className="overflow-y-auto max-h-[calc(100vh-48px)] pr-2">
          <h3 className="text-xl font-semibold mb-4">📅 Mood History</h3>
          <ul className="space-y-4">
            {history.map((entry) => (
              <li
                key={entry.id}
                className="bg-[#1e293b] bg-opacity-70 p-4 rounded-lg border border-gray-600"
              >
                {editId === entry.id ? (
                  <>
                    <div className="mb-2 flex gap-2 items-center">
                      <select
                        value={editMood}
                        onChange={(e) => setEditMood(e.target.value)}
                        className="bg-gray-700 text-white p-2 rounded"
                      >
                        <option value="happy">😊 Happy</option>
                        <option value="neutral">😐 Neutral</option>
                        <option value="sad">😢 Sad</option>
                        <option value="stressed">😟 Stressed</option>
                      </select>
                      <input
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        className="flex-grow bg-gray-700 text-white p-2 rounded"
                        placeholder="Update notes..."
                      />
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={() => handleUpdate(entry.id)}
                        className="bg-green-600 px-4 py-1 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-600 px-4 py-1 rounded hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xl">
                        {moodIcons[entry.mood]}{" "}
                        {entry.mood.charAt(0).toUpperCase() +
                          entry.mood.slice(1)}
                      </span>
                      <span className="text-sm text-gray-400">
                        {entry.date}
                      </span>
                    </div>
                    {entry.notes && (
                      <p className="text-gray-200 text-sm">📝 {entry.notes}</p>
                    )}
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={() => handleEdit(entry)}
                        className="bg-yellow-500 px-4 py-1 rounded hover:bg-yellow-600 text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="bg-red-600 px-4 py-1 rounded hover:bg-red-700 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MoodTracker;
