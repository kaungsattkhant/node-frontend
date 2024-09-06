import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
    return (
      <div className="h-screen w-64 bg-gray-800 text-white">
        <div className="p-4 text-xl font-bold">
         Here Job
        </div>
        <nav className="mt-5">
          <Link href="/function" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Function
          </Link>
          <Link href="/location" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Location
          </Link>
          <Link href="/job" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Job
          </Link>
          <Link href="/user" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            User
          </Link>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;