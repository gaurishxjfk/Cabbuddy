import axios from "axios";

export const getUserCabs = async () => {
   // console.log("mahesg22", id) id: number

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