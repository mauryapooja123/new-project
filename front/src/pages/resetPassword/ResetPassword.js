import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as authService from "../../services/authServices";
import { Link, useParams, useHistory } from "react-router-dom";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";
import * as authServices from "../../services/authServices"
const Login = (props) => {
  const { token } = useParams();
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const [reset, setReset] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState([]);
  const { password, confirmPassword } = reset;
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setReset({
      ...reset,
      [name]: value,
    });
  };
  const validate = () => {
    let errors = {};
    let valid = true;
    if (!password) {
      valid = false;
      errors["password"] = "must not be empty";
    } else if (password.length < 6) {
      valid = false;
      errors["password"] = "password must be 6 characters long";
    } else if (password.length > 11) {
      valid = false;
      errors["password"] = "password must be in between 6-11 characters..";
    } else if (!confirmPassword) {
      valid = false;
      errors["confirmPassword"] = "must not be empty";
    } else if (confirmPassword !== password) {
      valid = false;
      errors["confirmPassword"] = "password does not match";
    }
    setError(errors);
    return valid;
  };
  const handleReset = async (e) => {
    e.preventDefault();
    const data = {
      resetLink: token,
      password: password,
    };
    if (validate()) {
      const response = await authServices.ResetAPI(data)
      navigate("/");
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo"></div>
                <h4 className="centre form-group">Reset Password</h4>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    id="password"
                    placeholder="New password"
                    name="password"
                    value={password}
                    onChange={changeHandler}
                  />
                  <p style={{ color: "red" }}>{error && error.password}</p>
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    id="confirmPassword"
                    placeholder="confirm password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={changeHandler}
                  />
                  <p style={{ color: "red" }}>
                    {error && error.confirmPassword}
                  </p>
                </div>

                <div className="mt-3">
                  <button
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={handleReset}
                  >
                    Reset Password
                  </button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check"></div>
                  <Link to="/" className="auth-link text-black">
                    Sign in to continue
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* content-wrapper ends */}
      </div>
      {/* page-body-wrapper ends */}
      <ToastContainer />
    </div>
  );
};

export default Login;
