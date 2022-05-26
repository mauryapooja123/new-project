import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import "./Login.scss";
import { ToastContainer, toast } from "react-toastify";
import { createNotification } from "../../helper/notification";
import * as authServices from "../../services/authServices";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState({});
  const [login, setLogin] = useState(false);
  const { email, password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validation = () => {
    const { email, password } = user;
    let isValid = true;
    const formError = {};
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!email) {
      isValid = false;
      formError["email"] = "Email is required";
    } else if (!regex.test(email)) {
      isValid = false;
      formError["email"] = "Not a valid Email";
    }
    if (!password) {
      isValid = false;
      formError["password"] = "Password is required";
    }
    setErr(formError);
    return isValid;
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (validation()) {
      const response = await authServices.loginUser(user);
      if (response.status == 200) {
        createNotification("success", response.data.message);
        localStorage.setItem("admin_token", response.data.data.token);
        localStorage.setItem("user_id", response.data.data.user._id);
        setTimeout(() => {
          setLogin(true);
        }, 1000);
      } else {
        createNotification("error", response.data.message);
      }
    }
  };

  useEffect(() => {
    if (login) {
      navigate("/dashboard");
    }
  }, [login]);

  return (
    <div className="login-wrapper">
      <div className="loginn">
        <form onSubmit={submitHandler}>
          <div className="loginbox">
            <img src="images\drive-logo-login.png" alt="" />
            handleChange
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
            <p style={{ color: "red" }}>{err && err.email}</p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
            <p style={{ color: "red" }}>{err && err.password}</p>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
            <div className="forgetpassword">
              <ForgotPassword />
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
