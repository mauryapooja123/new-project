import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./AddPopup.css";
import * as courseServices from "../services/courseServices";
import _ from "lodash";
import { createNotification } from "../helper/notification";
import { ToastContainer } from "react-toastify";
import stateJson from "../config/state.json";

export const AddPopup = (props) => {
  const MAX_BOARD_SIZE = 12;
  const [show, setShow] = useState(false);
  const [addCourses, setAddCourses] = useState({
    state: "",
    title: "",
  });
  const [error, setError] = useState([]);
  const [courseState, setCourseState] = useState([]);
  // console.log(courseState, "courseState:::::::");

  useEffect(() => {
    setCourseState(stateJson.states);
  }, []);

  const clickHandleCourse = async (e) => {
    const formValidation = () => {
      const { state, title } = addCourses;
      let formErrors = {};
      let isValid = true;
      if (!state || state.trim() === "") {
        isValid = false;
        formErrors["state"] = "State is required";
      } else if (state == "") {
        isValid = false;
        formErrors["state"] = "State is required";
      }
      if (!title) {
        isValid = false;
        formErrors["title"] = "Title is required";
      } else if (title == "") {
        isValid = false;
        formErrors["title"] = "TItle is required";
      }
      setError(formErrors);
      return isValid;
    };

    if (formValidation()) {
      try {
        const courseObj = {
          state: addCourses.state,
          title: addCourses.title,
        };
        const response = await courseServices.addCourse(courseObj);
        createNotification("success", response.data.message);
        props.modalStatus();
      } catch (err) {}
      setShow(false);
      setAddCourses({
        state: "",
        title: "",
      });
    }
  };

  const handleShow = () => setShow(true);
  const handleCloseOnCloseButton = () => {
    setShow(false);
    setAddCourses({
      state: "",
      title: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddCourses({
      ...addCourses,
      [name]: value,
    });
  };

  return (
    <div>
      <Button variant="info" onClick={handleShow}>
        Add Course Title
      </Button>

      <Modal show={show} onHide={handleCloseOnCloseButton}>
        <Modal.Header>
          <Modal.Title>Add Course Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="popup-form-box">
            <div className="form-filed_course">
              <label>Course State</label>
              {/* <select
                className="input1"
                name="state"
                value={addCourses.state}
                onChange={handleChange}
              >
                <option value="">Select Course State</option>
                <option value="Georgia">Georgia</option>
                ))
              </select>*/}

              <select
                className="input1"
                name="state"
                value={addCourses.state}
                onChange={handleChange}
              >
                <option value="">Select Course State</option>
                {courseState &&
                  courseState.length > 0 &&
                  courseState.map((item) => (
                    <option key={item.name}>{item.name}</option>
                  ))}
              </select>
              <span className="form-error">{error.state}</span>
            </div>
            <div className="form-filed_course">
              <label>Title</label>
              <input
                className="input1"
                type="text"
                name="title"
                placeholder="Title"
                value={addCourses.title}
                onChange={handleChange}
              />
              <span className="form-error">{error.title}</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOnCloseButton}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={clickHandleCourse}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} />
    </div>
  );
};
