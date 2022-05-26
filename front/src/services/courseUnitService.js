import axios from "axios";
import { apiBaseUrl } from "../contants/constants";

export const addCourseUnit = async (courseUnitObj) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.post(
      `${apiBaseUrl}/admin/courseUnit/create`,
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
export const getSearchCourseUnit = async (
  pageNumber,
  pageLimit,
  searchValue
) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.get(
      `${apiBaseUrl}/admin/courseUnit/search/${pageNumber}/${pageLimit}/${searchValue}`,
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

export const getCourseUnit = async (pageNumber, pageLimit) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.get(
      `${apiBaseUrl}/admin/courseUnit/get/${pageNumber}/${pageLimit}`,
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

export const getAllCourseUnit = async () => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.get(`${apiBaseUrl}/admin/courseUnit/getAll`, {
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

export const getAllCourseUnitById = async (id) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.get(
      `${apiBaseUrl}/admin/courseUnit//getById/${id}`,
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

export const deleteCourseUnit = async (id) => {
  try {
    let token = localStorage.getItem("admin_token");
    let obj = {
      isDeleted: true,
    };
    const response = await axios.delete(
      `${apiBaseUrl}/admin/courseUnit/delete/${id}`,
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

export const editCourseUnit = async (id, obj) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.put(
      `${apiBaseUrl}/admin/courseUnit/edit/${id}`,
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

export const swapCourseUnit = async (obj) => {
  try {
    const { fromId, toId } = obj;
    let token = localStorage.getItem("admin_token");

    const response = await axios.get(
      `${apiBaseUrl}/admin/courseUnit/swap/${fromId}/${toId}`,

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
