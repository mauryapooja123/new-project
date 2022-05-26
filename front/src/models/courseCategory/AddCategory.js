import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import * as courseCategoryService from "../../services/categoryService";
import _ from "lodash";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";

export const AddCourseCategory = (props) => {
  const [categoryOption, setCategoryOption] = useState([]);
  const [show, setShow] = useState(false);
  const [addCategory, setAddCategory] = useState({
    name: "",
  });
  const [error, setError] = useState([]);

  useEffect(() => {
    getCourseCategory();
  }, []);

  const formValidation = () => {
    const { name } = addCategory;
    let formErrors = {};
    let isValid = true;
    if (!name) {
      isValid = false;
      formErrors["name"] = "Please Enter Category";
    }
    setError(formErrors);
    return isValid;
  };

  const clickHandleCategory = async (e) => {
    if (formValidation()) {
      try {
        const courseCategory = {
          name: addCategory.name,
        };
        const response = await courseCategoryService.addCourseCategory(
          courseCategory
        );
        if (response.status === 400) {
          createNotification("error", response.message);
          props.modalStatus();
        } else {
          createNotification("success", response.message);
          setShow(false);
          props.modalStatus();
          setAddCategory("");
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleShow = () => setShow(true);
  const handleCloseOnCloseButton = () => {
    setShow(false);
    setAddCategory("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddCategory({
      ...addCategory,
      [name]: value,
    });
  };

  const getCourseCategory = async () => {
    const response = await courseCategoryService.getCourseCategory();
    setCategoryOption(response.data.data);
  };
  return (
    <div>
      <Button variant="info" onClick={handleShow}>
        Add Blog Category
      </Button>

      <Modal show={show} onHide={handleCloseOnCloseButton}>
        <Modal.Header>
          <Modal.Title>Add Blog Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="popup-form-box">
            <label>Blog Category</label>

            <input
              className="input1"
              type="text"
              name="name"
              placeholder="Category"
              value={addCategory.name}
              onChange={handleChange}
            />
            <span className="form-error">{error.name}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOnCloseButton}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={clickHandleCategory}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} />
    </div>
  );
};
