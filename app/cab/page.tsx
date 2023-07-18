"use client";
import { CabDtls } from "@/Types";
import { Eye } from "@/components/SVGIcons";
import { getUserCabs } from "@/services/userApis";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const ride_status = "Pending";

const page = () => {
  const [userCabsArr, setUserCabsArr] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getUserCabs();
      setUserCabsArr(data);
    };
    fetchData();
  }, []);

  return (
    <div
      className="bg-white shadow w-[95%] rounded-lg mx-auto p-2 mb-2 
                    flex justify-around font-semibold text-darkText"
    >
            {userCabsArr.map((cab: CabDtls) => (
              <div key={cab.id} className="mb-2">
                <div className="grid grid-cols-12 p-2 shadow-md bg-gray-100 rounded-lg my-1 justify-between items-center	">
                  <div className="col-span-2">
                    <Image
                      src={cab.cabImage}
                      alt={cab.cabModel}
                      height={5}
                      width={5}
                      className="h-[5em] w-[5em] rounded-full"
                    />
                  </div>
                  <div className="col-span-4 text-left">
                    <h1 className="font-bold">{cab.cabModel}</h1>
                    <i className="text-gray-700">{cab.cabColor}</i>
                  </div>
                  <div className="col-span-5 flex gap-5">
                    <div>
                      <div className="flex gap-5">
                        <span
                          className={`${
                            cab.fuelType === "Electric"
                              ? "bg-green-600"
                              : "bg-blue-500"
                          } px-2 rounded-md text-white`}
                        >
                          {cab.fuelType}
                        </span>
                        <span className="font-bold">
                          Seat: {cab.seatingCapacity}
                        </span>
                      </div>
                      <div className="">
                        <i>{cab.regNo} </i>
                      </div>
                    </div>
                    <div>
                      <p className="text-center">
                        {cab?.isApproved ? "" : "(Inactive)"}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-between ">
                    <Link
                      href={`/cab/${cab.id}`}
                      className="flex items-center gap-2 my-auto cursor-pointer"
                    >
                      <Eye width={20} height={20} fill="#02283F" /> View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
    </div>
  );
};

export default page;
