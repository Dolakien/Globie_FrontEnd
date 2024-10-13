import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const ProfileLayout = () => {
  return (
    <div className="bg-gray-100">
      <div className="grid grid-cols-12 gap-4 container px-3 mx-auto py-8">
        <div className="col-span-12 md:col-span-3">
          <Sidebar />
        </div>

        <div className="col-span-12 md:col-span-9 bg-white rounded">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
