import axios from "axios";
import { apiBaseUrl } from "../contants/constants";

export const registerUser = (user) => {
  return axios.post(`${apiBaseUrl}/users/`, { ...user });
};

export const loginUser = async (user) => {
  return await axios.post(`${apiBaseUrl}/admin/login`, { ...user });
};

export const ForgotAPI = async (user) => {
  return await axios.post(`${apiBaseUrl}/admin/forgot`, { ...user });
};

export const ResetAPI = async (data) => {
  return await axios.post(`${apiBaseUrl}/admin/resetPassword`, data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const changePassword = async (obj) => {
  try {
    let token = localStorage.getItem("admin_token");
    const response = await axios.post(
      `${apiBaseUrl}/admin/changePassword`,
      obj,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};
