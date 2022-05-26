import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import * as authServices from "../../services/authServices";
import swal from "sweetalert";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [error, setError] = useState([]);

  const handleChange = async () => {
    const formValidation = () => {
      let formErrors = {};
      let isValid = true;
      if (!oldPassword) {
        isValid = false;
        formErrors["oldPassword"] = "Old Password is Required";
      }
      if (!newpassword) {
        isValid = false;
        formErrors["newpassword"] = "New Password is Required";
      }

      setError(formErrors);
      return isValid;
    };

    if (formValidation()) {
      try {
        const obj = {
          oldPassword: oldPassword,
          newpassword: newpassword,
        };
        const response = await authServices.changePassword(obj);

        if (response.data.statusCode == 200) {
          createNotification("success", response.data.message);
        } else if (response.data.statusCode == 400) {
          createNotification("error", response.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Layout>
        <div className="profile-login-layout">
          <div className="heading-tilte">
            <h3>Change Password</h3>
          </div>
          <div className="profilelogin">
            <div className="popup-form-box">
              <div className="form-filed_course">
                <label>Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={oldPassword}
                  placeholder="OldPassword"
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                />
                <span className="form-error">{error.oldPassword}</span>
              </div>

              <div className="form-filed_course">
                <label>New Password</label>

                <input
                  type="password"
                  name="newPassword"
                  value={newpassword}
                  placeholder="NewPassword"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
                <span className="form-error">{error.newpassword}</span>
              </div>
            </div>

            <button className="button" onClick={handleChange}>
              Save Changes
            </button>
          </div>
        </div>
        <ToastContainer />
      </Layout>
    </>
  );
};

export default ChangePassword;
