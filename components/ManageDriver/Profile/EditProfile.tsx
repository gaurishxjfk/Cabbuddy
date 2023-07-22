import { DriverDtls, DriverFormValues } from "@/Types";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import CustomFileUpload from "@/components/InputComp/CustomFileUpload";
import CustomInput from "@/components/InputComp/CustomInput";
import CustomDropDown from "@/components/InputComp/CustomDropDown";
import { allState } from "@/lib/appStore";
import { patchDriverDetails } from "@/services/userApis";
import { AdminState } from "@/lib/adminStore";

const currentDate = new Date();
const minDate = new Date(
  currentDate.getFullYear() - 18,
  currentDate.getMonth(),
  currentDate.getDate()
)
  .toISOString()
  .split("T")[0];

const EditProfile = () => {
  const { driver,fetchDriver } = AdminState((state) => state);
  const formik = useFormik<DriverDtls>({
    initialValues: {
      name: "",
      email: "",
      licenseNo: "",
      mobileNo: "",
      DOB: "",
      address: "",
      state: "",
      pincode: "",
      terms: false,
      licenseImage: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Name must be 20 characters or less.")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      licenseNo: Yup.string()
        .matches(
          /^[A-Z]{2}-?\d{2}\s?\d{4}\s?\d{7}$/,
          "Invalid driving license number"
        )
        .required("License number is required"),
      mobileNo: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      DOB: Yup.string().required("Date of Birth is required"),
      address: Yup.string().required("Address is required"),
      state: Yup.string().required("State is required"),
      pincode: Yup.string()
        .matches(/^\d{6}$/, "Pincode must be 6 digits")
        .required("Pincode is required"),
      terms: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions."
      ),
    }),

    onSubmit: async (values) => {
      if (driver?.id) {
        await patchDriverDetails({ ...values, id: driver?.id });
        await fetchDriver()
        console.log("form submitted");
        console.log(JSON.stringify(values));
      }
    },
  });
  useEffect(() => {
    if (driver?.id) {
      formik.setValues({
        name: driver.name,
        email: driver.email,
        licenseNo: driver.licenseNo,
        mobileNo: driver.mobileNo,
        DOB: driver.DOB,
        address: driver.address,
        state: driver.state,
        pincode: driver.pincode,
        terms: driver.terms,
        licenseImage: driver.licenseImage,
      });
    }
  }, [driver]);
  console.log(driver);
  return (
    <section className="">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col rounded-lg mx-auto "
      >
        <div className="flex flex-col md:flex-row">
          <CustomInput
            type="text"
            label={"Name"}
            name="name"
            placeholder="Elon Musk"
            value={formik.values.name}
            error={formik.errors.name}
            touched={formik.touched.name}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            className="my-custom-className"
          />
          <CustomInput
            type="text"
            label={"Email"}
            name="email"
            placeholder="elon@tesla.com"
            value={formik.values.email}
            error={formik.errors.email}
            touched={formik.touched.email}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            className="my-custom-className"
          />
          <CustomInput
            type="text"
            label={"Liscence Number"}
            name="licenseNo"
            placeholder="MA0320180005634"
            value={formik.values.licenseNo}
            error={formik.errors.licenseNo}
            touched={formik.touched.licenseNo}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            className="my-custom-className"
          />
        </div>

        <div className="flex flex-col md:flex-row my-4">
          <CustomInput
            type="number"
            label={"Mobile Number"}
            name="mobileNo"
            placeholder="9283255444"
            value={formik.values.mobileNo}
            error={formik.errors.mobileNo}
            touched={formik.touched.mobileNo}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            className="my-custom-className"
          />
          <CustomInput
            type="date"
            label={"Date of Birth"}
            name="DOB"
            placeholder="Enter your date of birth"
            value={formik.values.DOB}
            error={formik.errors.DOB}
            touched={formik.touched.DOB}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            className="my-custom-className"
            max={minDate}
          />

          <CustomFileUpload
            name="licenseImage"
            label="License"
            value={formik.values.licenseImage}
            error={formik.errors.licenseImage}
            touched={formik.touched.licenseImage}
            handleChange={formik.setFieldValue}
            handleBlur={formik.handleBlur}
            className="my-custom-className"
          />
        </div>
        <CustomInput
          type="text"
          label={"Address"}
          name="address"
          placeholder="Enter your address"
          value={formik.values.address}
          error={formik.errors.address}
          touched={formik.touched.address}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          className="my-custom-className"
        />
        <div className="flex flex-col md:flex-row my-4">
          <CustomDropDown
            label="State"
            name="state"
            value={formik.values.state}
            error={formik.errors.state}
            touched={formik.touched.state}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            options={allState.map((state) => ({
              value: state,
              label: state.charAt(0).toUpperCase() + state.slice(1),
            }))}
            className="my-custom-className"
          />
          <CustomInput
            type="number"
            label={"Pincode"}
            name="pincode"
            placeholder="Enter your pincode"
            value={formik.values.pincode}
            error={formik.errors.pincode}
            touched={formik.touched.pincode}
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

export default EditProfile;
