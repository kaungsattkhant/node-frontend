import React, { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import Select from "react-select";
function create() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    date_time: "",
    education: "",
    description: "",
    location_id: "",
    user_id: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const handleSubmit = (e) => {
    console.log('submit');

  };
  const handleInputChange = (e) => {
    console.log(e.target);
  };
  return (
    <AdminLayout>
      {/* here is user create page */}
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">
          {isEditing ? "Update Job" : "Create Job"}
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
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
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
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
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
              Education
            </label>
            <input
              type="text"
              id="education"
              name="education"
              value={formData.education}
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
