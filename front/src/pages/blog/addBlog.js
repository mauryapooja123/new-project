import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import * as blogService from "../../services/blogService";
import * as categoryService from "../../services/categoryService";
import _ from "lodash";
import { CKEditor } from "ckeditor4-react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";

const AddBlog = (props) => {
  let navigate = useNavigate();
  const [categoryoptions, setCategoryoptions] = useState([]);
  const [addBlog, setAddBlog] = useState({
    categoryId: "",
    title: "",
  });
  const [blogImg, setBlogImg] = useState(null);
  const [error, setError] = useState([]);
  const [discription, setDiscription] = useState("");

  useEffect(() => {
    getCategory();
  }, []);

  const formValidation = () => {
    const { categoryId, title } = addBlog;
    let formErrors = {};
    let isValid = true;
    if (!categoryId) {
      isValid = false;
      formErrors["categoryId"] = "Please Select Category";
    }
    if (!title) {
      isValid = false;
      formErrors["title"] = "Please Enter Title";
    }
    if (!discription) {
      isValid = false;
      formErrors["discription"] = "Please Enter Discription";
    }
    if (!blogImg) {
      isValid = false;
      formErrors["blogImg"] = "Please Select Image for Blog";
    }
    setError(formErrors);
    return isValid;
  };

  const clickAddBlog = async (e) => {
    if (formValidation()) {
      try {
        if (blogImg) {
          const formData = new FormData();
          formData.append("blogImg", blogImg);
          formData.append("title", addBlog.title),
            formData.append("categoryId", addBlog.categoryId),
            formData.append("discription", discription);
          addBlogApiCall(formData);
        } else {
          const data = {
            discription: discription,
            title: addBlog.title,
            categoryId: addBlog.categoryId,
          };
          addBlogApiCall(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const addBlogApiCall = async (data) => {
    const response = await blogService.addBlog(data);
    if (response.status === 200) {
      createNotification("success", response.message);
    } else {
      createNotification("error", response.message);
    }
    setTimeout(() => {
      navigate("/blog");
    }, 2000);
  };

  const handleCloseOnCloseButton = () => {
    navigate("/blog");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddBlog({
      ...addBlog,
      [name]: value,
    });
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
            <div className="heading-tilte">
              <h3>Add Blog</h3>
            </div>
            <div className="popup-form-box">
              <div className="form-filed_course">
                <label>Category Id</label>
                <select
                  className="input1"
                  type="text"
                  name="categoryId"
                  placeholder="categoryId"
                  onChange={handleChange}
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
                <span className="form-error">{error.categoryId}</span>
              </div>

              <label>Title</label>
              <input
                className="input1"
                type="text"
                name="title"
                placeholder="Title"
                value={addBlog.title}
                onChange={handleChange}
              />
              <span className="form-error">{error.title}</span>

              <label>Discription</label>
              <CKEditor
                initData={<p></p>}
                onChange={({ editor }) => {
                  let htmlString = editor.getData();

                  setDiscription(htmlString);
                }}
              />
              <span className="form-error">{error.discription}</span>
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
              <Button variant="secondary" onClick={handleCloseOnCloseButton}>
                Back
              </Button>
              <Button type="submit" variant="danger" onClick={clickAddBlog}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </Layout>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default AddBlog;
