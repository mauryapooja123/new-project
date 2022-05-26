import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./EditPopup.css";
import * as courseServices from "../services/courseServices";
import _ from "lodash";
import { createNotification } from "../helper/notification";
import stateJson from "../config/state.json";

const EditPopup = (props) => {
  const [state, setState] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState({});
  const [id, setId] = useState("");
  const [courseState, setCourseState] = useState([]);
  // console.log(courseState, "courseState:::::::");
  useEffect(() => {
    setCourseState(stateJson.states);
  }, []);
  // console.log(state, "stateeeeeeeeeeeeee");
  const handleClose = (id) => {
    props.toggleModal(false);
  };

  useEffect(() => {
    if (props.selectedItem) {
      // console.log(props.selectedItem.state, "props selected item");
      setState(props.selectedItem.state ? props.selectedItem.state : "");
      setTitle(props.selectedItem.title ? props.selectedItem.title : "");

      setId(props.selectedItem._id);
    }
  }, [props.selectedItem]);
  const formValidation = () => {
    const obj = {
      state: state,
      title: title,
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

    setError(formErrors);
    return isValid;
  };

  const handleEdit = async () => {
    try {
      if (formValidation()) {
        const obj = {
          state: state,
          title: title,
        };
        const response = await courseServices.editCourse(id, obj);
        if (response.status == 200) {
          createNotification("success", response.data.message);
        } else {
          createNotification("error", response.data.message);
        }

        props.toggleModal(false);
        return response;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <Modal show={props.showModal} onHide={handleClose}>
        <div>
          <Modal.Header>
            <Modal.Title>Edit Course Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Course State</label>
            <div className="form-filed_course">
              <div className="popup-form-box">
                <select
                  className="input1"
                  name="state"
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">Select Course State</option>
                  {courseState &&
                    courseState.length > 0 &&
                    courseState.map((item) => (
                      <option key={item.name} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
                <span className="form-error">{error.state}</span>
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
    </div>
  );
};

export default EditPopup;
