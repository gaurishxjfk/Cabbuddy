"use client"
import React, { useRef, useState } from "react";
import CabCard from "./CabCard";
import { Cross } from "@/components/SVGIcons";
import ConfirmBookingCard from "./ConfirmBookingCard";
import { CabObj } from "@/Types";
import { appStore } from "@/lib/appStore";
const cabData = [
  {
    title: "AutoBuddy",
    seating: 3,
    price: 20,
    img: "dd",
    description: "bg-white flex w-[100%] gap-5 items-center p-4 rounded relative",
    id: "as"
  },
  {
    title: "BuddyCab",
    seating: 4,
    price: 25,
    img: "ee",
    description: "xyz",
    id: "bs"
  },
  {
    title: "BuddyGo",
    seating: 5,
    price: 18,
    img: "ff",
    description: "abc",
    id: "cs"
  },
  {
    title: "EcoBuddy",
    seating: 2,
    price: 15,
    img: "gg",
    description: "pqr",
    id: "ds"
  },
  {
    title: "EliteBuddy",
    seating: 4,
    price: 30,
    img: "hh",
    description: "lmn",
    id: "es"
  },
  {
    title: "SquadBuddy",
    seating: 7,
    price: 35,
    img: "ii",
    description: "uvw",
    id: "fs"
  }
]

export const emptyCabObj = {
  title: '',
  price: 0,
  img: '',
  description: '',
  id: '',
  seating: 0,
}

const ConfirmBooking = () => {
  const [selectedCab, setSelectedCab] = useState<CabObj>(emptyCabObj);
  const {isCarModal, toggleCarModal} = appStore(state => state)

  const carModal = useRef<HTMLDivElement | null>(null)
  // const gg = useClickOutside(carModal)
  // useEffect(() => {
    
  //   toggleCarModal(gg)
  
   
  // }, [carModal])
  
  
  // console.log(gg)
  return (
    <section ref={carModal} className=" absolute left-0 right-0 top-0 bottom-0 m-auto z-50  flex justify-center items-center ">
    <div
      className="bg-darkText absolute z-40 h-fit md:h-[80%] w-[95%] left-0 right-0 top-0 bottom-0 m-auto rounded-md
                    bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-darkText shadow-xl flex items-center "
    >
      <button className="absolute right-5 top-5" onClick={() => toggleCarModal(false)}>
        <Cross height={25} width={25} fill="#02283F" />
      </button>
      <div className="mt-16 md:mt-10 w-[100%] flex justify-center items-center">
        <div className="grid md:grid-cols-2 px-2 gap-4 gap-y-4	">
          {cabData.map((cab, j) => (
            <div className="" key={cab.id}>
              <CabCard
                title={cab.title}
                price={cab.price}
                img={cab.img}
                description={cab.description}
                seating={cab.seating}
                id={cab.id}
                setSelectedCab={setSelectedCab}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
     {selectedCab.title !== "" && <ConfirmBookingCard selectedCab={selectedCab} setSelectedCab={setSelectedCab}/> }
    </section>
  );
};

export default ConfirmBooking;
