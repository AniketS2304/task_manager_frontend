// src/pages/TaskList.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://task-manager-backend-miw9.onrender.com/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks`, { withCredentials: true });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`, { withCredentials: true });
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            className="mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-between items-center"
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {task.title}
              </h3>
              <p className="text-gray-600 text-sm">{task.description}</p>
            </div>
            <div className="flex space-x-2 items-center">
              <Link
                to={`/tasks/edit/${task._id}`}
                className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(task._id)}
                className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
