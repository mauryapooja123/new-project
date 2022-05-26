import axios from "axios";
import React, { useState, useEffect } from "react";
import { apiBaseUrl } from "../../contants/constants";
import Layout from "../../layout/Layout";
import swal from "sweetalert";
import * as userServices from "../../services/usersServices";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";

import "./profile.scss";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const { firstName, lastName, email } = user;
  var id = localStorage.getItem("user_id");
  var token = localStorage.getItem("admin_token");
  const getDetails = async () => {
    const response = await userServices.getUserById();
    const data = response.data;
    setUser({
      ...user,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });
  };
  useEffect(() => {
    getDetails();
  }, []);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const updateHandler = async (e) => {
    e.preventDefault();
    const data1 = {
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const response = userServices.EditUSers(id, data1);
  };
  return (
    <>
      <Layout>
        <div className="profile-login-layout">
          <h2>Edit Profile</h2>
          <div className="profilelogin">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={changeHandler}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={changeHandler}
            />

            <input
              type="text"
              name="email"
              disabled
              placeholder="email"
              value={email}
              onChange={changeHandler}
            />
            <button className="button" onClick={updateHandler}>
              Save Changes
            </button>
          </div>
        </div>
        <ToastContainer />
      </Layout>
    </>
  );
};

export default Profile;
