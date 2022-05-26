const blog = require("../../models/blog");
const blogService = require("../../services/blog");

const getBlog = async (req, res) => {
  try {
    let { pageNo, limit } = req.params;
    const response = await blogService
      .getBlogWithPagination(Number(pageNo), Number(limit))
      .populate("addedBy", "firstName");
    const count = await blog.count({ isDeleted: false });
    // console.log(response, "response::::::::");
    if (!response) {
      return res.status(200).json({
        message: "Blog not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        message: "Blogs get successfully",
        data: response,
        totalCount: count,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const getAll = async (req, res) => {
  //   const filters = req.query;
  //   debugger;
  //   try {
  //     if (!filters) {
  //       console.log(req.body, "body of get blog::");
  //       const result = await blogService.getAll().populate("categoryId");
  //       if (!result) {
  //         return res.status(200).json({
  //           message: "Blog not found",
  //           status: 404,
  //         });
  //       } else {
  //         return res.status(200).json({
  //           data: result,
  //         });
  //       }
  //     } else {
  //       const result = await blogService.getAll();
  //       console.log(result, "result of else part");
  //       const filteredBlog = result.filter((blogs) => {
  //         let isValid = true;
  //         for (key in filters) {
  //           console.log(
  //             key,
  //             blogs[key],
  //             filters[key],
  //             "keys in blogs and query params"
  //           );
  //           isValid = isValid && blogs[key] == filters[key];
  //         }
  //         return isValid;
  //       });
  //       //   if (!result) {
  //       //     return res.status(200).json({
  //       //       message: "Blog not found",
  //       //       status: 404,
  //       //     });
  //       //   } else {
  //       //     return res.status(200).json({
  //       //       data: result,
  //       //     });
  //       //   }
  //       console.log(filteredBlog, "filtered data of blog");
  //       res.send(filteredBlog);
  //     }
  //   } catch (error) {
  //     return res.status(500).json({
  //       message: error.message,
  //       success: false,
  //     });
  //   }
};

// const getBlogByCategoryId = async (req, res) => {
//   debugger;
//   try {
//     const { id } = req.params;
//     console.log(id, "id of get by id");
//     if (id == "all") {
//       const response = await blogService
//         .getBlogWithPagination(Number(pageNo), Number(limit))
//         .populate("categoryId");
//       const count = await blog.count({});
//       if (!response) {
//         return res.status(200).json({
//           message: "Blog not found",
//           status: 404,
//         });
//       } else {
//         return res.status(200).json({
//           message: "Blogs get successfully",
//           data: response,
//           totalCount: count,
//         });
//       }
//     } else {
//       const response = await blogService.getByCategoryId(id);
//       if (!response) {
//         return res.status(200).json({
//           message: "Blog of this category not found",
//           status: 404,
//         });
//       } else {
//         return res.status(200).json({
//           data: response,
//         });
//       }
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };

const getBlogByCategoryId = async (req, res) => {
  try {
    const { id, pageNo, limit } = req.params;
    // console.log(limit, "limit");
    // console.log(id, "id of get by id");
    if (id == "all") {
      const result = await blogService
        .getBlogWithPagination(Number(pageNo), Number(limit))
        .populate("addedBy", "firstName");
      const count = await blog.count({ isDeleted: false });
      if (!result) {
        return res.status(200).json({
          message: "Blog not found",
          status: 404,
        });
      } else {
        return res.status(200).json({
          data: result,
          totalCount: count,
        });
      }
    } else {
      const response = await blogService
        .getByCategoryId(id, Number(pageNo), Number(limit))
        .populate("addedBy", "firstName");
      // console.log(id, pageNo, limit, "response");
      const count = await blog.count({ isDeleted: false, categoryId: id });
      // const count = blogService.getCountByCategoryId();
      // console.log(count, "count");
      // console.log(response.length, "count ");
      //   const count = await response.data.count({});
      if (!response) {
        return res.status(200).json({
          message: "Blog of this category not found",
          status: 404,
        });
      } else if (response.length == 0) {
        return res.status(200).json({
          data: response,
          message: "No Blog Found!!",
          totalCount: count,
        });
      } else {
        return res.status(200).json({
          data: response,
          message: "Blog of category is...",
          totalCount: count,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await blogService
      .getBlogById(id)
      .populate("addedBy", "firstName");

    if (!response) {
      return res.status(200).json({
        message: "Data not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        data: response,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  getAll,
  getBlog,
  getBlogByCategoryId,
  getBlogById,
};
