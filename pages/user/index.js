import React, { useEffect } from "react";
import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import Link from "next/link";
import { useRouter } from "next/router";

function index() {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const handleDelete = async (id) => {
    const token = localStorage.getItem("jwtToken");
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`${baseUrl}/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "DELETE",
        });
        // Remove the deleted user from the state
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // useEffect(() => {
  //   fetch(`${baseUrl}/api/users`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUsers(data.data);
  //     });
  // }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("jwtToken"); // Get token from localStorage
      if (!token) {
        console.log("No token found, redirecting to login");
        router.push("/auth/login");
        return; // Exit early if no token
      }
      try {
        const response = await fetch(`${baseUrl}/api/users`, {
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
          setUsers(data.data);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [router]);

  // const destroyData = async (req,res)
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
              <tr>
                <th className="w-1/4 px-4 py-2">No</th>
                <th className="w-1/4 px-4 py-2">Username</th>
                <th className="w-1/4 px-4 py-2">Phone</th>
                <th className="w-1/4 px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.phone_number}</td>
                  <td className="border px-4 py-2">
                    <Link
                      href={`/user/${user.id}`}
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
                      onClick={() => handleDelete(user.id)}
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
