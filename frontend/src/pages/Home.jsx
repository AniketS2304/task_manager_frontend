import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Welcome to the Task Manager</h1>
        <p className="text-gray-600 text-center mb-6">
          Manage your tasks efficiently and stay organized.
        </p>
        <div className="flex flex-col items-center">
          <Link
            to="/login"
            className="bg-blue-500 text-white py-2 px-6 rounded mb-4 hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
