import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa"; // Import profile icon

const Navbar = () => {
  const [authUser, setAuthUser] = useState(null); // To store auth_user
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("customer");
    localStorage.removeItem("customerjwtToken");
    setAuthUser(null); // Reset authUser state
    router.push("/frontend/login"); // Redirect to login page
  };
  useEffect(() => {
    const fetchData = async () => {
      const customer = localStorage.getItem("customer");
      if (customer) {
        setAuthUser(JSON.parse(customer)); // Parse the user and set it in state
      }
    };
    fetchData();
  }, []);
  return (
    <div className="bg-blue-900 text-white h-16 flex items-center justify-between px-6">
      <div className="text-lg font-bold">Here Job.com.mm</div>
      <div>
        {/* <Link
          href="/frontend/register"
          className="bg-white-700 hover:bg-gray-600 px-4 py-2 rounded"
        >
          Register
        </Link> */}
        {authUser ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {/* Profile icon */}
              <FaUserCircle className="w-8 h-8 text-white" />

              {/* User's name */}
              <span className="text-white">{authUser.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Link
                href="/frontend/login"
                className=" px-4 py-2 rounded hover:underline"
              >
                Login
              </Link>
            </div>
            <Link
              href="/frontend/register"
              className="bg-blue hover:text-white bg-gray-600 px-4 py-2 rounded"
            >
              Register
            </Link>
            {/* <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Logout
            </button> */}
          </div>
          //    <Link
          //    href="/frontend/register"
          //    className="bg-blue hover:text-white bg-gray-600 px-4 py-2 rounded"
          //  >
          //    Register
          //  </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
