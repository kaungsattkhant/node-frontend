import React, { useState, useEffect } from "react";
import JobForm from "./JobForm"; // Adjust the path as necessary
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";
import { useRouter } from "next/router";

const JobPage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  console.log(token);
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    education: "",
    description: "",
    function_ids: [],
  });
  const [locations, setLocations] = useState([]);
  const [functions, setFunctions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    console.log(token);
    // Fetch locations and functions when the component mounts
    const fetchData = async () => {
      try {
        // const locationsResponse = await axios.get('/api/locations');
        // const functionsResponse = await axios.get("/api/functions");
        fetch(`${baseUrl}/api/locations`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is passed in headers
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setLocations(data.data);
          });
        fetch(`${baseUrl}/api/functions`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is passed in headers
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setFunctions(data.data);
          });
        // console.log(locationsResponse.data);
        // setLocations(locationsResponse.data);
        // setFunctions(functionsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    // console.log(isEditing);
    try {
      if (isEditing) {
        // Update existing job
        await axios.put(`/api/jobs/${formData.id}`, formData);
      } else {
        // Create new job
        const response = await axios.post(`${baseUrl}/api/jobs`, formData);
        if (response.status == 200) {
          router.push("/job");
        }
      }
      // Handle successful submission (e.g., redirect or show a success message)
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <JobForm
          isEditing={isEditing}
          formData={formData}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          locations={locations}
          functions={functions}
        />
      </div>
    </AdminLayout>
  );
};

export default JobPage;
