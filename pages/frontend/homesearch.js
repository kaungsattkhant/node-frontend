import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });

const HomeSearchBar = ({ setSearchParams }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [functions, setFunctions] = useState([]);
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    function_ids: [],
    search_input: "",
    location_id: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleLocationChange = (selectedOption) => {
    handleInputChange({
      target: {
        name: "location_id",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };
  const handleFunctionChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    handleInputChange({ target: { name: "function_ids", value: selectedIds } });
  };
  const functionOptions = functions.map((func) => ({
    value: func.id,
    label: func.name,
  }));
  const locationOptions = locations.map((location) => ({
    value: location.id,
    label: location.name,
  }));

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const responseFunction = await axios.get(
          `${baseUrl}/api/functions/get_all`
        );
        if (responseFunction.status == 200) {
          console.log(responseFunction.data.data);
          setFunctions(responseFunction.data.data);
        } else {
          console.error("Unexpected response status:", responseFunction.status);
        }
        const responseLocation = await axios.get(
          `${baseUrl}/api/locations/get_all`
        );
        if (responseLocation.status == 200) {
          console.log(responseLocation.data.data);
          setLocations(responseLocation.data.data);
        } else {
          console.error("Unexpected response status:", responseLocation.status);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = () => {
    setSearchParams(formData);
  };
  return (
    <div className="bg-white py-4 px-6 shadow-md rounded-md w-full max-w-4xl mx-auto mt-6">
    <div className="flex items-center space-x-3">
      {/* Job Title Input */}
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5 text-purple-600 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 11c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm8 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zM8 15h8m2 4H6m6-12v8"
          />
        </svg>
        <input
          type="text"
          id="search_input"
          name="search_input"
          value={formData.search_input}
          onChange={handleInputChange}
          placeholder="Search..."
          className="outline-none w-full"
        />
      </div>

      {/* Category Dropdown */}
      <div className="relative w-full">
        <Select
          isMulti
          options={functionOptions}
          onChange={handleFunctionChange}
          value={functionOptions.filter((option) =>
            formData.function_ids.includes(option.value)
          )}
        />
      </div>

      {/* Location Dropdown */}
      <div className="relative w-full">
        <Select
          id="location"
          name="location_id"
          value={locationOptions.find(
            (option) => option.value === formData.location_id
          )}
          onChange={handleLocationChange}
          options={locationOptions}
        />
      </div>

      {/* Find Jobs Button */}
      <button
        className="bg-purple-600 text-white px-6 py-2 rounded-md"
        onClick={handleSearch}
      >
        Filter
      </button>
    </div>
  </div>
  );
};

export default HomeSearchBar;
