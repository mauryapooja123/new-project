import React from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Layout from "../../layout/Layout";
const AddModulePage = ({
  onChangeFunction,
  onSubmitFunction,
  allData,
  handleClose,
  errorData,
  addFunction,
  show,
  user,
}) => {
  const { state, title, orderNo } = allData;

  return (
    <>
      <Button variant="primary" onClick={addFunction}>
        Add Course
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Course State</Form.Label>
              <Form.Select
                placeholder="Enter State"
                autoFocus
                name="state"
                value={state}
                onChange={onChangeFunction}
              >
                <option value="">Select Course State</option>

                {user &&
                  user.map((item) => (
                    <option key={item.name} value={item.state}>
                      {item.name}
                    </option>
                  ))}
              </Form.Select>
              <span style={{ color: "red" }}>
                {errorData && errorData.state}
              </span>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label> Course Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter Course Title"
                name="title"
                value={title}
                onChange={onChangeFunction}
              />
              <span style={{ color: "red" }}>
                {errorData && errorData.title}
              </span>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label> Course OrderNo</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter OrderNo"
                name="orderNo"
                value={orderNo}
                onChange={onChangeFunction}
              />
              <span style={{ color: "red" }}>
                {errorData && errorData.orderNo}
              </span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onSubmitFunction}>
            Add Data
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddModulePage;
