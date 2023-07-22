"use client";
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import CabDetails from "@/components/ManageCab/CabDetails";

const page = () => {
  return (
    <ProtectedRoute>
      <CabDetails />
    </ProtectedRoute>
  );
};

export default page;
