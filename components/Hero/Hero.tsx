"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import location from "@/public/assets/icons/location.svg";
import arrow from "@/public/assets/icons/arrow.svg";
import heroImgClient from "@/public/assets/heroImgClient.svg";
import letsGo from "@/public/assets/icons/letsGo.svg";
import { Cross, Location } from "@/components/SVGIcons";
import { appStore } from "@/lib/appStore";
import clsx from "clsx";

const Hero = () => {
  const { toggleCarModal } = appStore((state) => state);

  const destinationRef = useRef<HTMLInputElement>(null);
  const pickUpRef = useRef<HTMLInputElement>(null);

  const [destination, setDestination] = useState("");
  const [togglePickUp, setTogglePickUp] = useState(false);
  const [pickUp, setPickUp] = useState("");
  const handleSubmit = () => {
    setTogglePickUp(destination.length !== 0);
    destination.length !== 0 && pickUp.length !== 0 && toggleCarModal(true);
  };

  useEffect(() => {
    if (destination.length === 0) {
      setTogglePickUp(false);
      setPickUp("");
    } else {
      togglePickUp && pickUpRef.current !== null && pickUpRef.current.focus();
    }
  }, [destination, togglePickUp]);

  return (
    <section className="flex flex-col md:flex-row relative items-center">
      <div
        className="w-[100%] md:w-[60%] lg:w-[40%] px-5 md:pl-16 
                  flex flex-col items-center md:items-start z-10
                  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10
                   h-screen md:h-auto transition-all ease-linear duration-700"
      >
        <div className="text-center md:text-left max-w-[25em] md:max-w-none mt-12">
          <h1 className="text-3xl md:text-4xl font-bold text-darkText">
            Life is short, ride in style with CabBuddy
          </h1>
          <p className="text-gray-600">
            Book a cab with just a few Clicks and enjoy a seamless journey with
            our professional drivers.
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-5 items-center md:items-start">
          <div className="mt-5 flex flex-col gap-5 items-center">
            <div
              className={clsx(
                "bg-white h-[3.2em] rounded-full items-center justify-between px-5 w-[80%] md:w-[100%] relative transition-all duration-700",
                togglePickUp ? "flex" : "hidden"
              )}
            >
              <input
                type="text"
                placeholder="Where to pick you up.."
                className="outline-none w-[95%]"
                value={pickUp}
                onChange={(e) => setPickUp(e.target.value)}
                ref={pickUpRef}
              />
              <Image
                src={arrow}
                alt="lets go icon"
                color="gray"
                className="absolute right-[1.6em] top-5 h-[4.25em] z-50"
              />
            </div>

            <div
              className="bg-white h-[3.2em] rounded-full flex items-center justify-between 
                            px-5 w-[80%] md:w-[100%] relative transition-all duration-700"
            >
              <input
                type="text"
                placeholder="Where are you going.."
                className={`outline-none w-[95%] ${
                  togglePickUp ? "hidden bg-red-600" : "flex "
                }`}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyDown={(e) => e.code === "Enter" && handleSubmit()}
                ref={destinationRef}
              />
              <span
                className={`bg-gray-200 px-3 py-1 rounded-full ${
                  togglePickUp ? "flex items-center" : "hidden"
                }`}
              >
                {destination}
                <button
                  className="ml-3 pr-1"
                  onClick={() => setDestination("")}
                >
                  <Cross
                    fill="#72757C"
                    stroke="#E5E7EB"
                    strokeWidth={2}
                    height={15}
                    width={15}
                  />
                </button>
              </span>
              <span className="absolute right-2 top-3">
                <Location fill="#72757C" height={36} width={36} />
              </span>
            </div>
          </div>

          <button
            className="bg-black text-white relative rounded-full py-3 px-12"
            onClick={() => handleSubmit()}
          >
            Lets Go
            <span className="absolute ml-2">
              <Image src={letsGo} alt="lets go icon" />
            </span>
          </button>
        </div>
      </div>
      <div className="absolute bg-opacity-10 z-0 md:relative ">
        <Image src={heroImgClient} alt="" />
      </div>
    </section>
  );
};

export default Hero;
