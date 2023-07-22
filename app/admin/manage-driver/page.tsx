"use client";
import React, { useEffect as appEffect, useState as appState } from "react";
import Admin from "../page";
import ManageHeader from "@/components/dashboard/ManageHeader";
import EditCabDetails from "@/components/Modals/Dashboard/EditCabDetails";
import AdminLayout from "@/components/Admin/AdminLayout";
import { AdminState } from "@/lib/adminStore";
import ManageList from "@/components/dashboard/ManageList";
import ManageDriverList from "@/components/ManageDriver/ManageDriverList";

const page = () => {
  const { fetchAllDrivers, driverData } = AdminState(state => state)
  const [searchQuery, setSearchQuery] = appState("");

  appEffect(() => {
    fetchAllDrivers()
  }, []);
  return (
    <AdminLayout>

      <ManageHeader
        title="Manage Driver"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        btnText="Add Driver"
      />
      <ManageDriverList
        data={driverData}
      />
    </AdminLayout>
  );
};

export default page;
