import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axios"; // <-- import your preconfigured axios instance

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await api.get(`/tasks/${id}`);
        
        // Handle both flat object and nested "task" object formats
        if (data?.title && data?.description) {
          setTask({ title: data.title, description: data.description });
        } else if (data?.task) {
          setTask(data.task);
        } else {
          setError("Task data is in unexpected format.");
        }
      } catch (err) {
        console.error("Error fetching task:", err);
        setError("Failed to load task. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.put(`/tasks/${id}`, task);
      navigate("/tasks");
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading task...</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Task</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">
            Task Description
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
