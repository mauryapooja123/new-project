import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import * as courseModuleService from "../../services/courseModule";
import _ from "lodash";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";
import stateJson from "../../config/state.json";

export const AddCourseModule = (props) => {
  const [courseoptions, setCourseoptions] = useState([]);
  const [show, setShow] = useState(false);
  const [addModule, setAddModule] = useState({
    state: "",
    title: "",
    orderNo: "",
    courseId: "",
  });
  const [error, setError] = useState([]);
  const [courseState, setCourseState] = useState([]);
  const [stateTitle, setStateTitle] = useState([]);

  useEffect(() => {
    setCourseState(stateJson.states);
  }, []);

  useEffect(() => {
    getCourse();
  }, []);

  const formValidation = () => {
    const { state, title, courseId, orderNo } = addModule;
    let formErrors = {};
    let isValid = true;
    if (!state) {
      isValid = false;
      formErrors["state"] = "Please select state";
    }
    if (!title) {
      isValid = false;
      formErrors["title"] = "Please select title";
    }
    if (!courseId) {
      isValid = false;
      formErrors["courseId"] = "Please select courseId";
    }
    if (!orderNo) {
      isValid = false;
      formErrors["orderNo"] = "Please select orderNo";
    }
    setError(formErrors);
    return isValid;
  };

  const clickHandleModule = async (e) => {
    if (formValidation()) {
      try {
        const courseModule = {
          courseTitle: addModule.courseTitle,
          state: addModule.state,
          title: addModule.title,
          orderNo: addModule.orderNo,
          courseId: addModule.courseId,
        };
        // console.log(courseModule, "courseModule");
        const response = await courseModuleService.addCourseModule(
          courseModule
        );
        if (response.status === 400) {
          createNotification("error", response.message);
          props.modalStatus();
        } else {
          createNotification("success", response.message);
          setShow(false);
          props.modalStatus();
          setAddModule("");
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleShow = () => setShow(true);
  const handleCloseOnCloseButton = () => {
    setShow(false);
    setAddModule("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(value, "vallllllllllllll");
    setAddModule({
      ...addModule,
      [name]: value,
    });
    if (name === "state") {
      getCourseTitle(value);
    }
  };

  const getCourse = async () => {
    const response = await courseModuleService.getAll();
    setCourseoptions(response.data.data);
  };
  const getCourseTitle = async (state) => {
    const response = await courseModuleService.getTitleByState(state);
    // console.log(response, "response of title by state api");
    setStateTitle(response.data.data);
  };
  // console.log(stateTitle, "state title");
  return (
    <div>
      <Button variant="info" onClick={handleShow}>
        Add Course Module
      </Button>

      {/* <Modal show={show} onHide={handleCloseOnCloseButton}>
        <Modal.Header>
          <Modal.Title>Add Course Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="popup-form-box">
            <div className="form-filed_course">
              <label>Course State</label>
              <select
                className="input1"
                name="state"
                value={addModule.state}
                onChange={handleChange}
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
            </div>
            <div className="form-filed_course">
              <label>Course Title</label>
              <select
                className="input1"
                name="courseId"
                value={addModule.courseId}
                onChange={handleChange}
              >
                <option value="">Select Course Title</option>
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
              <label>Module Title</label>
              <input
                className="input1"
                type="text"
                name="title"
                placeholder="Module Title"
                value={addModule.title}
                onChange={handleChange}
              />
              <span className="form-error">{error.title}</span>
            </div>
            <div className="form-filed_course">
              <label>Order Number</label>
              <input
                className="input1"
                type="number"
                name="orderNo"
                placeholder="orderNo"
                value={addModule.orderNo}
                onChange={handleChange}
              />
            </div>
            <span className="form-error">{error.orderNo}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOnCloseButton}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={clickHandleModule}>
            Add
          </Button>
        </Modal.Footer>
      </Modal> */}
      {/* <ToastContainer autoClose={3000} /> */}
    </div>
  );
};
