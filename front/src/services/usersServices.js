import axios from "axios";
import { apiBaseUrl } from "../contants/constants";

export const getAllusers = async (pageNumber, pageLimit) => {
  try {
    let token = localStorage.getItem("admin_token");
    const response = await axios.get(
      `${apiBaseUrl}/admin/getAllUsers/${pageNumber}/${pageLimit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const EditUSers = async (id, obj) => {
  try {
    let token = localStorage.getItem("admin_token");
    const response = await axios.put(
      `${apiBaseUrl}/admin/profileUpdate/${id}`,
      obj,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async () => {
  let id = localStorage.getItem("user_id");
  try {
    let token = localStorage.getItem("admin_token");
    const response = await axios.get(`${apiBaseUrl}/admin/getUser/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const changeStatus = async (id, obj) => {
  let token = localStorage.getItem("admin_token");
  const response = await axios.patch(
    `${apiBaseUrl}/admin/change-status/${id}/${obj}`,

    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getAllSearchuser = async (pageNumber, pageLimit, text) => {
  try {
    let token = localStorage.getItem("admin_token");
    const response = await axios.get(
      `${apiBaseUrl}/admin/getAllSearchUsers/${pageNumber}/${pageLimit}/${text}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
