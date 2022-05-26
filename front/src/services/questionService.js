import axios from "axios";
import { apiBaseUrl } from "../contants/constants";

export const addQuestion = async (questionObj) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.post(
      `${apiBaseUrl}/admin/question/create`,
      questionObj,
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

export const getAllQuestion = async (pageNumber, pageLimit) => {
  try {
    let token = localStorage.getItem("admin_token");
    const response = await axios.get(
      `${apiBaseUrl}/admin/question/getAll/${pageNumber}/${pageLimit}`,

      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      return response.data;
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

export const getAllQuestionById = async (id) => {
  try {
    let token = localStorage.getItem("admin_token");
    const response = await axios.get(
      `${apiBaseUrl}/admin/question/getAllquestionById/${id}`,

      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      return response.data;
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

export const editQuestion = async (id, obj) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.put(
      `${apiBaseUrl}/admin/question/edit/${id}`,
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

export const getQuestionByModule = async (id) => {
  try {
    let token = localStorage.getItem("admin_token");
    const response = await axios.get(
      `${apiBaseUrl}/admin/question/getQuestionById/${id}`,

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

export const deleteQuestions = async (id) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.delete(
      `${apiBaseUrl}/admin/question/removeById/${id}`,

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
