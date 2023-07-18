"use client";
import React, { ReactNode } from "react";
import ManageCabSidebar from "./ManageCabSidebar";
interface Props {
  children?: ReactNode;
}
const page: React.FC<Props> = ({ children }) => {
  return (
    <main className="p-5 flex flex-col md:flex-row relative gap-2 md:gap-0">
      <section className=" rounded-full">
        <ManageCabSidebar />
      </section>
      <section className="rounded-full relative w-full">{children}</section>
    </main>
  );
};

export default page;
