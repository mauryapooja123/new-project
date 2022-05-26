import axios from "axios";
import { apiBaseUrl } from "../contants/constants";
const token = localStorage.getItem("admin_token");
const headersData = { Authorization: `Bearer ${token}` };

export const postImage = async (img) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/image/create`,
      img,
      {
        headers: headersData,
      }
    );
    console.log(response,"response")

    if (response.status == 200) {
      return {
        data: response.data,
      };
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    return {
      status: 400,
      message: err.message,
      data: "",
    };
  }
};
