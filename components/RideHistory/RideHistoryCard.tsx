import React from "react";
import buddyGo from "@/public/assets/cars/buddyGo.svg";
import Image from "next/image";
import { Star } from "../SVGIcons";
import { RideHistoryCardProps } from "@/Types";

const getStatusColor = (status: string) => {
  return (
    "bg-" +
    (status.toLowerCase() === "completed"
      ? "green"
      : status.toLowerCase() === "cancelled"
      ? "red"
      : "blue") +
    "-500"
  );
};

const RideHistoryCard: React.FC<RideHistoryCardProps> = ({ rideObj }) => {
  const {
    id,
    cab_details: { title, reg_no, car_model, driver_name },
    ride_status,
    ratings,
  } = rideObj;
  console.log(getStatusColor(ride_status));
  return (
    <div className="bg-white px-4 py-3 flex flex-wrap	 md:flex-nowrap justify-between mx-[10%] rounded-lg mb-5">
      <Image
        src={buddyGo}
        alt="auto img"
        loading="lazy"
        width={80}
        height={80}
      />
      <div className="flex flex-col">
        <h2 className="font-bold">{title}</h2>
        <h2>Reg. No. {reg_no}</h2>
        <h2>Car Model: {car_model} </h2>
        <h2>Driver: C{driver_name} </h2>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2>Status</h2>
        <span
          className={`px-2 py-1 ${
            ride_status.toLowerCase() === "completed"
              ? "bg-green-400"
              : ride_status.toLowerCase() === "cancelled"
              ? "bg-red-400"
              : "bg-blue-500"
          } text-white rounded-full font-bold`}
        >
          {ride_status}
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2>Ratings</h2>
        <span className="flex">
          {[...Array(5)].map((_, j) => (
            <span>
              <Star fill={ratings >= j + 1 ? "#FFD058" : "#BCBCBC"} />
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default RideHistoryCard;
