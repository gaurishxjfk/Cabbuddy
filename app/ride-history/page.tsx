import RideHistoryCard from "@/components/RideHistory/RideHistoryCard";
import { ride_history } from "@/lib/appStore";
import React from "react";

const page = () => {
  return (
    <div className="w-full">
      {ride_history.map((rideObj) => (
        <RideHistoryCard rideObj={rideObj} key={rideObj.id} />
      ))}
    </div>
  );
};

export default page;
