import React from 'react';
import Sidebar from './navbar';
import Navbar from './sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1">
      <Sidebar />
        <div className="p-6 bg-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;