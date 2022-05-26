import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import * as courseCategoryService from "../../services/categoryService";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";
import _ from "lodash";

const EditCategory = (props) => {
  const [name, setName] = useState("");
  const [courseoptions, setCourseoptions] = useState([]);
  const [error, setError] = useState({});
  const [id, setId] = useState("");

  const handleClose = (id) => {
    props.toggleModal(false);
  };

  useEffect(() => {
    if (props.selectedItem) {
      setName(props.selectedItem.name ? props.selectedItem.name : "");
      setId(props.selectedItem._id);
      getCategory();
    }
  }, [props.selectedItem]);
  const formValidation = () => {
    const obj = {
      name,
    };

    let formErrors = {};
    let isValid = true;
    if (!obj.name) {
      isValid = false;
      formErrors["name"] = "Please Enter Category";
    }

    setError(formErrors);
    return isValid;
  };

  const handleEdit = async () => {
    if (formValidation()) {
      const obj = {
        name,
      };
      const response = await courseCategoryService.editCourseCategory(id, obj);
      if (response.data.status != 200) {
      }
      createNotification("success", response.data.message);
      props.toggleModal(false);
      return response;
    }
  };

  const getCategory = async () => {
    const response = await courseCategoryService.getCourseCategory();
    setCourseoptions(response.data.data);
  };
  return (
    <div>
      <Modal show={props.showModal} onHide={handleClose}>
        <div className="login1">
          <Modal.Header>
            <Modal.Title>Edit Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="popup-form-box">
              <label>Name</label>
              <input
                className="input1"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <span className="form-error">{error.name}</span>
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

export default EditCategory;
