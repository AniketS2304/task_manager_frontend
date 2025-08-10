// src/pages/EditTask.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task", error);
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, task);
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Task</h2>
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
          ></textarea>
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
