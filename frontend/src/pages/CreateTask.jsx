import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios"; // ✅ Import central axios instance

const CreateTask = () => {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { status, data } = await api.post("/tasks", task);
      if (status === 201 || status === 200) {
        console.log("✅ Task created:", data);
        navigate("/dashboard"); // Or "/tasks" if that's your task list route
      }
    } catch (error) {
      console.error("❌ Error creating task:", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Create a New Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task Title"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task Description"
            rows="4"
            required
          />
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
