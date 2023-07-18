"use client";
import React, { useEffect as appEffect, useState as appState } from "react";
import Admin from "../page";
import ManageHeader from "@/components/dashboard/ManageHeader";
import { AdminState } from "@/lib/adminStore";
import ManageList from "@/components/dashboard/ManageList";
import EditCabDetails from "@/components/Modals/Dashboard/EditCabDetails";
import AdminLayout from "@/components/Admin/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

const page = () => {
  const { fetchAllCabs, cabData } = AdminState(state => state)
  const [searchQuery, setSearchQuery] = appState("");

  appEffect(() => {
    fetchAllCabs()
  }, []);
  return (
    <ProtectedRoute>
    <AdminLayout>
      <ManageHeader
        title="Manage Cabs"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        btnText="Add Cab"
      />
      <ManageList
        data={cabData}
      />
    </AdminLayout>
    </ProtectedRoute>
  );
};

export default page;
