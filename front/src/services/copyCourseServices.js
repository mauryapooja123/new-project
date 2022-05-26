import axios from "axios";
import { apiBaseUrl } from "../contants/constants";

const token = localStorage.getItem("admin_token");
const headersData = { Authorization: `Bearer ${token}` };

export const addNewCourse = async (course) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/admin/course/create`,
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

export const getPaginationRecords = async (pageNumber, pageLimit) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/admin/course/get/${pageNumber}/${pageLimit}`,
      {
        headers: headersData,
      }
    );
    if (response.status == 200) {
      return response;
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

export const getAllRecords = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/admin/course/getAll`, {
      headers: headersData,
    });
    if (response.status == 200) {
      return response;
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

export const deleteRecord = async (id) => {
  try {
    const response = await axios.delete(
      `${apiBaseUrl}/admin/course/removeById/${id}`,
      {
        headers: headersData,
      }
    );
    if (response.status == 200) {
      return response;
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

export const editRecord = async (id, data) => {
  try {
    const response = await axios.put(
      `${apiBaseUrl}/admin/course/edit/${id}`,
      data,
      {
        headers: headersData,
      }
    );
    if (response.status == 200) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    return {
      data: "",
      message: err.message,
      status: 400,
    };
  }
};

export const getRecordsById = async (id) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/admin/course/getById/${id}`,
      {
        headers: headersData,
      }
    );
    if (response.status == 200) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    return {
      status: 400,
      data: "",
      message: err.message,
    };
  }
};

export const getSearchedCourse = async (pageNumber, pageLimit, text) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/admin/course/search/${pageNumber}/${pageLimit}/${text}`,
      {
        headers: headersData,
      }
    );
    console.log(pageNumber, pageLimit, text, "psdodo");
    if (response.status == 200) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    return {
      data: "",
      status: 400,
      message: err.message,
    };
  }
};
