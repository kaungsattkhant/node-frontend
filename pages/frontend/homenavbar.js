import React from 'react';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router=useRouter();
  const handleLogout = () => {
  }
  return (
    <div className="bg-blue-900 text-white h-16 flex items-center justify-between px-6">
      <div className="text-lg font-bold">
        Here Job.com.mm
      </div>
      <div>
        <button onClick={handleLogout} className="bg-white-700 hover:bg-gray-600 px-4 py-2 rounded">
          Register
        </button>
      </div>
    </div>
  );
};

export default Navbar;