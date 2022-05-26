import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./ForgotPassword.css";
import * as authService from "../../services/authServices";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import { createNotification } from "../../helper/notification";
import * as authServices from "../../services/authServices";

const ForgotPassword = (props) => {
  const nevigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState([]);

  const handleShow = () => setShow(true);
  const handleCloseOnCloseButton = () => {
    setShow(false);
  };
  const validate = () => {
    let valid = true;
    let errors = {};
    if (!email) {
      valid = false;
      errors["email"] = "email is required";
    }
    setError(errors);
    return valid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const response = await authServices.ForgotAPI({email})
      console.log(response);
      if (response.data.code == 404) {
        createNotification("error", response.data.message);
      } else {
        createNotification("success", response.data.message);
      }
    }
  };
  return (
    <div>
      <Button className="forgetpassbtn" variant="info" onClick={handleShow}>
        Forgot Password
      </Button>

      <Modal show={show} onHide={handleCloseOnCloseButton}>
        <Modal.Header>
          <Modal.Title>Enter your Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <input
            className="input1"
            type="email"
            name="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p style={{ color: "red" }}> {error && error.email}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOnCloseButton}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Send Email
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
