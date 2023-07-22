import { CabFormValues, DriverDtls, DriverFormValues, linkCabDriver } from "@/Types";
import axios from "axios";

export const getUserCabs = async () => {
    try {
      const url = `http://localhost:3000/api/cab/getcab/user`
      const response = await axios.get(url);
      if (response.status === 200) {
        const cabData = response.data;
        console.log(cabData,"jjii")
        return cabData;
      } else {
        console.error("Error:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  export const createCab = async (data: CabFormValues) => {
    try {
      const response = await axios.post("/api/cab/create", data);
      console.log("hehehehe", response);
    } catch (error: any) {
      console.log("heheheh22e", error.response.data.error);
    }
  }

  export const createDriver = async (data: DriverFormValues) => {
    try {
      const response = await axios.post("/api/driver/create", data);
      console.log("hehehehe", response);
    } catch (error: any) {
      console.log("heheheh22e", error.response.data.error);
    }
  }

  export const deleteDriver = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/driver/delete?id=${id}`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  export const patchDriverDetails = async (data: DriverDtls) => {
    try {
      const response = await axios.patch("http://localhost:3000/api/driver/update", data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  export const getDriver = async () => {

    try {
      const url = `http://localhost:3000/api/driver/getdriver`
      const response = await axios.get(url);
      if (response.status === 200) {
        const driver = response.data;
        console.log(driver,"jjii")
        return driver;
      } else {
        console.error("Error:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };


  export const getDriverById = async (id: number) => {

    try {
      const url = `http://localhost:3000/api/driver/getdriver?id=${id}`
      const response = await axios.get(url);
      if (response.status === 200) {
        const driver = response.data;
        console.log(driver,"jjii")
        return driver;
      } else {
        console.error("Error:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  export const getAllDriversData = async () => {
    try {
      const url = `http://localhost:3000/api/driver/getalldriver`
      const response = await axios.get(url);
      if (response.status === 200) {
        const driverData = response.data;
        return driverData;
      } else {
        console.error("Error:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  export const createLink = async (data: linkCabDriver) => {
    try {
      const response = await axios.post("/api/link/create", data);
      console.log("hehehehe", response);
    } catch (error: any) {
      console.log("heheheh22e", error.response.data.error);
    }
  }

