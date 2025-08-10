import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const { data } = await api.get("/tasks");
      setTasks(data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete task
  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
    }
  };

  // Complete task
  const handleComplete = async (taskId) => {
    try {
      await api.patch(`/tasks/${taskId}`, { status: "Completed" });
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: "Completed" } : task
        )
      );
    } catch (error) {
      console.error("Error marking task as completed:", error.response?.data || error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
 <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
  <table className="w-full text-gray-800 rounded-lg">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="p-4 text-left">Task</th>
        <th className="p-4 text-left">Status</th>
        <th className="p-4 text-left">Actions</th>
      </tr>
    </thead>
    <tbody className="bg-white">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <tr
            key={task._id}
            className="border-b hover:bg-gray-50 transition"
          >
            <td className="p-4">{task.title}</td>
            <td className="p-4">
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  task.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {task.status}
              </span>
            </td>
            <td className="p-4 flex gap-2">
              {/* Buttons */}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="3" className="p-6 text-center text-gray-500">
            No tasks available. Start by adding one!
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


export default Dashboard;

