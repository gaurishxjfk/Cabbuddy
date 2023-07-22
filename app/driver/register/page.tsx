"use client";
import React, { useEffect } from "react";
import DriverForm from "@/components/ManageDriver/DriverForm";
import { AdminState } from "@/lib/adminStore";
import { useRouter } from "next/navigation";

const page = () => {
  const router =  useRouter()
  const { driver,fetchDriver } = AdminState(state => state)
  useEffect(() => {
    fetchDriver()
  }, [])

  useEffect(() => {
    if(driver){
      router.push("/driver/profile")
    }
  }, [driver])
  return (
    <><DriverForm /></>
  );
};

export default page;
