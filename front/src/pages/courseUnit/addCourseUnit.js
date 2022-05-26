import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import * as courseUnitService from "../../services/courseUnitService";
import * as courseModuleService from "../../services/courseModule";
import * as courseServices from "../../services/courseServices";
import * as galaryService from "../../services/galaryService";
import _ from "lodash";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";
import { CKEditor } from "ckeditor4-react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import stateJson from "../../config/state.json";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { apiBaseUrl } from "../../contants/constants";
import { SelectGalleryPopup } from "./SelectGalleryPopup";

const AddCourseUnit = (props) => {
  const navigate = useNavigate();
  // const [galaryList, setGalaryList] = useState("");
  // const [activePage, setActivePage] = useState(1);
  // const [pageNumber, setPageNumber] = useState(1);
  // const [totalData, setTotalData] = useState();
  // const [pageLimit, setPageLimit] = useState(5);
  const [courseoptions, setCourseoptions] = useState([]);
  const [courseModuleOptions, setCourseModuleOptions] = useState([]);
  const [addCourseUnit, setAddCourseUnit] = useState({
    state: "",
    courseId: "",
    module: "",
    title: "",
    youTubeLink: "",
    orderNo: "",
  });
  const [stateTitle, setStateTitle] = useState();
  const [error, setError] = useState([]);
  const [courseState, setCourseState] = useState([]);
  const [content, setContent] = useState("");
  // useEffect(() => {
  //   getImageList(pageNumber);
  // }, []);
  useEffect(() => {
    getCourse();
  }, []);

  useEffect(() => {
    setCourseState(stateJson.states);
  }, []);

  const formValidation = () => {
    const { state, courseId, module, title, orderNo, youTubeLink } =
      addCourseUnit;
    let formErrors = {};
    let isValid = true;
    if (!state) {
      isValid = false;
      formErrors["state"] = "Please select state";
    }
    if (!courseId) {
      isValid = false;
      formErrors["courseId"] = "Please select courseId";
    }
    if (!module) {
      isValid = false;
      formErrors["module"] = "Please select module";
    }
    if (!title) {
      isValid = false;
      formErrors["title"] = "Please enter title";
    }
    if (!content) {
      isValid = false;
      formErrors["content"] = "Please enter content";
    }
    if (!youTubeLink) {
      isValid = false;
      formErrors["youTubeLink"] = "Please provide youTube link";
    }
    if (!orderNo) {
      isValid = false;
      formErrors["orderNo"] = "Please enter orderno";
    }
    setError(formErrors);
    return isValid;
  };

  const clickHandleCourseUnit = async (e) => {
    if (formValidation()) {
      try {
        const courseUnit = {
          state: addCourseUnit.state,
          courseId: addCourseUnit.courseId,
          module: addCourseUnit.module,
          title: addCourseUnit.title,
          content: content,
          youTubeLink: addCourseUnit.youTubeLink,
          orderNo: addCourseUnit.orderNo,
        };
        const response = await courseUnitService.addCourseUnit(courseUnit);
        if (response.status === 400) {
          createNotification("error", response.message);
        } else {
          createNotification("success", response.message);
          setTimeout(() => {
            navigate("/courseunit");
          }, 2000);
          setAddCourseUnit("");
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddCourseUnit({
      ...addCourseUnit,
      [name]: value,
    });
    if (name === "state") {
      getCourseTitle(value);
    }
    if (name === "courseId") {
      // console.log(courseId, "courseId");
      getCourseModule(value);
    }
  };

  const handleClickBack = () => {
    navigate("/courseunit");
  };

  const getCourse = async () => {
    const response = await courseServices.getAll();
    setCourseoptions(response.data.data);
  };
  const getCourseTitle = async (state) => {
    const response = await courseModuleService.getTitleByState(state);
    // console.log(response, "response of title by state api");
    setStateTitle(response.data.data);
  };

  const getCourseModule = async (courseId) => {
    const response = await courseModuleService.getModuleById(courseId);
    setCourseModuleOptions(response.data.data);
  };

  return (
    <div className="addCourseUnit">
      <Layout>
        <div className="warmup-content-wrappper">
          <div className="plan-wrapper">
            <React.Fragment>
              <div className="heading-tilte">
                <h3>Add Course Unit</h3>
              </div>
              <div className="popup-form-box">
                <div className="form-filed_course">
                  <div className="form-filed_course">
                    <label>Course State</label>
                    <select
                      className="input1"
                      name="state"
                      placeholder="Select State"
                      // value={addCourseUnit.state}
                      onChange={handleChange}
                    >
                      <option value="">Select State</option>

                      {courseState &&
                        courseState.length > 0 &&
                        courseState.map((item) => (
                          <option key={item.name} value={item.state}>
                            {item.name}
                          </option>
                        ))}
                    </select>

                    <span className="form-error">{error.state}</span>
                  </div>
                  <label>Course Title</label>
                  <select
                    className="input1"
                    type="text"
                    name="courseId"
                    // value={addCourseUnit.courseId}
                    placeholder="CourseId"
                    onChange={handleChange}
                  >
                    <option>Select Course Title</option>
                    {stateTitle &&
                      stateTitle.length > 0 &&
                      stateTitle.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.title}
                        </option>
                      ))}
                  </select>
                  <span className="form-error">{error.courseId}</span>
                </div>
                <div className="form-filed_course">
                  <label>Module</label>
                  <select
                    className="input1"
                    type="text"
                    name="module"
                    placeholder="module"
                    onChange={handleChange}
                  >
                    <option>Select Module</option>
                    {courseModuleOptions &&
                      courseModuleOptions.length > 0 &&
                      courseModuleOptions.map((item) => (
                        <option key={item.title} value={item.id}>
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
                    type="text"
                    name="title"
                    placeholder="Title"
                    // value={addCourseUnit.title}
                    onChange={handleChange}
                  />
                  <span className="form-error">{error.title}</span>
                </div>
                {/*  <div className="form-filed_course">
                  <label>Galary</label>
                  <input
                    className="input1"
                    type="file"
                    name="galary"
                    placeholder="Galary..."
                    // value={addCourseUnit.title}
                    // onChange={handleChange}
                  />
                  <span className="form-error">{error.title}</span>
                </div>*/}
                <div className="form-filed_course">
                  <label>Content</label>
                  <CKEditor
                    className="ckeditor-textarea"
                    initData={<p></p>}
                    onChange={({ editor }) => {
                      let htmlString = editor.getData();

                      setContent(htmlString);
                    }}
                    config={{
                      uiColor: "#AADC6E",
                    }}
                  />

                  <span className="form-error">{error.content}</span>
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
                    placeholder="YouTube Link"
                    value={addCourseUnit.youTubeLink}
                    onChange={handleChange}
                  />
                  <span className="form-error">{error.youTubeLink}</span>
                </div>
                {/* <div className="form-filed_course">
                  <label>You Tube</label>
                  <input
                    className="input1"
                    type="text"
                    // name="youTubeLink"
                    placeholder="You Tube ..."
                    // value={addCourseUnit.youTubeLink}
                    // value="## You tube Link ##"
                    // onChange={handleChange}
                  />
                  <span className="form-error">{error.youTubeUrl}</span> 
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
                    type="number"
                    name="orderNo"
                    placeholder="Order No"
                    value={addCourseUnit.orderNo}
                    onChange={handleChange}
                  />
                  <span className="form-error">{error.orderNo}</span>
                </div>
              </div>
              <div className="save-changes-btn">
                <Button
                  type="submit"
                  variant="danger"
                  onClick={clickHandleCourseUnit}
                >
                  Add
                </Button>
              </div>
              <ToastContainer autoClose={3000} />
            </React.Fragment>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AddCourseUnit;
