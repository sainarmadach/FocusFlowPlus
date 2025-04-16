import React, { useState, useEffect } from "react";
import axios from "axios";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all"); // all | active | completed

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/tasks/");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      is_completed: false,
    };

    try {
      await axios.post("http://localhost:8000/tasks/", newTask);
      setTitle("");
      await fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      await axios.put(`http://localhost:8000/tasks/${id}/toggle/`);
      await fetchTasks();
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${id}/`);
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setEditId(task.id);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.is_completed;
    if (filter === "active") return !task.is_completed;
    return true;
  });

  return (
    <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white mb-4">📝 Task Manager</h2>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-blue-600" : "bg-gray-600"
          } text-white`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === "active" ? "bg-blue-600" : "bg-gray-600"
          } text-white`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === "completed" ? "bg-blue-600" : "bg-gray-600"
          } text-white`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      {/* Task Entry */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a task..."
          className="flex-grow p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`flex flex-col sm:flex-row justify-between sm:items-center p-3 rounded ${
              task.is_completed ? "bg-gray-600 opacity-60" : "bg-gray-700"
            }`}
          >
            <div className="flex flex-col flex-grow text-white">
              <span
                className={`text-lg ${task.is_completed ? "line-through" : ""}`}
              >
                {task.title}
              </span>
              <small className="text-gray-400 text-xs">
                Created: {new Date(task.created_at).toLocaleString()}
              </small>
              {task.completed_at && (
                <small className="text-green-300 text-xs">
                  Completed: {new Date(task.completed_at).toLocaleString()}
                </small>
              )}
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0 sm:ml-4">
              <button
                onClick={() => handleToggleComplete(task.id)}
                className={`${
                  task.is_completed
                    ? "bg-green-700 hover:bg-green-800"
                    : "bg-green-600 hover:bg-green-700"
                } text-white px-3 py-1 rounded`}
              >
                {task.is_completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => handleEdit(task)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
