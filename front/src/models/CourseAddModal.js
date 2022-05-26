import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import IndianStates from "../config/indianStates.json";
import States from "../config/state.json"
import * as copyCourseServices from "../services/copyCourseServices";
const CourseAddModal = ({
  handleClose,
  show,
  getCoursePaginationData,
  edit,
  courseData,
  setCourseData,
  setActivePage,
}) => {
  const [courseState, setCourseState] = useState([]);
  const [err, setErr] = useState({});
  const [addNewCourse, setAddNewCourse] = useState({
    state: "",
    title: "",
  });
      
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddNewCourse({
      ...addNewCourse,
      [name]: value,
    });
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };
  const validation = () => {
    let error = {};
    let valid = true;
    const { state, title } = addNewCourse;
    if (!state || state.trim() === "") {
      valid = false;
      error["state"] = "cannot be empty";
    }

    if (!title) {
      valid = false;
      error["title"] = "cannot be empty";
    }
    setErr(error);
    return valid;
  };
  const handleSubmit = () => {
    if (validation()) {
      copyCourseServices.addNewCourse(addNewCourse);
      handleClose();
      getCoursePaginationData();
      setActivePage(1)
      setAddNewCourse({
        state: "",
        title: "",
    })
    }
  };
  const handleUpdate = () => {
    const id = courseData._id;
    copyCourseServices.editRecord(id, courseData);
    getCoursePaginationData();
    handleClose();
  };
  const closeFunc =()  =>{
      handleClose(
          setAddNewCourse({
              title:"",
              state:""
          })
      )
  }
  useEffect(() => {
    setCourseState(States.states);
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {edit && edit ? <>Edit details..</> : <>Add course title</>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Course State</Form.Label>
              <Form.Control
                as="select"
                onChange={handleChange}
                name="state"
                value={edit && edit ? courseData.state : addNewCourse.state}
              >
                <option>select course state</option>
                {courseState &&
                  courseState.length > 0 &&
                  courseState.map((state) => (
                    <option key={state.abbreviation}>{state.name}</option>
                  ))}
              </Form.Control>
              {err && <p style={{ color: "red" }}>{err.state}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="email"
                placeholder="title"
                onChange={handleChange}
                name="title"
                value={edit && edit ? courseData.title : addNewCourse.title}
              />
              {err && <p style={{ color: "red" }}>{err.title}</p>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeFunc}>Close</Button>
          <Button onClick={edit && edit ? handleUpdate : handleSubmit}>
            {edit && edit ? <>Update</> : <>Add</>}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CourseAddModal;
