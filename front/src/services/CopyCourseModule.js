import axios from "axios";
import React from "react";
import { apiBaseUrl } from "../contants/constants";
const token = localStorage.getItem("admin_token");
const headersData = { Authorization: `Bearer ${token}` };

export const addNewCourse = async (course) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/admin/courseModule/create`,
      course,
      { headers: headersData }
    );
    if (response.status === 201) {
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

export const getCourseData = async () => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/admin/courseModule/getAll`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    return {
      status: 400,
      message: error.message,
      data: "",
    };
  }
};

export const deleteCourseData = async (id) => {
  try {
    const response = await axios.delete(
      `${apiBaseUrl}/admin/courseModule/delete/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    return {
      status: 400,
      message: error.message,
      data: "",
    };
  }
};
export const EditCourseData = async (id, data) => {
  try {
    const response = await axios.put(
      `${apiBaseUrl}/admin/courseModule/edit/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    return {
      status: 400,
      message: error.message,
      data: "",
    };
  }
};

export const searchUser = async (pageNo, limit, text) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/admin/courseModule/search/${pageNo}/${limit}/${text}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    return {
      status: 400,
      message: error.message,
      data: "",
    };
  }
};

// export const getCourse = async (pageNo, pageLimit) => {
//   try {
//     const response = await axios.get(
//       `${apiBaseUrl}/admin/courseModule/get/${pageNo}/${pageLimit}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     if (response.status === 200) {
//       return response;
//     } else {
//       throw new Error(response.message);
//     }
//   } catch (error) {
//     return {
//       status: 400,
//       message: error.message,
//     };
//   }
// };
export const getUser = async (pageNo, limit) => {
  console.log(pageNo, limit, "pageno");
  try {
    const result = await axios.get(
      `${apiBaseUrl}/admin/courseModule/get/${pageNo}/${limit}`,

      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};
