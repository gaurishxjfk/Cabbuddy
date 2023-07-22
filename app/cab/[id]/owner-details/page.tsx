"use client";
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import OwnerDetails from "@/components/ManageCab/OwnerDetails";

const page = () => {
  return (
    <ProtectedRoute>
      <OwnerDetails />
    </ProtectedRoute>
  );
};

export default page;
