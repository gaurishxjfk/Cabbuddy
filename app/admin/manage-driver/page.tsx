"use client";
import React, { useEffect as appEffect, useState as appState } from "react";
import Admin from "../page";
import ManageHeader from "@/components/dashboard/ManageHeader";
import EditCabDetails from "@/components/Modals/Dashboard/EditCabDetails";
import AdminLayout from "@/components/Admin/AdminLayout";

const page = () => {
  const [searchQuery, setSearchQuery] = appState("");
  return (
    <AdminLayout>

      <ManageHeader
        title="Manage Driver"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        btnText="Add Driver"
      />
    </AdminLayout>
  );
};

export default page;
