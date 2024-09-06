import React, { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { useRouter } from "next/router";

function create() {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    phone_number: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter(); // Initialize the router
  const { id } = router.query; // Get the ID from the URL
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  useEffect(() => {
    // Fetch user data if ID is available
    if (id) {
      setIsEditing(true);
      fetch(`${baseUrl}/api/users/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            id: data.id,
            username: data.username,
            phone_number: data.phone_number,
            password: "", // Do not pre-fill password
          });
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [id, baseUrl]);
  const handleSubmit = (e) => {
    const url = isEditing
      ? `${baseUrl}/api/users/${id}`
      : `${baseUrl}/api/users`;
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormData({
          username: "",
          phone_number: "",
          password: "",
        });
        router.push("/user"); // Redirect to /user after successful submission
      })
      .catch((error) => console.error("Error:", error));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value,
    // });
  };

  return (
    <AdminLayout>
      {/* here is user create page */}
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">
          {isEditing ? "Update User" : "Create User"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-8 rounded shadow"
        >
          {/* Username Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Phone Number Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone_number"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required={!isEditing}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isEditing ? "Update User" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default create;
