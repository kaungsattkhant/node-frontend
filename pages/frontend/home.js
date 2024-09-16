import React, { useEffect, useState } from "react";
import HomeLayout from "./homelayout";
import axios from "axios";
import HomeSearchBar from "./homesearch";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Link from "next/link";

function home() {
  const [jobs, setJobs] = useState([]);
  const [authUser, setAuthUser] = useState(null); // To store auth_user
  const [formData, setFormData] = useState({}); // To store auth_user
  // const isApplied = false;
  const router = useRouter();
  // const [functions, setFunctions] = useState([]);
  // const [locations, setLocations] = useState([]);
  const [searchParams, setSearchParams] = useState({
    function_ids: [],
    search_input: "",
    location_id: "",
  });
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleCancel = async (jobId, customerId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Proceed with cancel job logic
          const response = await axios.delete(
            `${baseUrl}/api/jobs/${jobId}/customer/${customerId}`
          );

          if (response.status === 200) {
            toast.success("Successfully cancelled the job!");
            fetchJobs(); // Refresh jobs list after successful cancellation
          } else {
            toast.error("Something went wrong!");
          }
        } catch (error) {
          toast.error("Failed to cancel the job. Please try again later.");
        }
      }
    });
  };
  const handleApply = async (id) => {
    // const updatedFormData = { ...formData, customer_id: authUser.id };
    setFormData({
      ...formData, // Keep the existing data
      customer_id: authUser.id,
      id: id,
    });

    try {
      const response = await axios.post(`${baseUrl}/api/jobs/apply`, {
        customer_id: authUser.id,
        id: id,
      });
      if (response.status === 200) {
        toast.success("Successfully applied to the job!");
        fetchJobs(); // Refresh the job list after a successful application
      } else {
        toast.error("Failed to apply. Please try again.");
      }
    } catch (error) {}
  };
  const fetchJobs = async () => {
    try {
      const customer = localStorage.getItem("customer");
      if (customer) {
        setAuthUser(JSON.parse(customer)); // Parse the user and set it in state
      }
      const response = await axios.get(`${baseUrl}/api/jobs/get_all`, {
        params: {
          function_ids: searchParams.function_ids,
          search_input: searchParams.search_input,
          location_id: searchParams.location_id,
        },
      });
      if (response.status == 200) {
        setJobs(response.data.data);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, [searchParams]);
  return (
    <HomeLayout>
      {/* Main container for search bar and job list */}
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        {/* Add the search bar */}
        <HomeSearchBar setSearchParams={setSearchParams} />

        {/* Card Title for Job Listings */}
        <h2 className="text-xl font-bold mt-6 mb-4">Available Jobs</h2>

        {/* Job listing container with scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-h-[500px] overflow-y-auto">
          {jobs.map((job, index) => {
            const isApplied =
              authUser &&
              job.customers.some((customer) => customer.id === authUser.id);
            return (
              <div key={index} className="bg-white p-4 shadow-md rounded-md">
                <Link href={`/frontend/jobs/${job.id}`}>
                  <h3 className="font-bold text-lg mb-1">{job.name}</h3>
                </Link>
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
                    <span
                      key={job_function.id}
                      className="ml-4 flex items-center"
                    >
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
                {authUser ? (
                  isApplied ? (
                    <button
                      onClick={() => handleCancel(job.id, authUser.id)}
                      className="w-200 bg-red-600 text-white inline-flex justify-center px-4 py-2 mb-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApply(job.id)}
                      className="w-200 bg-purple-600 text-white inline-flex justify-center px-4 py-2 mb-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Apply
                    </button>
                  )
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </HomeLayout>
  );
}

export default home;
