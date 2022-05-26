import axios from "axios";
import { apiBaseUrl } from "../contants/constants";

export const addCourse = async (courseObj) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.post(
      `${apiBaseUrl}/admin/course/create`,
      courseObj,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 201) {
      return {
        data: response.data,
      };
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

export const getSearchCourse = async (pageNumber, pageLimit, text) => {
  try {
    let token = localStorage.getItem("admin_token");
    const response = await axios.get(
      `${apiBaseUrl}/admin/course/search/${pageNumber}/${pageLimit}/${text}`,
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
export const getAll = async () => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.get(`${apiBaseUrl}/admin/course/getAll`, {
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
      data: "",
    };
  }
};

export const getAllCourse = async (pageNumber, pageLimit) => {
  try {
    let token = localStorage.getItem("admin_token");
    const response = await axios.get(
      `${apiBaseUrl}/admin/course/get/${pageNumber}/${pageLimit}`,

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

export const editCourse = async (id, obj) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.put(
      `${apiBaseUrl}/admin/course/edit/${id}`,
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
      data: "",
    };
  }
};

export const deleteCourse = async (id) => {
  try {
    let token = localStorage.getItem("admin_token");
    let obj = {
      isDeleted: true,
    };
    const response = await axios.delete(
      `${apiBaseUrl}/admin/course/removeById/${id}`,

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
