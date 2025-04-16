// Mood Tracker component
import React, { useState } from "react";

function MoodTracker() {
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mood:", mood, "Notes:", notes);
    // Add code here to send mood data to the backend if needed.
    setMood("");
    setNotes("");
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Mood Tracker</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">How do you feel?</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="border p-2"
          >
            <option value="">Select mood</option>
            <option value="happy">😊 Happy</option>
            <option value="neutral">😐 Neutral</option>
            <option value="sad">😢 Sad</option>
            <option value="stressed">😟 Stressed</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Notes (optional):</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border p-2 w-full"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-600 p-2">
          Submit
        </button>
      </form>
    </div>
  );
}

export default MoodTracker;
