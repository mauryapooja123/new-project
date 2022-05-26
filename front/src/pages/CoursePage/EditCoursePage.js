import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
const EditCoursePage = ({ show, handleClose }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Course State</Form.Label>
              <Form.Select
                //as="select"
                placeholder="name@example.com"
                // name="state"
                autoFocus
              ></Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Course Title</Form.Label>
              <Form.Control as="textarea" type="text" name="title" />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit">Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default EditCoursePage;
