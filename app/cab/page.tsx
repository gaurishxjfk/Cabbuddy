"use client";
import ManageHeader from "@/components/dashboard/ManageHeader";
import ManageList from "@/components/dashboard/ManageList";
import { getUserCabs } from "@/services/userApis";
import React, { useEffect, useState } from "react";
const ride_status = "Pending";

const page = () => {
  const [userCabsArr, setUserCabsArr] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getUserCabs();
      setUserCabsArr(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <ManageHeader
        title="My Cabs"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        btnText="Add Cab"
        href="/cab/register"      />
      <ManageList
        data={userCabsArr}
      />
    </>
  );
};

export default page;
