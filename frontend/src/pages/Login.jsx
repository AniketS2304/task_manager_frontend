import { useState } from "react";
import { useNavigate } from "react-router-dom"; // for redirecting after login
import axios from "axios"; // Import Axios

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state
  const navigate = useNavigate(); // Hook for navigation after successful login
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", { // Ensure correct backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json(); // Ensure the response is parsed as JSON
  
      if (response.ok) {
        console.log("Login successful", data);
        // Redirect after successful login
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed, please try again.");
      }
    } catch (error) {
      setError("An error occurred while logging in.");
      console.error(error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>

        {/* Error message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          {/* Signup link */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:text-blue-700">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
