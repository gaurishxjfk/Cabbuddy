"use client";
import { linkCabDriver } from "@/Types";
import AdminLayout from "@/components/Admin/AdminLayout";
import CustomDropDown from "@/components/InputComp/CustomDropDown";
import { AdminState } from "@/lib/adminStore";
import { allState } from "@/lib/appStore";
import { createLink } from "@/services/userApis";
import { useFormik as appFormik } from "formik";
import React, { useEffect as appEffect } from "react";
import * as Yup from "yup";
const page = () => {
  const { fetchAllCabs, cabData, fetchAllDrivers, driverData } = AdminState(
    (state) => state
  );
  const formik = appFormik<linkCabDriver>({
    initialValues: {
      cabId: 0,
      driverId: 0,
    },

    validationSchema: Yup.object({
      cabId: Yup.number().required("cabId is required"),
      driverId: Yup.number().required("driverId is required"),
    }),

    onSubmit: async (values) => {
      await createLink(values)
      console.log("form submitted");
      console.log(values);
    },
  });
  appEffect(() => {
    fetchAllCabs();
    fetchAllDrivers();
  }, []);
  console.log(cabData);
  return (
    <AdminLayout>
      <section className="bg-white p-4 ml-2 w-full rounded-xl shadow">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex">
            <CustomDropDown
              label="Select Cab"
              name="cabId"
              value={formik.values.cabId}
              error={formik.errors.cabId}
              touched={formik.touched.cabId}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              options={cabData.map((cab) => ({
                value: cab.id,
                label: `${cab.cabModel} (${cab.regNo})`,
              }))}
              className="my-custom-className"
            />
            <CustomDropDown
              label="Select Driver"
              name="driverId"
              value={formik.values.driverId}
              error={formik.errors.driverId}
              touched={formik.touched.driverId}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              options={driverData.map((driver) => ({
                value: driver.id,
                label: `${driver.name} (${driver.licenseNo})`,
              }))}
              className="my-custom-className"
            />
          </div>
          <button
            type="submit"
            className="bg-darkText text-white font-bold border-2 border-darkText p-2 mt-6 mx-2 rounded-lg min-w-[25vh] "
          >
            Link
          </button>
        </form>
      </section>
    </AdminLayout>
  );
};

export default page;
