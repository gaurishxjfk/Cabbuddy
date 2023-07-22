"use client";
import { CabDtls, ManageListProps } from "@/Types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Eye } from "../SVGIcons";
import Link from "next/link";
import { appStore } from "@/lib/appStore";

const ManageList: React.FC<ManageListProps> = ({ data }) => {
  const router = useRouter();
  const { userInfo } = appStore(state => state)

  return (
    <section className="bg-white mx-5 p-3 rounded-2xl drop-shadow mt-2 ">
      {data.length < 1 ? (
        <Image
          src={"/assets/loader.svg"}
          alt="driver img"
          width={135}
          height={135}
        />
      ) : (
        <>
          <ul>
            {data.map((cab: CabDtls) => (
              <li key={cab.id} className="mb-2">
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
                      href={userInfo.isAdmin ? `/admin/manage-cabs/cab/${cab.id}` : `/cab/${cab.id}`}
                      className="flex items-center gap-2 my-auto cursor-pointer"
                    >
                      <Eye width={20} height={20} fill="#02283F" /> View
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* <div>
          {totalPages > 1 && (
            <ul className="flex justify-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`${
                    currentPage === index + 1
                      ? "border border-[#00412B] bg-white text-[#00412B]"
                      : "text-white"
                  } bg-[#00412B] m-2 p-3 py-1  rounded-full cursor-pointer`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </li>
              ))}
            </ul>
          )}
        </div> */}
        </>
      )}
    </section>
  );
};

export default ManageList;
