import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import * as courseServices from "../../services/courseModule";
import * as courseModuleService from "../../services/courseModule";
import * as courseUnitService from "../../services/courseUnitService";
import * as blogService from "../../services/blogService";
import * as categoryService from "../../services/categoryService";

import _ from "lodash";
import { CKEditor } from "ckeditor4-react";
import parse from "html-react-parser";
import Layout from "../../layout/Layout";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";

const EditBlog = (props) => {
  let navigate = useNavigate();
  const MAX_BOARD_SIZE = 12;
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("<p>hello</p>");
  const [blogImg, setBlogImg] = useState(null);
  const [error, setError] = useState({});
  const [categoryoptions, setCategoryoptions] = useState([]);
  const [courseModuleOptions, setCourseModuleOptions] = useState([]);
  const [descriptionInstance, setDescriptionInstance] = useState(null);
  const handleClose = () => {
    navigate("/blog");
  };
  const { id } = useParams();

  useEffect(() => {
    getCategory();
    getBlogById();
  }, []);

  const getBlogById = async () => {
    const response = await blogService.getBlogById(id);
    setTitle(response.data.data.title);
    setCategoryId(response.data.data.categoryId);
    setDiscription(response.data.data.discription);
    setDescriptionInstance("Aman");
  };

  const formValidation = () => {
    let formErrors = {};
    let isValid = true;
    if (!title) {
      isValid = false;
      formErrors["title"] = "Title Required";
    }
    if (!discription) {
      isValid = false;
      formErrors["discription"] = "Discription Required";
    }
    if (!blogImg) {
      isValid = false;
      formErrors["blogImg"] = "Blog Image Required";
    }
    setError(formErrors);
    return isValid;
  };
  const handleEdit = async () => {
    if (formValidation()) {
      const formData = new FormData();
      // formData.append("id", id);
      formData.append("blogImg", blogImg);
      formData.append("title", title),
        formData.append("categoryId", categoryId),
        formData.append("discription", discription);
      const response = await blogService.editBlog(id, formData);
      createNotification("success", response.data.message);
      setTimeout(() => {
        navigate("/blog");
      }, 2000);
      // navigate("/blog");
      // return response;
    }
  };

  const getCategory = async () => {
    const response = await categoryService.getAllCourseCategory();
    setCategoryoptions(response.data.data);
  };

  return (
    <div>
      <Layout>
        <div className="warmup-content-wrappper">
          <div className="plan-wrapper">
            <div>
              <div className="heading-tilte">
                <h3>Edit Blog</h3>
              </div>
              <div className="popup-form-box">
                <div className="form-filed_course">
                  <label>Category Id</label>
                  <select
                    className="input1"
                    type="text"
                    name="categoryId"
                    placeholder="categoryId"
                    value={categoryId}
                    onChange={(e) => {
                      setCategoryId(e.target.value);
                    }}
                  >
                    <option>Select categoryId</option>

                    {categoryoptions &&
                      categoryoptions.length > 0 &&
                      categoryoptions.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                  {/*  <p style={{ color: "red", textAlign: "left", paddingLeft: "20px" }}>
              {error.orderNo}
            </p>*/}
                  <label>Title</label>
                  <input
                    className="input1"
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <span className="form-error">{error.title}</span>
                </div>
                <label>discription</label>
                {descriptionInstance && descriptionInstance !== "" && (
                  <CKEditor
                    initData={<p>{parse(discription)}</p>}
                    onChange={({ editor }) => {
                      let htmlString = editor.getData();
                      setDiscription(htmlString);
                    }}
                  />
                )}
                <label>Image</label>
                <input
                  className="input1"
                  type="file"
                  name="blogImg"
                  placeholder="Select File"
                  // value={blogImg}
                  onChange={(e) => {
                    setBlogImg(e.target.files[0]);
                  }}
                />
                <span className="form-error">{error.blogImg}</span>
              </div>
              <div className="save-changes-btn">
                <Button variant="secondary" onClick={handleClose}>
                  Back
                </Button>
                <Button variant="danger" onClick={handleEdit}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>

      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default EditBlog;
