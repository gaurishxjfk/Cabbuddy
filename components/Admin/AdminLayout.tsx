"use client";
import React, { ReactNode } from "react";

import AdminSidebar from "@/app/admin/AdminSidebar";
interface Props {
  children?: ReactNode;
}
const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <main className="p-5 flex relative">
      <section className=" rounded-full">
        <AdminSidebar />
      </section>
      <section className="rounded-full relative w-full">
        {children}
      </section>
    </main>
  );
};


// const ProtectedPage = ProtectedRoute(AdminLayout);

export default AdminLayout;
