"use client";
import { ThreeDots } from "@/components/SVGIcons";
import { AdminState } from "@/lib/adminStore";
import Image from "next/image";
import React from "react";
import EditProfile from "./EditProfile";
import { deleteDriver } from "@/services/userApis";
import { useRouter } from "next/navigation";

const ProfileHeader = () => {
  const router = useRouter();
  const { driver } = AdminState((state) => state);
  const handleDelete = async () => {
    if (driver?.id) {
      await deleteDriver(driver.id);
      router.push("/driver/register");
    }
  };
  return (
    <header className="w-full flex px-4 gap-4  flex-col-reverse md:flex-row">
      <div className="bg-white p-8 flex flex-col font-normal shadow rounded-md relative items-center">
        <div className="">
          <Image
            src={
              driver?.licenseImage
                ? driver?.licenseImage
                : "/assets/driverImg.png"
            }
            alt="driver img"
            width={135}
            height={135}
            className="rounded-full p-1 h-135 w-135 overflow-hidden"
          />
        </div>
        <div>
          <h2 className="text-xl">{driver?.name}</h2>
          <p>
            {"("}
            {driver?.licenseNo}
            {")"}
          </p>
          <p>MH4321123434289</p>
        </div>
        {driver?.id && (
          <div className="absolute bottom-5 left-0 right-0  text-center">
            <button
              type="submit"
              className="bg-red-500 p-2 rounded-lg  text-white"
              onClick={handleDelete}
            >
              Delete Profile
            </button>
          </div>
        )}
      </div>
      <div className="bg-white shadow w-full p-4 rounded-md">
        <EditProfile />
      </div>
    </header>
  );
};

export default ProfileHeader;
