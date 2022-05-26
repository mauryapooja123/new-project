import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import * as courseServices from "../../services/courseModule";
import * as courseModuleService from "../../services/courseModule";
import * as courseUnitService from "../../services/courseUnitService";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";
import _ from "lodash";
import * as courseModule from "../../services/courseModule";
import stateJson from "../../config/state.json";
import { CKEditor } from "ckeditor4-react";
import parse from "html-react-parser";
import Layout from "../../layout/Layout";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SelectGalleryPopup } from "./SelectGalleryPopup";

const EditCourseUnit = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState("");
  const [courseId, setCourseId] = useState("");
  const [module, setModule] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("<p>hello</p>");
  const [orderNo, setOrderNo] = useState();
  const [youTubeLink, setYouTubeLink] = useState("");
  const [error, setError] = useState({});
  const [courseoptions, setCourseoptions] = useState([]);
  const [courseModuleOptions, setCourseModuleOptions] = useState([]);
  const [contentInstance, setContentInstance] = useState("");
  const [courseState, setCourseState] = useState([]);
  const [stateTitle, setStateTitle] = useState("");

  useEffect(() => {
    getCourse();
  }, []);

  useEffect(() => {
    setCourseState(stateJson.states);
  }, []);

  // useEffect((state) => {
  //   getCourseTitle(state);
  // }, []);

  const { _id } = useParams();

  useEffect(async () => {
    const response = await courseUnitService.getAllCourseUnitById(_id);
    // console.log(response.data.data, "::::::::responsedata:::::::");
    if (response) {
      getCourseTitle(response.data.data.state);
    }
    if (response) {
      getCourseModule(response.data.data.courseId);
    }

    setState(response.data.data.state ? response.data.data.state : "");
    setCourseId(response.data.data.courseId ? response.data.data.courseId : "");
    setTitle(response.data.data.title ? response.data.data.title : "");
    setModule(response.data.data.module ? response.data.data.module : "");
    setOrderNo(response.data.data.orderNo ? response.data.data.orderNo : "");
    setYouTubeLink(
      response.data.data.youTubeLink ? response.data.data.youTubeLink : ""
    );
    setContent(
      response.data.data.content ? response.data.data.content : "<p></p>"
    );
    setContentInstance("aman");
    // setContentInstance.setData(response.data.data.content)
  }, []);

  const formValidation = () => {
    const obj = {
      state: state,
      courseId: courseId,
      module: module,
      title: title,
      content: content,
      orderNo: orderNo,
      youTubeLink: youTubeLink,
      contentInstance: contentInstance,
    };

    let formErrors = {};
    let isValid = true;
    if (!state) {
      isValid = false;
      formErrors["state"] = "Please enter state ";
    }
    if (!courseId) {
      isValid = false;
      formErrors["courseId"] = "Please enter course ";
    }
    if (!module) {
      isValid = false;
      formErrors["module"] = "Please enter module";
    }
    if (!title) {
      isValid = false;
      formErrors["title"] = "Title is required";
    }
    if (!youTubeLink) {
      isValid = false;
      formErrors["youTubeLink"] = "YouTubeLink is required";
    }
    if (!content) {
      isValid = false;
      formErrors["content"] = "Content is required";
    }
    if (!orderNo) {
      isValid = false;
      formErrors["orderNo"] = "Order Number is required";
    }

    setError(formErrors);
    return isValid;
  };

  const handleEdit = async () => {
    if (formValidation()) {
      const obj = {
        state: state,
        courseId: courseId,
        module: module,
        title: title,
        content: content,
        orderNo: orderNo,
        youTubeLink: youTubeLink,
      };
      const response = await courseUnitService.editCourseUnit(_id, obj);
      if (response.status == 200) {
        createNotification("success", response.data.message);
        setTimeout(() => {
          navigate("/courseunit");
        }, 3000);
      } else {
        createNotification("error", response.data.message);
      }
      return response;
    }
  };

  const getCourse = async () => {
    const response = await courseServices.getAll();
    setCourseoptions(response.data.data);
  };
  const getCourseTitle = async (state) => {
    const response = await courseModule.getTitleByState(state);
    setStateTitle(response.data.data);
  };

  const getCourseModule = async (courseId) => {
    const response = await courseModuleService.getModuleById(courseId);
    setCourseModuleOptions(response.data.data);
  };

  return (
    <div>
      <Layout>
        <div className="warmup-content-wrappper">
          <div className="plan-wrapper">
            <React.Fragment>
              <div>
                <div className="heading-tilte">
                  <h3>Edit Course Unit</h3>
                </div>
                <div className="popup-form-box">
                  <label>Course State</label>
                  <select
                    className="input1"
                    name="state"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      getCourseTitle(e.target.value);
                    }}
                  >
                    <option value="">Select Course State</option>

                    {courseState &&
                      courseState.length > 0 &&
                      courseState.map((item) => (
                        <option key={item.name} value={item.state}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                  <span className="form-error">{error.state}</span>
                  <div className="form-filed_course">
                    <label>Select Course Title</label>
                    <select
                      className="input1"
                      name="courseId"
                      type="text"
                      value={courseId}
                      onChange={(e) => {
                        setCourseId(e.target.value);
                        getCourseModule(e.target.value);
                      }}
                    >
                      <option>Select Course Title</option>
                      {stateTitle &&
                        stateTitle.length > 0 &&
                        stateTitle.map((item) => {
                          return courseId == item.title ? (
                            <option
                              key={item._id}
                              value={item._id}
                              selected="selected"
                            >
                              {item.title}
                            </option>
                          ) : (
                            <option key={item.title} value={item._id}>
                              {item.title}
                            </option>
                          );
                        })}{" "}
                    </select>
                    <span className="form-error">{error.courseId}</span>
                  </div>
                  <div className="form-filed_course">
                    <label>Select Module</label>
                    <select
                      className="input1"
                      name="module"
                      type="text"
                      value={module}
                      onChange={(e) => {
                        setModule(e.target.value);
                      }}
                    >
                      <option>Select Module</option>
                      {courseModuleOptions &&
                        courseModuleOptions.length > 0 &&
                        courseModuleOptions.map((item) => (
                          <option key={item.courseId} value={item.id}>
                            {item.title}
                          </option>
                        ))}
                    </select>
                    <span className="form-error">{error.module}</span>
                  </div>
                  <div className="form-filed_course">
                    <label>Title</label>
                    <input
                      className="input1"
                      name="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <span className="form-error">{error.title}</span>
                  </div>
                  <div className="form-filed_course">
                    <label>Content</label>
                    {contentInstance && contentInstance !== "" && (
                      <CKEditor
                        initData={content}
                        onChange={({ editor }) => {
                          let htmlString = editor.getData();
                          setContent(htmlString);
                        }}
                        config={{
                          uiColor: "#AADC6E",
                        }}
                      />
                    )}
                    {/* <span className="form-error">{error.contentInstance}</span> */}
                  </div>
                  <div className="form-filed_course">
                    <SelectGalleryPopup></SelectGalleryPopup>
                  </div>
                  <div className="form-filed_course">
                    <label>YouTube Link</label>
                    <input
                      className="input1"
                      type="text"
                      name="youTubeLink"
                      placeholder="You Tube Link"
                      value={youTubeLink}
                      onChange={(e) => setYouTubeLink(e.target.value)}
                    />
                    <span className="form-error">{error.youTubeLink}</span>
                  </div>
                  {/* <div className="form-filed_course">
                    <label>You Tube </label>
                    <input
                      className="input1"
                      type="text"
                      // name="youTubeLink"
                      placeholder="You Tube..."
                      // value={addCourseUnit.youTubeLink}
                      // value="## You tube Link ##"
                      // onChange={handleChange}
                      // value={youTubeLink}
                      // onChange={(e) => setYouTubeLink(e.target.value)}
                    />
                    <span className="form-error">{error.youTubeUrl}</span>
                  </div> 
                  <div className="form-filed_course">
                    <CopyToClipboard text={youTubeLink}>
                      <button>Copy Url</button>
                    </CopyToClipboard>
                  </div>*/}
                  <div className="form-filed_course">
                    <CopyToClipboard text={"##YoutubeUrl##"}>
                      <Button className="btn-info">Copy Url</Button>
                    </CopyToClipboard>
                  </div>
                  <div className="form-filed_course">
                    <label>Order Number</label>
                    <input
                      className="input1"
                      name="OrderNo"
                      type="text"
                      value={orderNo}
                      onChange={(e) => setOrderNo(e.target.value)}
                    />
                    <span className="form-error">{error.orderNo}</span>
                  </div>
                </div>
                <div className="save-changes-btn">
                  <Button variant="danger" onClick={handleEdit}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </React.Fragment>
            <ToastContainer />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default EditCourseUnit;
