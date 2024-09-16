import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa"; // Import the location icon
function JobDetail() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState(null);
  const fetchDetail = async () => {
    if (!id) return; // Ensure id is available
    try {
      console.log("id is ", id);
      const response = await axios.get(`${baseUrl}/api/jobs/detail/${id}`);
      if (response.status == 200) {
        console.log("success");
        setJob(response.data.data); // Set job data
        console.log("success", response.data);

        // console.log('response is ',response.data);
      }
    } catch (error) {
      console.error("Error fetching job:", error);
    }
  };
  useEffect(() => {
    if (router.isReady) {
      fetchDetail();
    }
  }, [router.isReady, id]);
  if (!job) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <div className="max-w-full mx-auto p-4">
        {/* Job Name with background color */}
        <div className="bg-purple-300 p-4 rounded-md">
          <h2 className="text-2xl font-bold">{job.name}</h2>
          <div className="mt-4">
            <a href="#" className="text-sm mb-2">
              <u>{job.company}.Ltd</u>
            </a>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-4 flex items-center">
              <FaMapMarkerAlt className="mr-2" /> {/* Location icon */}
              <a href="#">{job.location_name}</a>
            </p>
          </div>
        </div>

        {/* Company Name */}

        {/* Job Location */}
      </div>

      {/* Additional Job Details */}
      {/* <div className="max-w-full mx-auto p-4"> */}
      <div className="flex felx-row p-5">
        <div className="w-3/4 mb-5 pr-72">
          {/* <h4 className="text-sm font-semibold text-gray-800 mb-1">
            Education:
          </h4>
          <p>{job.education}</p> */}
          <h4 className="text-sm font-semibold text-gray-800 mb-1">
            Description:
          </h4>
          <p>{job.description}</p>
        </div>

        <div className="w-1/4 mb-5 border border-purple-300 break-words rounded-md">
          <div className="m-5">
            <div className="flex flex-row mb-3">
              <h4 className="w-2/4 text-md font-semibold text-gray-800 mb-1">
                Education:
              </h4>
              <p className="w-3/4 text-sm text-gray-800 ml-1 mt-1">
                {job.education}
              </p>
            </div>
            <div className="flex flex-row mb-3">
              <h4 className="w-2/4 text-md font-semibold text-gray-800 mb-1">
                Job Function:
              </h4>
              <p className="w-3/4 text-sm text-gray-800 ml-1 mt-1">
                {job.function_ids
                  .map((function_arr) => function_arr.function_name)
                  .join(", ")}
              </p>
            </div>
            <div className="flex flex-row mb-3">
              <h4 className="w-2/4 text-md font-semibold text-gray-800 mb-1">
                Job Industry:
              </h4>
              <p className="w-3/4 text-sm text-gray-800 ml-1 mt-1">IT</p>
            </div>

            <div className="flex flex-rowm mb-3">
              <h4 className="w-2/4 text-md font-semibold text-gray-800 mb-1">
                Job Type:
              </h4>
              <p className="w-3/4 text-sm text-gray-800 ml-1 mt-1">Full Time</p>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      <div className="p-5">
        <button
          className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
      {/* Go Back Button */}
    </div>
  );
}

export default JobDetail;
