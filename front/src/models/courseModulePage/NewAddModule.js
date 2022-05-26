import React, { useEffect, useState } from "react";
import { Modal, Button, Form, ToastContainer } from "react-bootstrap";
import { addNewCourse } from "../../services/copyCourseServices";
import state from "../../config/state.json";
import { toast } from "react-toastify";

const NewAddModule = ({
  user,
  handleChange,
  handleClose,
  handleSubmit,
  handleShow,
  show,
  json,
  edit,
  handleUpdate,
  handleAdd,
  error,
}) => {
  const { state, title, courseId, orderNo } = user;
  return (
    <>
      <Button variant="primary" onClick={handleAdd}>
        Add New Course
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Course Model</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>course State</Form.Label>

              <select
                className="input1"
                name="state"
                value={state}
                onChange={handleChange}
              >
                <option value="">Select Course State</option>

                {json &&
                  json.length > 0 &&
                  json.map((item) => (
                    <option key={item.name} value={item.state}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <p style={{ color: "red" }}>{error && error.state}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>course Title</Form.Label>
              {/* <Form.Control
                type="text"
                placeholder="Enter CourseId"
                name="courseId"
                value={courseId}
                onChange={handleChange}
                autoFocus
              />
              <p style={{ color: "red" }}>{error && error.courseId}</p> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Module Title </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                name="title"
                value={title}
                onChange={handleChange}
                autoFocus
              />
              <p style={{ color: "red" }}>{error && error.title}</p>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Order Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter orderNo"
                name="orderNo"
                value={orderNo}
                onChange={handleChange}
                autoFocus
              />
              <p style={{ color: "red" }}>{error && error.orderNo}</p>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            type="submit"
            onClick={edit ? handleUpdate : handleSubmit}
          >
            {edit ? "Update" : "Add Course"}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};
export default NewAddModule;
