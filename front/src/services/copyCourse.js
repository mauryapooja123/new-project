import axios from "axios";
import { apiBaseUrl } from "../contants/constants";

const token = localStorage.getItem("admin_token");
const headerData = { Authorization: `Bearer ${token}` };

export const addCourseApi = async (data) => {
  console.log(data, "data");
  try {
    const result = await axios.post(
      `${apiBaseUrl}/admin/courseModule/create`,
      data,
      {
        headers: headerData,
      }
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

export const getCourseApi = async () => {
  //console.log(data, "data");
  try {
    const result = await axios.get(`${apiBaseUrl}/admin/courseModule/getAll`, {
      headers: headerData,
    });
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};
export const getEditCourseApi = async (_id, data) => {
  try {
    const result = await axios.put(
      `${apiBaseUrl}/admin/courseModule/edit/${_id}`,
      data,
      {
        headers: headerData,
      }
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};
export const deleteCourseApi = async (id) => {
  try {
    const result = await axios.delete(
      `${apiBaseUrl}/admin/courseModule/delete/${id}`,

      {
        headers: headerData,
      }
    );
    if (result) {
      return result;
    }
  } catch (err) {
    // return { data: err.response.data };
  }
};

export const SearchCourseApi = async (pageNo, limit, text) => {
  console.log(pageNo, limit, text, "kkkkkkkk");
  try {
    const result = await axios.get(
      `${apiBaseUrl}/admin/courseModule/search/${pageNo}/${limit}/${text}`,

      {
        headers: headerData,
      }
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};
export const getUser = async (pageNo, limit) => {
  console.log(pageNo, limit, "pageno");
  try {
    const result = await axios.get(
      `${apiBaseUrl}/admin/courseModule/get/${pageNo}/${limit}`,

      {
        headers: headerData,
      }
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};
