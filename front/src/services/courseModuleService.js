import axios from "axios";
import { apiBaseUrl } from "../contants/constants";

export const addCourseModule = async (courseUnitObj) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.post(
      `${apiBaseUrl}/admin/courseModule/create`,
      courseUnitObj,
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
export const getSearchCourseModule = async (
  pageNumber,
  pageLimit,
  searchValue
) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.get(
      `${apiBaseUrl}/admin/courseModule/search/${pageNumber}/${pageLimit}/${searchValue}`,
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

export const getCourse = async () => {
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

export const getOrder = async () => {
  try {
    let token = localStorage.getItem("admin_token");

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
export const getCourseModule = async (pageNumber, pageLimit) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.get(
      `${apiBaseUrl}/admin/courseModule/get/${pageNumber}/${pageLimit}`,
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

export const deleteCourseModule = async (id) => {
  try {
    let token = localStorage.getItem("admin_token");
    const response = await axios.delete(
      `${apiBaseUrl}/admin/courseModule/delete/${id}`,
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

export const editCourseModule = async (id, obj) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.put(
      `${apiBaseUrl}/admin/courseModule/edit/${id}`,
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

export const swapCourseModule = async (obj) => {
  try {
    const { id, idd } = obj;
    let token = localStorage.getItem("admin_token");

    const response = await axios.get(
      `${apiBaseUrl}/admin/courseModule/swap/${id}/${idd}`,

      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    return {
      status: 400,
      message: error.message,
    };
  }
};
