"use client";
import { AdminState } from "@/lib/adminStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect as appEffect, useState as appState } from "react";
import { BackArrow } from "../SVGIcons";
import { appStore } from "@/lib/appStore";

const ManageDriverSidebar: React.FC = () => {
  const { changeOption, driver, fetchDriverById } = AdminState((state) => state);
  const { userInfo } = appStore((state) => state);
  const [option, setOption] = appState("general");
  const path = usePathname();
  const currentId =  path.split("/driver/")[1].split("/")[0];
  const { fetchCab } = AdminState((state) => state);

  appEffect(() => {
    fetchDriverById(parseInt(currentId));
  }, [currentId]);
console.log(userInfo?.isAdmin)
  appEffect(() => {
    path.includes("driver-details")
      ? setOption("driver")
      : path.includes("owner-details")
      ? setOption("owner")
      : setOption("general");
  }, [path]);
  return (
    <div className="bg-white m-0 text-darkText flex md:flex-col gap-5 p-3 rounded-xl drop-shadow w-full md:w-[13em] ">
      <Link
        href={`${userInfo?.isAdmin ? '/admin/manage-driver' : '/driver'}`}
        className={`flex gap-4 border border-darkText rounded-full p-2 px-4 cursor-pointer`}
        onClick={() => changeOption("general")}
      >
        <label htmlFor="Manage Driver" className="flex gap-2 items-center cursor-pointer">
          <BackArrow height={15} width={15} fill="#02283F" /> Main Menu
        </label>
      </Link>
      <Link
        href={`${userInfo?.isAdmin ? '/admin/manage-driver' : ''}/driver/${driver?.id}`}
        className={`flex gap-4 ${
          option === "general" && "font-bold bg-darkText text-white"
        } hover:bg-darkText hover:text-white hover:font-bold transition-all rounded-full p-2 px-4 cursor-pointer`}
        onClick={() => changeOption("general")}
      >
        <label htmlFor="Manage Driver">General</label>
      </Link>
      <Link
        href={`${userInfo?.isAdmin ? '/admin/manage-driver' : ''}/driver/${driver?.id}/driver-details`}///driver/${driver?.id}/driver-details
        className={`flex gap-4 ${
          option === "driver" && "font-bold bg-darkText text-white"
        } hover:bg-darkText hover:text-white hover:font-bold transition-all rounded-full p-2 px-4 cursor-pointer`}
        onClick={() => setOption("driver")}
      >
        <label htmlFor="Manage driver">Driver Details</label>
      </Link>
    </div>
  );
};

export default ManageDriverSidebar;
