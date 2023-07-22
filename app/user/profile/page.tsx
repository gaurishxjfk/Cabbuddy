"use client";
import { ThreeDots } from "@/components/SVGIcons";
import { appStore } from "@/lib/appStore";
import axios from "axios";
import Image from "next/image";
import React from "react";

const page = () => {
  const { userInfo } = appStore((state) => state);
  console.log(userInfo);
    // Logout function to handle the logout action
    async function handleLogout() {
      try {
        await axios.post("http://localhost:3000/api/users/logout");
      } catch (error) {
        console.error("Error logging out", error);
      }
    }
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
        <button
          type="submit"
          className="bg-darkText text-white font-bold py-2 mt-6 rounded-lg min-w-[25vh] "
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default page;
