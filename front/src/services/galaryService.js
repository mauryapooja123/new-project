import axios from "axios";
import { apiBaseUrl } from "../contants/constants";

export const getImage = async (pageNumber, pageLimit) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.get(
      `${apiBaseUrl}/admin/galary/get/${pageNumber}/${pageLimit}`,
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

export const createSimpleImage = async (image) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.post(
      `${apiBaseUrl}/admin/galary/createSimpleImage`,
      image,
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
export const addImage = async (image) => {
  try {
    let token = localStorage.getItem("admin_token");

    const response = await axios.post(
      `${apiBaseUrl}/admin/galary/create`,
      image,
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

// export const deleteBlog = async (id) => {
//   try {
//     let token = localStorage.getItem("admin_token");
//     const response = await axios.delete(
//       `${apiBaseUrl}/admin/blog/remove/${id}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     return response;
//   } catch (error) {
//     return {
//       status: 400,
//       message: error.message,
//     };
//   }
// };

// export const getSearchBlog = async (pageNumber, pageLimit, searchValue) => {
//   try {
//     let token = localStorage.getItem("admin_token");

//     const response = await axios.get(
//       `${apiBaseUrl}/admin/blog/search/${pageNumber}/${pageLimit}/${searchValue}`,
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

// export const getBlogById = async (id) => {
//   try {
//     let token = localStorage.getItem("admin_token");
//     const response = await axios.get(
//       `${apiBaseUrl}/admin/blog/byId/${id}`,

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
//       data: "",
//     };
//   }
// };

// export const editBlog = async (id, obj) => {
//   try {
//     let token = localStorage.getItem("admin_token");

//     const response = await axios.put(
//       `${apiBaseUrl}/admin/blog/edit/${id}`,
//       obj,

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
