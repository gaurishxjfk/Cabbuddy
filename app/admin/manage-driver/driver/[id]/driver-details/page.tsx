"use client";
import { AdminState } from "@/lib/adminStore";
import ManageDriver from "@/components/ManageDriver/";
import React from "react";
import EditProfile from "@/components/ManageDriver/Profile/EditProfile";

const page = () => {
  const { driver, fetchDriverById } = AdminState((state) => state);
  console.log(driver);
  return (
    <ManageDriver>
      <div className="bg-white p-4 rounded-lg ml-4">
        <EditProfile />
      </div>
    </ManageDriver>
  );
};

export default page;
