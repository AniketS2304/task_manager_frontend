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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Navbar */}
      <div className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0">
        <h1 className="text-3xl font-bold text-gray-700 tracking-wide">Task Manager</h1>
        <Link to="/tasks/create">
          <button className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
            + Add Task
          </button>
        </Link>
      </div>

      {/* Dashboard Content */}
      <div className="w-full max-w-6xl mt-20 p-6">
        {/* Task Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Total Tasks", count: tasks.length, gradient: "from-blue-400 to-blue-600" },
            { title: "Pending Tasks", count: tasks.filter(task => task.status === "Pending").length, gradient: "from-yellow-400 to-yellow-600" },
            { title: "Completed Tasks", count: tasks.filter(task => task.status === "Completed").length, gradient: "from-green-400 to-green-600" }
          ].map((stat, index) => (
            <div
              key={index}
              className={`p-6 text-white rounded-lg shadow-md bg-gradient-to-r ${stat.gradient} flex flex-col items-center`}
            >
              <h2 className="text-lg font-semibold">{stat.title}</h2>
              <p className="text-4xl font-bold mt-2">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Task List */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Tasks</h2>
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="w-full bg-opacity-70 backdrop-blur-lg rounded-lg">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-4 text-left">Task</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <tr key={task._id} className="border-b hover:bg-gray-100 transition">
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
                        <Link to={`/tasks/edit/${task._id}`}>
                          <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition transform hover:scale-105">
                            Edit
                          </button>
                        </Link>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition transform hover:scale-105"
                          onClick={() => handleDelete(task._id)}
                        >
                          Delete
                        </button>
                        {task.status !== "Completed" && (
                          <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition transform hover:scale-105"
                            onClick={() => handleComplete(task._id)}
                          >
                            Complete
                          </button>
                        )}
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

