import React, { useState, useEffect } from "react";
import axios from "axios";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/tasks/");
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;
    if (editId) {
      setEditId(null);
      setTitle("");
      return fetchTasks();
    }
    await axios.post("http://localhost:8000/tasks/", {
      id: Date.now(),
      title,
      is_completed: false,
    });
    setTitle("");
    fetchTasks();
  };

  const toggle = async (id) => {
    await axios.put(`http://localhost:8000/tasks/${id}/toggle/`);
    fetchTasks();
  };

  const remove = async (id) => {
    await axios.delete(`http://localhost:8000/tasks/${id}/`);
    fetchTasks();
  };

  const startEdit = (t) => {
    setEditId(t.id);
    setTitle(t.title);
  };

  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.is_completed;
    if (filter === "completed") return t.is_completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-700 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">📝 Task Manager</h2>

        <div className="flex justify-between items-start">
          {/* LEFT COLUMN */}
          <div className="flex-1 pr-6">
            <div className="flex mb-4">
              <input
                className="flex-grow p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                onClick={handleSubmit}
                className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                {editId ? "Update" : "Add"}
              </button>
            </div>

            <div className="space-y-2">
              {filtered.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between bg-gray-700 p-3 rounded"
                >
                  <span
                    className={`flex-grow text-white ${
                      t.is_completed ? "line-through opacity-60" : ""
                    }`}
                  >
                    {t.title}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggle(t.id)}
                      className={`px-3 py-1 rounded text-white ${
                        t.is_completed
                          ? "bg-green-700 hover:bg-green-800"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {t.is_completed ? "Undo" : "Done"}
                    </button>
                    <button
                      onClick={() => startEdit(t)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(t.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: filters */}
          <div className="w-32 flex flex-col space-y-3">
            {["all", "active", "completed"].map((key) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`py-2 rounded text-white ${
                  filter === key ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
