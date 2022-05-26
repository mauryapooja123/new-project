import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import * as courseModuleService from "../../services/courseModuleService";
import * as courseModule from "../../services/courseModule";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";
import _ from "lodash";
import stateJson from "../../config/state.json";

const EditModule = (props) => {
  const [state, setState] = useState();
  const [title, setTitle] = useState("");
  const [courseoptions, setCourseoptions] = useState([]);
  const [courseId, setCourseId] = useState();
  const [orderNo, setOrderNo] = useState();
  const [error, setError] = useState({});
  const [id, setId] = useState("");
  const [courseState, setCourseState] = useState([]);
  const [stateTitle, setStateTitle] = useState("");

  useEffect(() => {
    setCourseState(stateJson.states);
  }, []);

  const handleClose = (id) => {
    props.toggleModal(false);
  };

  useEffect(() => {
    if (props.selectedItem) {
      setState(props.selectedItem.state ? props.selectedItem.state : "");
      setTitle(props.selectedItem.title ? props.selectedItem.title : "");
      setCourseId(
        props.selectedItem.courseId._id ? props.selectedItem.courseId._id : ""
      );
      setOrderNo(props.selectedItem.orderNo ? props.selectedItem.orderNo : "");
      setId(props.selectedItem._id);
      getCourse();
    }
  }, [props.selectedItem]);
  const formValidation = () => {
    const obj = {
      state,
      title,
      courseId,
      orderNo,
    };

    let formErrors = {};
    let isValid = true;
    if (!obj.state) {
      isValid = false;
      formErrors["state"] = "State is required";
    }
    if (!obj.title) {
      isValid = false;
      formErrors["title"] = "Title is required";
    }
    if (!obj.courseId) {
      isValid = false;
      formErrors["courseId"] = "CourseId is required";
    }
    if (!obj.orderNo) {
      isValid = false;
      formErrors["orderNo"] = "OrderNo is required";
    }

    setError(formErrors);
    return isValid;
  };

  const handleEdit = async () => {
    if (formValidation()) {
      const obj = {
        state,
        title,
        courseId,
        orderNo,
      };
      const response = await courseModuleService.editCourseModule(id, obj);
      if (response.data.status != 200) {
      }
      createNotification("success", response.data.message);
      props.toggleModal(false);
      return response;
    }
  };

  const getCourseTitle = async (state) => {
    const response = await courseModule.getTitleByState(state);
    setStateTitle(response.data.data);
  };
  const getCourse = async () => {
    const response = await courseModuleService.getCourse();
    setCourseoptions(response.data.data);
  };
  return (
    <div className="popup-edit">
      <Modal
        className="modulePopup-edit"
        show={props.showModal}
        onHide={handleClose}
      >
        <div className="login1">
          <Modal.Header>
            <Modal.Title>Edit Module</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="popup-form-box">
              {/* */}
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
              <label>Course Title</label>
              <select
                className="input1"
                name="courseId"
                type="text"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              >
                <option value="">Select Course Title</option>
                {props.stateTitle &&
                  props.stateTitle.length > 0 &&
                  props.stateTitle.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  ))}
              </select>
              <span className="form-error">{error.courseId}</span>
              <label>Title</label>
              <input
                className="input1"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className="form-error">{error.title}</span>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default EditModule;
