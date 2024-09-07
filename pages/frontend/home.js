import React, { useEffect, useState } from "react";
import HomeLayout from "./homelayout";
import axios from "axios";
import HomeSearchBar from "./homesearch";

function home() {
  const [jobs, setJobs] = useState([]);
  // const [functions, setFunctions] = useState([]);
  // const [locations, setLocations] = useState([]);
  const [searchParams, setSearchParams] = useState({
    function_ids: [],
    search_input: "",
    location_id: "",
  });
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // const responseFunction = await axios.get(`${baseUrl}/api/functions/get_all`);
        // if (responseFunction.status == 200) {
        //     console.log(responseFunction.data.data);
        //   setFunctions(responseFunction.data.data);
        // } else {
        //   console.error("Unexpected response status:", responseFunction.status);
        // }
        // const responseLocation = await axios.get(`${baseUrl}/api/locations/get_all`);
        // if (responseLocation.status == 200) {
        //     console.log(responseLocation.data.data);
        //   setLocations(responseLocation.data.data);
        // } else {
        //   console.error("Unexpected response status:", responseLocation.status);
        // }
        const response = await axios.get(`${baseUrl}/api/jobs/get_all`,{
          params:{
            function_ids: searchParams.function_ids,
            search_input: searchParams.search_input,
            location_id: searchParams.location_id,
          }
        });
        if (response.status == 200) {
            console.log(response.data.data);
          setJobs(response.data.data);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };
    fetchJobs();
  }, [searchParams]);
  return (
    <HomeLayout>
      {/* Main container for search bar and job list */}
      <div className="max-w-4xl mx-auto">
        {/* Add the search bar */}
        <HomeSearchBar setSearchParams={setSearchParams} />
        
        {/* Job listing container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white p-4 shadow-md rounded-md">
              <h3 className="font-bold text-lg mb-1">{job.name}</h3>
              <p className="text-gray-600">{job.company}</p>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 11c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm8 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zM8 15h8m2 4H6m6-12v8"
                    />
                  </svg>
                  {job.location_name}
                </span>
                {job.functions.map((job_function) => (
                  <span key={job_function.id} className="ml-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 mr-1"
                    >
                      {/* Add path if needed */}
                    </svg>
                    {job_function.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default home;
