"use client"
import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { DriverProfileValues, FileWithSizeAndType } from '@/Types';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import EditProfile from '@/components/Profile/EditProfile';

const page = () => {
    const formik = useFormik<DriverProfileValues>({
        initialValues: {
          mobileNo: "",
          address: "",
          state: "",
          pincode: "",
          profileImage: null,
        },
    
        validationSchema: Yup.object({
          mobileNo: Yup.string()
            .matches(/^\d{10}$/, "Mobile number must be 10 digits")
            .required("Mobile number is required"),
          address: Yup.string().required("Address is required"),
          state: Yup.string().required("State is required"),
          pincode: Yup.string()
            .matches(/^\d{6}$/, "Pincode must be 6 digits")
            .required("Pincode is required"),
            profileImage: Yup.mixed()
            .test("fileSize", "File size must be less than 2MB", function (value) {
              if (!value) return false;
              const fileValue = value as FileWithSizeAndType; // Type assertion
              return fileValue.size <= 2 * 1024 * 1024;
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
    
        onSubmit: (values) => {
          console.log("form submitted");
          console.log(JSON.stringify(values));
        },
      });
  return (
    <div className=" rounded-lg w-[95%] md:w-[80%] mx-auto p-2 mb-2 
    flex text-darkText relative">
        <ProfileHeader />
        <section className='absolute top-0 bottom-0 right-0 left-0'><EditProfile /></section>
        
    </div>
  )
}

export default page