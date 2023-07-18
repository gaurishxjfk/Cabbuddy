"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/InputComp/CustomInput";
import CustomDropDown from "@/components/InputComp/CustomDropDown";
import CustomFileUpload from "@/components/InputComp/CustomFileUpload";
import { CabFormValues, FileWithSizeAndType } from "@/Types";
import axios from "axios";
import { fileToBase64 } from "@/helpers/filetoBcase64";




const currentDate = new Date();
const minDate = new Date(
  currentDate.getFullYear() - 18,
  currentDate.getMonth(),
  currentDate.getDate()
)
  .toISOString()
  .split("T")[0];

const EditCabDetails = () => {
  const formik = useFormik<CabFormValues>({
    initialValues: {
      ownerName: "",
      ownerEmail: "",
      ownerMobileNo: "",
      ownerAddress: "",
      ownerState: "",
      ownerPincode: "",
      terms: false,
      regNo: "",
      cabModel: "",
      cabColor: "",
      engineNo: "",
      seatingCapacity: 3,
      fuelType: "",
      cabImage: "",
    },

    validationSchema: Yup.object({
      ownerName: Yup.string()
        .max(20, "Name must be 20 characters or less.")
        .required("Name is required"),
      ownerEmail: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      ownerMobileNo: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      ownerAddress: Yup.string().required("Address is required"),
      ownerState: Yup.string().required("State is required"),
      ownerPincode: Yup.string()
        .matches(/^\d{6}$/, "Pincode must be 6 digits")
        .required("Pincode is required"),
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
      terms: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions."
      ),
      cabImage: Yup.mixed()
        .required("Cab image is required")
        .test("fileSize", "File size must be less than 5MB", function (value) {
          if (!value) return false;
          const fileValue = value as FileWithSizeAndType; // Type assertion
          return fileValue.size <= 5 * 1024 * 1024;
        })
        .test(
          "fileType",
          "Only JPEG or PNG file formats are allowed",
          function (value) {
            if (!value) return false;
            const fileValue = value as FileWithSizeAndType; // Type assertion
            return ["image/jpeg", "image/png"].includes(fileValue.type);
          }
        ),
    }),

    onSubmit: async (values) => {
      await handleOnSubmit(values);
      console.log("form submitted");
      console.log(JSON.stringify(values));
    },
  });

  const handleOnSubmit = async (data: CabFormValues) => {
    if (data.cabImage) {
      const cabImageBase64 = await fileToBase64(data.cabImage);
      data.cabImage = cabImageBase64 as string;
    }
    try {
      const response = await axios.post("/api/cab/create", data);
      console.log("hehehehe", response);
    } catch (error: any) {
      console.log("heheheh22e", error.response.data.error);
    }
  };
  console.log(formik.values.cabImage);
  return (
    <section className="absolute top-0 bottom-0 left-0 right-0 mx-auto z-50">
      <div className="bg-white shadow rounded-lg w-[95%] md:w-[80%] mx-auto p-4 mb-2 text-xl font-semibold text-darkText">
        Car Registration
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow flex flex-col rounded-lg w-[95%] md:w-[80%] mx-auto py-4 gap-3"
      >
        <p className="text-darkText mx-4 text-xl text-center">{`(Car Details)`}</p>
        <div className="flex flex-col md:flex-row">
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
        <p className="text-darkText mx-4 text-xl text-center">{`(Owners Details)`}</p>
        <div className="flex flex-col md:flex-row">
          <CustomInput
            type="text"
            label={"Name"}
            name="ownerName"
            placeholder="Elon Musk"
            value={formik.values.ownerName}
            error={formik.errors.ownerName}
            touched={formik.touched.ownerName}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            className="my-custom-className"
          />
          <CustomInput
            type="text"
            label={"Email"}
            name="ownerEmail"
            placeholder="elon@tesla.com"
            value={formik.values.ownerEmail}
            error={formik.errors.ownerEmail}
            touched={formik.touched.ownerEmail}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            className="my-custom-className"
          />
          <CustomInput
            type="number"
            label={"Mobile Number"}
            name="ownerMobileNo"
            placeholder="9283255444"
            value={formik.values.ownerMobileNo}
            error={formik.errors.ownerMobileNo}
            touched={formik.touched.ownerMobileNo}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            className="my-custom-className"
          />
        </div>
        <CustomInput
          type="text"
          label={"Address"}
          name="ownerAddress"
          placeholder="Enter your address"
          value={formik.values.ownerAddress}
          error={formik.errors.ownerAddress}
          touched={formik.touched.ownerAddress}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          className="my-custom-className"
        />
        <div className="flex flex-col md:flex-row ">
          <CustomDropDown
            label="State"
            name="ownerState"
            value={formik.values.ownerState}
            error={formik.errors.ownerState}
            touched={formik.touched.ownerState}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            options={[
              { value: "state1", label: "State 1" },
              { value: "state2", label: "State 2" },
              // Add more options as needed
            ]}
            className="my-custom-className"
          />
          <CustomInput
            type="number"
            label={"Pincode"}
            name="ownerPincode"
            placeholder="4040302"
            value={formik.values.ownerPincode}
            error={formik.errors.ownerPincode}
            touched={formik.touched.ownerPincode}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            className="my-custom-className"
          />
        </div>

        <div className="flex flex-col mx-4">
          <div className="flex items-center">
            <input
              checked={formik.values.terms ? true : false}
              id="checkbox"
              type="checkbox"
              name="terms"
              value="checked"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className=" w-8 h-8 md:w-4 md:h-4 text-darkText bg-gray-100 border-darkText rounded focus:ring-darkText focus:ring-2"
            />
            <label
              htmlFor="checkbox"
              className="block ml-2 text-sm font-medium text-darkText"
            >
              I hereby verify that the information provided above is true and
              accurate to the best of my knowledge.
            </label>
          </div>
          <p className="text-red-500 text-xs italic block">
            {formik.touched.terms && formik.errors.terms && formik.errors.terms}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mx-4 items-center md:justify-center font-bold text-md text-white">
          <button
            type="submit"
            className="bg-darkText border-2 border-darkText py-2 mt-6 rounded-lg min-w-[25vh] "
          >
            Submit
          </button>
          <button
            type="reset"
            onClick={formik.handleReset}
            className="bg-white py-2 mt-6 border-2 border-darkText text-darkText rounded-lg min-w-[25vh]"
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditCabDetails;
