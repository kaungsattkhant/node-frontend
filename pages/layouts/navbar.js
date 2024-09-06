import React from 'react';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router=useRouter();
  const handleLogout = () => {
    console.log('aa');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    router.push('/auth/login');
  }
  return (
    <div className="bg-gray-900 text-white h-16 flex items-center justify-between px-6">
      <div className="text-lg font-bold">
        Welcome, Admin
      </div>
      <div>
        <button onClick={handleLogout} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;