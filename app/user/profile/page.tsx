"use client";
import { ThreeDots } from "@/components/SVGIcons";
import { appStore } from "@/lib/appStore";
import Image from "next/image";
import React from "react";

const page = () => {
  const { userInfo } = appStore((state) => state);
  console.log(userInfo);
  return (
    <header className="w-full">
      <div className="bg-white p-8  font-normal shadow rounded-md">
        {userInfo.email.length === 0 ? (
          <>
            <Image
              src={"/assets/loader.svg"}
              alt="driver img"
              width={135}
              height={135}
            />
          </>
        ) : (
          <div>
            <h2 className="text-2xl">
              {userInfo.fname + " " + userInfo.lname}
            </h2>
            <p>{userInfo.email}</p>
            <p>MH4321123434289</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default page;
