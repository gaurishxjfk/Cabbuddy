import { appState, userInfo } from "@/Types";
import { create } from "zustand";

export const ride_history = [
  {
    id: "124",
    cab_details: {
      id: "124",
      title: "ABC Cab Company",
      img: "cab_image.jpg",
      reg_no: "AB1234",
      car_model: "Toyota Camry",
      driver_name: "John Doe",
    },
    ride_status: "Completed",
    ratings: 4,
  },
  {
    id: "124",
    cab_details: {
      id: "123",
      title: "XYZ Rides",
      img: "cab_image.jpg",
      reg_no: "XY5678",
      car_model: "Honda Accord",
      driver_name: "Jane Smith",
    },
    ride_status: "Cancelled",
    ratings: 0,
  },
];

export const appStore = create<appState>()((set) => ({
  isCarModal: false,
  isLoggedIn: false,
  userInfo: { id: 0, fname: "", lname: "", email: "", isAdmin: false },
  toggleIsLoggedIn: (flag: boolean) => set((state) => ({ isLoggedIn: flag })),
  updateUserInfo: (data: userInfo) => set((state) => ({ userInfo: data })),
  toggleCarModal: (flag: boolean) => set((state) => ({ isCarModal: flag })),
}));

export const allState = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];
