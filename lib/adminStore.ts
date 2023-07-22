import { adminState } from "@/Types";
import { getAllCabsData, getCabData } from "@/services/cabApis";
import { getAllDriversData, getDriver, getDriverById } from "@/services/userApis";
import { create } from "zustand";


export const AdminState = create<adminState>()((set) => ({
  option: "",
  cab: undefined,
  owner: undefined,
  driver: undefined,
  cabData: [],
  driverData: [],
  totalPages: 1,
  currentPage: 1,
  changeOption: (type: string) => set(() => ({ option: type })),
  fetchAllCabs: async () => {
    try {
      const { data } = await getAllCabsData()
      set({
        cabData: data
      });
    } catch (error) {
      console.error("Error:", error);
    }
  },
  fetchAllDrivers: async () => {
    try {
      const { data } = await getAllDriversData()
      set({
        driverData: data
      });
    } catch (error) {
      console.error("Error:", error);
    }
  },
  fetchCab: async (id: number) => {
    try {
      const { data: {cab,owner} } = await getCabData(id)
      set({
        cab: cab,
        owner:owner
      });
    } catch (error) {
      console.error("Error:", error);
    }
  },
  fetchOwner: async (id: number) => {
    console.log("mahesg", id)
    try {
      const { data: {owner} } = await getCabData(id)
      set({
        owner: owner
      });
    } catch (error) {
      console.error("Error:", error);
    }
  },
  fetchDriver: async () => {
    try {
      const { data } = await getDriver()
      set({
        driver: data
      });
    } catch (error) {
      console.error("Error:", error);
    }
  },
  fetchDriverById: async (id: number) => {
    try {
      const { data } = await getDriverById(id)
      set({
        driver: data
      });
    } catch (error) {
      console.error("Error:", error);
    }
  },
}));
