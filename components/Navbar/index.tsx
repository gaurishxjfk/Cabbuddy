"use client";
import Link from "next/link";
import Image from "next/image";
import  {Encode_Sans_Semi_Condensed}  from "next/font/google";
import React, { useState } from "react";

import cabbuddy from "@/public/assets/icons/cabbuddy.svg";
import HambergerMenu from "./HambergerMenu";

const workSans = Encode_Sans_Semi_Condensed({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const index = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-[#E0F4FB] py-6 px-[1em] md:px-[3em] lg:px-[5em] flex justify-between items-center ">
      <div className="w-[8rem] sm:w-[12.5rem] ">
        <Image src={cabbuddy} alt="lets go icon" />
      </div>

      <div className="relative">
        <HambergerMenu open={open} setOpen={setOpen}/>
        <div
          className={` justify-between gap-4 md:gap-12 lg:gap-20 
                  text-darkText text-lg sm:text-xl flex-col sm:flex-row ${
                    workSans.className
                  }
                    absolute right-2 sm:relative transition-all duration-700
                    bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 bg-gray-700 px-5 py-3 sm:bg-transparent sm:px-0 sm:py-0 
                    rounded-lg ${
                      open
                        ? "flex top-5 sm:top-0 min-w-[10em] z-20 shadow-md"
                        : "hidden sm:flex"
                    }
                  `}
        >
          <Link className={`font-bold`} href={"/"}>
            Home
          </Link>
          <Link className={``} href={"/ride-history"}>
            Your Rides
          </Link>
          <Link className={``} href={"/auth/register"}>
            Login / Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default index;
