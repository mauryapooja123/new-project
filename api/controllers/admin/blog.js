const blog = require("../../models/blog");
const blogService = require("../../services/blog");
// const { pick } = require("lodash");

const createBlog = async (req, res) => {
  try {
    const { title, categoryId, discription, addedBy } = req.body;
    // console.log(req.files[0].filename, "image");
    let blog = {
      title,
      categoryId,
      discription,
      addedBy,
    };
    blog.addedBy = req._user._id;
    // console.log(req.files[0], "gggggggg::::::");
    if (req.files[0].filename) {
      blog.blogImg = req.files[0].filename;
    }
    // console.log(blog, "_____________");
    const createdBlog = await blogService.post(blog);
    return res.status(201).json({
      success: true,
      message: "Blog added succesfully",
      data: createdBlog,
    });
    // }
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (req, res) => {
  try {
    // console.log(req.body, "body of get blog::");
    const result = await blogService
      .getAll()
      .populate("categoryId")
      .populate("addedBy", "firstName");
    if (!result) {
      return res.status(200).json({
        message: "Blog not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getBlog = async (req, res) => {
  try {
    let { pageNo, limit } = req.params;
    const response = await blogService
      .getBlogWithPagination(Number(pageNo), Number(limit))
      .populate("categoryId")
      .populate("addedBy", "firstName");

    //   .populate("courseId");
    const count = await blog.count({ isDeleted: false });
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

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await blogService.getByCategoryId(id);
    // const result = response.map((item) => ({
    //   id: item._id,
    //   title: item.title,
    //   courseId: item.courseId,
    // }));
    // console.log(result,":::::")
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

const BlogDelete = async (req, res) => {
  try {
    const response = await blog.updateOne(
      { _id: req.params.id },
      {
        isDeleted: true,
      }
    );
    // console.log(response, "p");
    if (response) {
      return res.status(200).json({
        success: true,
        message: "Blog Deleted Successfully",
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Blog Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const blogEdit = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    if (!blogId)
      return res.status(200).json({
        status: 401,
        success: false,
        message: "blogId is required ",
      });
    let message = "Blog updated successfully";
    // console.log(req.body, "reqbody");
    // console.log(blog, "blog");
    // console.log(blogImg, "blogImg");
    // console.log(req.files[0], "blogobject");
    const blog = {
      title: req.body.title,
      discription: req.body.discription,
      categoryId: req.body.categoryId,
    };
    blog.addedBy = req._user._id;
    if (req.files[0].filename) {
      blog.blogImg = req.files[0].filename;
    }
    let result = await blogService.updateById(blogId, blog);
    // console.log(result, "_____");

    if (!result)
      return res.status(200).json({
        status: 401,
        success: false,
        message: "Only admin can delete or modify project",
      });
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Blog updated successfully",
      data: result,
    });
  } catch (error) {
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};

const BlogSearch = async (req, res) => {
  try {
    let { searchValue, pageNo, limit } = req.params;

    const response = await blogService
      .getCourseBySearch(Number(pageNo), Number(limit), searchValue)
      .populate("categoryId");
    if (response) {
      return res.status(200).json({
        success: true,
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Blog Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await blogService.getOne(id);
    if (response) {
      return res.status(200).json({
        success: true,
        message: "Blog of This Id is...",
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Blog Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    let { _id, pageNo, limit } = req.params;
    // console.log(_id, "222222222");

    let response = {};

    if (_id !== "all") {
      response = await blogService.getByCategoryId(_id);

      return res.status(200).json({
        message: "Blogs get successfully",
        data: response,
        status: 201,
      });
    } else {
      const response = await blogService.getAllBlogcategory(
        Number(pageNo),
        Number(limit)
      );
      const count = await blog.count({});
      if (response) {
        return res.status(200).json({
          message: "Blogs get successfully",
          data: response,
          totalCount: count,
          status: 201,
        });
      } else {
        return res.status(200).json({
          message: "Blogs error ",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createBlog,
  getAll,
  getBlog,
  getBlogById,
  BlogDelete,
  blogEdit,
  BlogSearch,
  getById,
  getAllCategory,
};
