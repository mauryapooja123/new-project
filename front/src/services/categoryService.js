import axios from "axios";
import { apiBaseUrl } from "../contants/constants";

export const addCourseCategory = async (courseObj) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.post(
      `${apiBaseUrl}/admin/category/create`,
      courseObj,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return {
      status: 200,
      message: response.data.message,
      data: response.data,
    };
  } catch (error) {
    return {
      status: 400,
      message: error.response.data.message,
    };
  }
};
export const getSearchCourseCategory = async (
  pageNumber,
  pageLimit,
  searchValue
) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.get(
      `${apiBaseUrl}/admin/category/search/${pageNumber}/${pageLimit}/${searchValue}`,
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
    };
  }
};

export const getCourseCategory = async (pageNumber, pageLimit) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.get(
      `${apiBaseUrl}/admin/category/get/${pageNumber}/${pageLimit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response;
  } catch (error) {
    return {
      status: 400,
      message: error.message,
    };
  }
};

export const getAllCourseCategory = async () => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.get(`${apiBaseUrl}/admin/category/getAll`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    return {
      status: 400,
      message: error.message,
    };
  }
};
export const deleteCourseCategory = async (id) => {
  try {
    let token = localStorage.getItem("admin_token");
    const response = await axios.delete(
      `${apiBaseUrl}/admin/category/delete/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    return {
      status: 400,
      message: error.message,
    };
  }
};

export const editCourseCategory = async (id, obj) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.put(
      `${apiBaseUrl}/admin/category/edit/${id}`,
      obj,

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
    };
  }
};

export const getCategoryById = async (id) => {
  try {
    let token = localStorage.getItem("admin_token");
    const response = await axios.get(
      `${apiBaseUrl}/admin/category/getById/${id}`,

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
