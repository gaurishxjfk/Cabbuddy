"use client";
import { Cab, Driver } from "@/components/SVGIcons";
import { AdminState } from "@/lib/adminStore";
import Link from "next/link";
import React from "react";

function AdminSidebar() {
  const { changeOption, option } = AdminState((state) => state);
  return (
    <div className="bg-white m-0 text-darkText flex flex-col gap-5 p-3 rounded-xl drop-shadow w-[13em]">
      <Link
        href={"/admin/manage-cabs"}
        className={`flex gap-4 ${
          option === "cab" && "font-bold bg-darkText text-white"
        } hover:bg-darkText hover:text-white hover:font-bold transition-all rounded-full p-2 px-4 cursor-pointer`}
        onClick={() => changeOption("cab")}
      >
        <label htmlFor="Manage Cab">Manage Cab</label>
      </Link>
      <Link
        href={"/admin/manage-driver"}
        className={`flex gap-4 ${
          option === "driver" && "font-bold bg-darkText text-white"
        } hover:bg-darkText hover:text-white hover:font-bold transition-all rounded-full p-2 px-4 cursor-pointer`}
        onClick={() => changeOption("driver")}
      >
        <label htmlFor="Manage Driver">Manage Driver</label>
      </Link>
      <Link
        href={"/admin/link-cabdriver"}
        className={`flex gap-4 ${
          option === "linkcabdriver" && "font-bold bg-darkText text-white"
        } hover:bg-darkText hover:text-white hover:font-bold transition-all rounded-full p-2 px-4 cursor-pointer`}
        onClick={() => changeOption("linkcabdriver")}
      >
        <label htmlFor="Link Cab-Driver">Link Cab-Driver</label>
      </Link>
    </div>
  );
}

export default AdminSidebar;
