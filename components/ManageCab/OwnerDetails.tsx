"use client";
import React, { useEffect } from "react";
import ManageCab from "@/components/ManageCab/";
import CustomInput from "@/components/InputComp/CustomInput";
import CustomDropDown from "@/components/InputComp/CustomDropDown";
import { CabOwner } from "@/Types";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AdminState } from "@/lib/adminStore";
import { allState } from "@/lib/appStore";
import { patchOwnerDetails } from "@/services/cabApis";

const OwnerDetails = () => {
  const { owner } = AdminState((state) => state);

  const formik = useFormik<CabOwner>({
    initialValues: {
      ownerName: "",
      ownerEmail: "",
      ownerMobileNo: "",
      ownerAddress: "",
      ownerState: "",
      ownerPincode: "",
      terms: false,
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
      terms: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions."
      ),
    }),

    onSubmit: async (values) => {
      if (owner?.id) {
        await patchOwnerDetails({ ...values, id: owner?.id });
      }

      console.log("form submitted");
      console.log(JSON.stringify(values));
    },
  });

  useEffect(() => {
    if (owner?.id) {
      formik.setValues({
        ownerName: owner.ownerName,
        ownerEmail: owner.ownerEmail,
        ownerMobileNo: owner.ownerMobileNo,
        ownerAddress: owner.ownerAddress,
        ownerState: owner.ownerState,
        ownerPincode: owner.ownerPincode,
        terms: owner.terms,
      });
    }
  }, [owner, formik]);
  return (
    <ProtectedRoute>
      <ManageCab>
        <section className="top-0 bottom-0 left-0 right-0 mx-auto ">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white shadow flex flex-col rounded-lg w-full md:w-[95%] mx-auto py-4 gap-3"
          >
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
                className=""
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
                className=""
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
                className=""
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
              className=""
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
                options={allState.map((state) => ({
                  value: state,
                  label: state.charAt(0).toUpperCase() + state.slice(1),
                }))}
                className=""
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
                className=""
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
                  I hereby verify that the information provided above is true
                  and accurate to the best of my knowledge.
                </label>
              </div>
              <p className="text-red-500 text-xs italic block">
                {formik.touched.terms &&
                  formik.errors.terms &&
                  formik.errors.terms}
              </p>
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

export default OwnerDetails;
