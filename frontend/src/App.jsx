import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import TaskList from "./pages/TaskList";  // Import TaskList
import CreateTask from "./pages/CreateTask";  // Import CreateTask
import EditTask from "./pages/EditTask";  // Import EditTask

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/tasks/create" element={<CreateTask />} />
      <Route path="/tasks/edit/:id" element={<EditTask />} />
    </Routes>
  );
}

export default App;
