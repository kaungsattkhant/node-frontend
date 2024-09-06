import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import Link from "next/link";
import { useRouter } from "next/router";

function index() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const [locations, setLocations] = useState([]);
  // useEffect(() => {
  //   fetch(`${baseUrl}/api/locations`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setLocations(data.data);
  //     });
  // }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      const token = localStorage.getItem("jwtToken"); // Get token from localStorage
      if (!token) {
        console.log("No token found, redirecting to login");
        router.push("/auth/login");
        return; // Exit early if no token
      }
      try {
        const response = await fetch(`${baseUrl}/api/locations`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is passed in headers
            "Content-Type": "application/json",
          },
        });
        if (response.status === 403) {
          console.log("Access denied. Redirecting to login.");
          router.push("/auth/login");
        } else if (response.status === 401) {
          console.log("Unauthorized. Redirecting to login.");
          router.push("/auth/login");
        } else if (response.ok) {
          const data = await response.json();
          setLocations(data.data);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchLocations();
  }, [router]);
  return (
    <AdminLayout>
      {/* Here is user page */}
      <div className="container mx-auto py-8">
        {/* Create Button */}
        <div className="flex justify-end mb-4">
          <Link
            href="/user/create"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create User
          </Link>
        </div>

        {/* User List Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr >
                <th className="w-1/4 px-4 py-2">No</th>
                <th className="w-1/4 px-4 py-2">Location Name</th>
                <th className="w-1/4 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location, index) => (
                <tr key={location.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{location.name}</td>
                  <td className="border px-4 py-2">
                    <Link
                      href="#"
                      // href={`/user/${user.id}`}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Edit
                    </Link>
                    {/* <Link
                      onClick={destroyData}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </Link> */}
                    <button
                      // onClick={() => handleDelete(user.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {/* Additional rows can be added here */}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
export default index;
