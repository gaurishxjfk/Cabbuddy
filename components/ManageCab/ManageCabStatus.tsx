"use client";
import React from "react";
import ManageCab from "@/components/ManageCab/";
import { AdminState } from "@/lib/adminStore";
import { deleteCab, updateCabSatus } from "@/services/cabApis";
import { useRouter } from "next/navigation";

const ManageCabStatus = () => {
  const router = useRouter();
  const { cab, fetchCab, owner } = AdminState((state) => state);

  const handleApprove = async () => {
    if (cab?.id) {
      let obj = {
        id: cab.id,
        isApproved: !cab.isApproved,
      };
      const res = await updateCabSatus(obj);
      await fetchCab(cab.id);
    }
  };

  const handleDelete = async () => {
    if (cab?.id) {
      try {
        const res = await deleteCab(cab.id);
        router.push("/admin/manage-cabs");
      } catch (error) {
        console.log("error in deletion of cab", error);
      }
    }
  };
  return (
    <ManageCab>
      <div className="bg-white shadow rounded-lg w-[95%] mx-auto p-4 mb-2 text-xl font-semibold text-darkText">
        <div className="flex gap-1">
          <p>{`Cab :`}</p>{" "}
          <span>
            {cab?.cabModel} {"("}
            {cab?.cabColor}
            {")"}
          </span>
        </div>
        <div className="flex gap-1">
          <p>{`Owner :`}</p>{" "}
          <span>
            {owner?.ownerName}
          </span>
        </div>
        <div className="flex gap-1">
          <p>{`Total Rides :`}</p> <span>12</span>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-darkText py-2 mt-6 rounded-lg min-w-[25vh] text-white text-sm "
            onClick={() => handleApprove()}
          >
            {cab?.isApproved ? "Deactivate" : "Set to Active"}
          </button>
          <button
            type="submit"
            className="bg-red-500 py-2 mt-6 rounded-lg min-w-[25vh] text-white text-sm "
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </div>
      </div>
    </ManageCab>
  );
};

export default ManageCabStatus;
