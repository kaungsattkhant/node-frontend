import React, { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter
import Link from "next/link";
function login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize router

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset error message
    setError("");
    console.log(formData);
    // Perform the login request
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customers/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful");
        // Store the JWT token in localStorage
        localStorage.setItem("customerjwtToken", data.token);
        // Optionally store user information
        localStorage.setItem("customer", JSON.stringify(data.user));
        router.push("/frontend/home");
      } else {
        const data = await response.json();

        console.log("Login failed:", data.message);
        // Handle errors
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.log("Error occurred during login:", error);
      setError("An error occurred during login.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
  
        {/* Full-width Login Button */}
        <button
          type="submit"
          className="w-full   bg-purple-600 text-white inline-flex justify-center px-4 py-2 mb-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Login
        </button>
  
        {/* Register Link */}
        <div className="text-center">
          <Link
            href="/frontend/register"
            className="text-sm text-blue-600 hover:underline"
          >
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </div>
  </div>
  );
}

export default login;
