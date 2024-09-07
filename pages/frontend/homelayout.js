import React from "react";
import Navbar from "./homenavbar";

const HomeLayout = ({ children }) => {
  return (
      <div className="flex-1">
      <Navbar />
        <div className="p-6 bg-gray-100">{children}</div>
      </div>
  );
};

export default HomeLayout;
