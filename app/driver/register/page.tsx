"use client";
import React, { useEffect as appEffect } from "react";
import DriverForm from "@/components/ManageDriver/DriverForm";
import { AdminState } from "@/lib/adminStore";
import { useRouter as appRouter } from "next/navigation";

const page = () => {
  const router = appRouter();
  const { driver, fetchDriver } = AdminState((state) => state);
  appEffect(() => {
    fetchDriver();
  }, []);

  appEffect(() => {
    if (driver) {
      router.push("/driver/profile");
    }
  }, [driver, router]);
  return (
    <>
      <DriverForm />
    </>
  );
};

export default page;
