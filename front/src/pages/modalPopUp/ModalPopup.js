import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
// import "../student/Student.css";
import "./ModalPopup.scss";
import swal from "sweetalert";
import * as userServices from "../../services/usersServices";

function ModalPopup(props) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState();
  const [error, setError] = useState([]);

  const formValidation = () => {
    const userEdit = {
      firstName: firstName,
      lastName: lastName,
    };
    let formErrors = {};
    let isValid = true;
    if (!userEdit.firstName) {
      isValid = false;
      formErrors["firstName"] = "firstName is required";
    }

    if (!userEdit.lastName) {
      isValid = false;
      formErrors["lastName"] = "lastName is required";
    }
    setError(formErrors);
    return isValid;
  };
  const handleClose = (id) => {
    props.toggleModal(false);
  };
  useEffect(() => {
    if (props.selectedItem) {
      setFirstName(
        props.selectedItem.firstName ? props.selectedItem.firstName : ""
      );
      setEmail(props.selectedItem.email ? props.selectedItem.email : "");
      setLastName(
        props.selectedItem.lastName ? props.selectedItem.lastName : ""
      );
      setUserId(props.selectedItem._id ? props.selectedItem._id : "");
    }
  }, [props.selectedItem]);

  useEffect(() => {}, [props.selectedItem]);

  const handleEdit = async (e) => {
    const isValid = await formValidation();
    if (isValid) {
      const obj = {
        firstName: firstName,
        lastName: lastName,
        email: email,
      };

      const response = await userServices.EditUSers(userId, obj);
      if (response.status !== 200) {
        return await swal({
          title: "failed",
          text: response.message,

          type: "danger",
          timer: 3000,
        });
      } else {
        await swal({
          title: "Udateed",
          text: response.message,
          type: "success",
          timer: 1500,
        });
      }
      props.modal(false);
    }
  };

  return (
    <>
      <Modal
        show={props.showModal}
        className="warmup-modal"
        onHide={handleClose}
      >
        <div className="login1">
          <Modal.Header>
            <Modal.Title>Edit Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="popup-form-box">
              {" "}
              <input
                className="input1"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <span className="form-error">{error.firstName}</span>
              <br />
              <br />
              <input
                className="input1"
                type="email"
                disabled
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <br />
              <input
                className="input1"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <span className="form-error">{error.lastName}</span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" type="submit" onClick={handleEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default ModalPopup;
