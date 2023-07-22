"use client";
import React, { useEffect as appEffect, useState as appState } from "react";
import { Search } from "../SVGIcons";
import { ManageHeaderProps } from "@/Types";
import Link from "next/link";

const ManageHeader: React.FC<ManageHeaderProps> = ({
  title,
  searchQuery,
  setSearchQuery,
  btnText,
  href
}) => {
  return (
    <section className=" bg-white mx-5  rounded-2xl drop-shadow">
      <header className="text-darkText w-fit font-bold w- bg-[#E9F9F3] rounded-t-2xl rounded-r-none p-2 px-12">
        {title}
      </header>
      <div className="mt-5 flex justify-between items-end p-3">
        <div className="relative w-[60%]">
          <input
            type="text"
            className="border-b-2 outline-none w-full pr-6"
            placeholder="Search for cab"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-0">
            <Search stroke="#02283F" height={24} width={24} />
          </button>
        </div>
        <Link className="bg-[#E9F9F3] px-3 py-2 rounded-lg font-bold text-darkText" href={href ? href : "/"}>
          {btnText}
        </Link>
      </div>
    </section>
  );
};

export default ManageHeader;
