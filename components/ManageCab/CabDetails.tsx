"use client";
import React, { useEffect } from "react";
import ManageCab from "@/components/ManageCab/";
import { CabRegDetails } from "@/Types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fileToBase64 } from "@/helpers/filetoBcase64";
import axios from "axios";
import CustomInput from "@/components/InputComp/CustomInput";
import CustomFileUpload from "@/components/InputComp/CustomFileUpload";
import CustomDropDown from "@/components/InputComp/CustomDropDown";
import { AdminState } from "@/lib/adminStore";
import Image from "next/image";
import { patchCabDetails } from "@/services/cabApis";
import ProtectedRoute from "@/components/ProtectedRoute";

const CabDetails = () => {
  const { cab } = AdminState((state) => state);

  const formik = useFormik<CabRegDetails>({
    initialValues: {
      regNo: "",
      cabModel: "",
      cabColor: "",
      engineNo: "",
      seatingCapacity: 3,
      fuelType: "",
      cabImage: "",
    },

    validationSchema: Yup.object({
      regNo: Yup.string().required("Reg No is required"),
      cabModel: Yup.string().required("Cab Model is required"),
      cabColor: Yup.string().required("Cab Color is required"),
      engineNo: Yup.string().required("Engine No is required"),
      seatingCapacity: Yup.number()
        .required("Seating capacity is required")
        .test(
          "not-zero",
          "Seating capacity should not be zero",
          (value) => value !== 0
        ),
      fuelType: Yup.string().required("Fuel Type is required"),
    }),

    onSubmit: async (values) => {
      // if (values.cabImage) {
      //   const cabImageBase64 = await fileToBase64(values.cabImage);
      //   values.cabImage = cabImageBase64 as string;
      // }
      await patchCabDetails({ ...values, id: cab?.id });
      console.log("form submitted");
      console.log(JSON.stringify(values));
    },
  });

  useEffect(() => {
    if (cab?.id) {
      formik.setValues({
        regNo: cab.regNo,
        cabModel: cab.cabModel,
        cabColor: cab.cabColor,
        engineNo: cab.engineNo,
        seatingCapacity: cab.seatingCapacity,
        fuelType: cab.fuelType,
        cabImage: cab.cabImage,
      });
    }
  }, [formik, cab]);
  console.log(formik.values.cabImage, "ce--");
  return (
    <ProtectedRoute>
      <ManageCab>
        <section className="top-0 bottom-0 left-0 right-0 mx-auto ">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white shadow flex flex-col rounded-lg w-full md:w-[95%] mx-auto py-4 gap-3"
          >
            <div className="flex flex-col md:flex-row items-center">
              {formik.values.cabImage && !formik.errors.cabImage && (
                <Image
                  src={formik.values.cabImage}
                  alt="driver img"
                  width={135}
                  height={135}
                  className="border-2 ml-2 rounded-full w-[7em] h-[7em] "
                />
              )}
              <CustomFileUpload
                name="cabImage"
                label="Cab Image"
                value={formik.values.cabImage}
                error={formik.errors.cabImage}
                touched={formik.touched.cabImage}
                handleChange={formik.setFieldValue}
                handleBlur={formik.handleBlur}
                className="my-custom-className"
              />
              <CustomInput
                type="text"
                label={"Registration No."}
                name="regNo"
                placeholder="s12a123ds12312"
                value={formik.values.regNo}
                error={formik.errors.regNo}
                touched={formik.touched.regNo}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                className="my-custom-className"
              />
              <CustomInput
                type="text"
                label={"Cab Model"}
                name="cabModel"
                placeholder="Hyundai i10"
                value={formik.values.cabModel}
                error={formik.errors.cabModel}
                touched={formik.touched.cabModel}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                className="my-custom-className"
              />
            </div>
            <div className="flex flex-col md:flex-row">
              <CustomInput
                type="text"
                label={"Cab Color"}
                name="cabColor"
                placeholder="silver"
                value={formik.values.cabColor}
                error={formik.errors.cabColor}
                touched={formik.touched.cabColor}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                className="my-custom-className"
              />
              <CustomInput
                type="text"
                label={"Engine No"}
                name="engineNo"
                placeholder="silver"
                value={formik.values.engineNo}
                error={formik.errors.engineNo}
                touched={formik.touched.engineNo}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                className="my-custom-className"
              />
              <CustomDropDown
                label="Fuel Type"
                name="fuelType"
                value={formik.values.fuelType}
                error={formik.errors.fuelType}
                touched={formik.touched.fuelType}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                options={[
                  { value: "Petrol", label: "Petrol" },
                  { value: "Diesel", label: "Diesel" },
                  { value: "Electric", label: "Electric" },
                  { value: "CNG", label: "CNG" },
                ]}
                className="my-custom-className"
              />
              <CustomInput
                type="number"
                label={"Seating Capacity"}
                name="seatingCapacity"
                placeholder="1"
                value={formik.values.seatingCapacity.toString()}
                error={formik.errors.seatingCapacity}
                touched={formik.touched.seatingCapacity}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                className="my-custom-className"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6 mx-4 items-center md:justify-center font-bold text-md text-white">
              <button
                type="submit"
                className="bg-darkText border-2 border-darkText py-2 mt-6 rounded-lg min-w-[25vh] "
              >
                Update
              </button>
            </div>
          </form>
        </section>
      </ManageCab>
    </ProtectedRoute>
  );
};

export default CabDetails;
