"use client"
import Hero from "@/components/Hero/Hero";
import ConfirmBooking from "@/components/Modals/ConfirmBooking/";
import { appStore } from "@/lib/appStore";

export default function Home() {
  const {isCarModal} = appStore(state => state)
  console.log(isCarModal)
  return (
    <main className="w-full bg-mainbg relative">
      {/* Hero component */}
      <Hero />
      {isCarModal && <ConfirmBooking />}
    </main>
  );
}
