import React from "react";
import { useState } from "react";
import { Button, Form, Modal, Select } from "react-bootstrap";

function CoursePage({
  show,
  handleClose,
  // handleShow,
  handleChange,
  user,
  error,
  handleSubmit,
  courseState,
  handleAdd,
  edit,
  handleUpdate,
}) {
  //console.log(StatesJson, "gggg");
  const { title, state } = user;
  console.log(courseState, "kkkkkkkkkkkkkkkkkkkkkk");
  //console.log(abbreviation, name, "ppppppppppppppppppppppppppppppppp");
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{edit ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? handleUpdate : handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Course State</Form.Label>
              <Form.Select
                as="select"
                placeholder="name@example.com"
                name="state"
                value={state}
                onChange={handleChange}
                autoFocus
              >
                <option>select course state</option>
                {courseState.length > 0 &&
                  courseState.map((item) => (
                    <option key={item.abbreviation}>{item.name}</option>
                  ))}
              </Form.Select>

              <p style={{ color: "red" }}> {error && error.state}</p>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
              />
              <p style={{ color: "red" }}> {error && error.title}</p>
            </Form.Group>
            <Button type="submit">Add data</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CoursePage;
