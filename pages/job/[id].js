import React, { useState, useEffect } from "react";
import JobForm from "./JobForm"; // Adjust the path as necessary
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";
import { useRouter } from "next/router";

const JobPage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  // console.log("root id : ",id);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    education: "",
    description: "",
    location_id: "",
    function_ids: [],
  });
  const [locations, setLocations] = useState([]);
  const [functions, setFunctions] = useState([]);

  useEffect(() => {
    // Fetch locations and functions when the component mounts
    // console.log(baseUrl);
    const fetchData = async () => {
      const token = localStorage.getItem("jwtToken");
      try {
        // const locationsResponse = await axios.get('/api/locations');
        // const functionsResponse = await axios.get("/api/functions");
        const locationsResponse = await axios.get(`${baseUrl}/api/locations`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        // console.log(locationsResponse.data);
        // const locationsData = await locationsResponse.json();
        if (locationsResponse.status != 200) {
          throw new Error("Failed to fetch locations");
        }
        setLocations(locationsResponse.data.data);

        const functionsResponse = await axios.get(`${baseUrl}/api/functions`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        // const functionsData = await functionsResponse.json();
        if (functionsResponse.status != 200) {
          throw new Error("Failed to fetch functions");
        }
        setFunctions(functionsResponse.data.data);
        if (id && id !== "new") {
          // If it's not 'new', we're editing, so fetch job details
          setIsEditing(true);
          const response = await axios.get(`${baseUrl}/api/jobs/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Ensure token is passed in headers
              "Content-Type": "application/json",
            },
          });
          // console.log(response.data.data);
          setFormData(response.data.data);
        } else {
          setIsEditing(false); // It's a new job creation
        }
        // console.log(locationsResponse.data);
        // setLocations(locationsResponse.data);
        // setFunctions(functionsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (id) {
      fetchData();
    }
    // fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("jwtToken");
    try {
      let response;
      if (isEditing) {
        // Update existing job
        // await axios.put(`/api/jobs/${formData.id}`, formData);
        response = await axios.post(`${baseUrl}/api/jobs`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else {
        // Create new job
        // const response = await axios.post(`${baseUrl}/api/jobs`, formData);
        response = await axios.post(`${baseUrl}/api/jobs`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
      if (response.status == 200) {
        router.push("/job");
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
