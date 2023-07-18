"use client";
import React, { ReactNode, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/Admin/AdminLayout";
import { useRouter } from "next/navigation";
import { appStore } from "@/lib/appStore";

const page: React.FC = () => {

  return (
    <ProtectedRoute><AdminLayout /></ProtectedRoute>
    
  );
};

export default page;
