import { CabRegDetails, CabOwner } from "@/Types";
import axios from "axios";

export const getAllCabsData = async () => {
    try {
      const url = `http://localhost:3000/api/cab/getallcab`
        // ? `http://localhost:3000/api/manageitems/cab?name=${encodeURIComponent(
        //     name
        //   )}&page=${currentPage}`
        // : `http://localhost:3000/api/manageitems/cab?page=${currentPage}`;
      const response = await axios.get(url);
      if (response.status === 200) {
        const cabData = response.data;
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

  export const getCabData = async (id: number) => {
    console.log("mahesg22", id)

    try {
      const url = `http://localhost:3000/api/cab/getcab?id=${id}`
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

  export const getOwnerData = async (id: number) => {
    console.log("mahesg22", id)

    try {
      const url = `http://localhost:3000/api/cab/getowner?id=${id}`
      const response = await axios.get(url);
      if (response.status === 200) {
        const cabData = response.data;
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

  export const patchCabDetails = async (data: CabRegDetails) => {
    try {
      const response = await axios.patch("http://localhost:3000/api/cab/update/cabdetails", data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  export const updateCabSatus = async (data: { id: number, isApproved: boolean}) => {
    try {
      const response = await axios.patch("http://localhost:3000/api/cab/update/cabstatus", data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  export const deleteCab = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/cab/delete?id=${id}`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  export const patchOwnerDetails = async (data: CabOwner) => {
    try {
      const response = await axios.patch("http://localhost:3000/api/cab/update/cabowner", data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };