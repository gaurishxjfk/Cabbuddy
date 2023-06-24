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
interface appState {
  isCarModal: boolean;
  toggleCarModal: () => void;
}
export const appStore = create<appState>()((set) => ({
  isCarModal: false,
  toggleCarModal: () => set((state) => ({ isCarModal: !state.isCarModal })),
}));
