import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import { ToastContainer } from "react-toastify";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";

import _ from "lodash";

const EditQuestionCourse = (props) => {
  const [error, setError] = useState({});

  const formValidation = () => {
    // const options = [...input];

    let formErrors = {};
    let isValid = true;
    if (!props.courseId) {
      isValid = false;
      formErrors["courseId"] = "Please Enter Course ";
    }
    if (!props.module) {
      isValid = false;
      formErrors["module"] = "Please Enter Module";
    }
    if (!props.courseUnitId && props.check) {
      isValid = false;
      formErrors["courseUnitId"] = "Courseunit is required";
    }
    setError(formErrors);

    return isValid;
  };

  const handleEdit = () => {
    if (formValidation()) {
      props.nextStep();
    } else {
    }
  };

  return (
    <div>
      <Layout>
        <div className="warmup-content-wrappper">
          <div className="plan-wrapper">
            <div>
              <div className="heading-tilte">
                <h3>Edit Question</h3>
              </div>
              <div className="popup-form-box">
                <div className="form-filed_course">
                  <label value="">Select Course</label>
                  <select
                    className="input1"
                    name="courseId"
                    type="text"
                    value={props.courseId}
                    onChange={(e) => {
                      props.editHnadlecourse(e);
                    }}
                  >
                    <option value="">Select Course</option>
                    {props.courseoptions &&
                      props.courseoptions.length > 0 &&
                      props.courseoptions.map((item) => {
                        return props.courseId == item.title ? (
                          <option value={item.id} selected="selected">
                            {item.title}
                          </option>
                        ) : (
                          <option value={item.id}>{item.title}</option>
                        );
                      })}
                  </select>
                  <span className="form-error">{error.courseId}</span>
                </div>
                <div className="form-filed_course">
                  <label>Select module</label>

                  <select
                    className="input1"
                    name="module"
                    type="text"
                    value={props.module}
                    onChange={(e) => {
                      props.edithandlemodule(e);
                    }}
                  >
                    <option value="">Select Module</option>
                    {props.courseModuleOptions &&
                      props.courseModuleOptions.length > 0 &&
                      props.courseModuleOptions.map((item) => (
                        <option value={item.id}>{item.title}</option>
                      ))}
                  </select>
                  <span className="form-error">{error.module}</span>
                </div>

                <div className="AddCoursecheckbox">
                  <div>
                    <input
                      type="checkbox"
                      value={props.check}
                      checked={props.check && props.check}
                      onChange={props.handleChangechanck}
                    ></input>
                    <span>Use this questions as unit Quiz</span>
                  </div>
                </div>

                {props.check ? (
                  <div className="form-filed_course">
                    <label>Select Course Unit</label>

                    <select
                      className="input1"
                      type="text"
                      name="courseUnit"
                      value={props.check ? props.courseUnitId : null}
                      placeholder="courseUnit"
                      onChange={(e) => {
                        props.edithandleCourseUnit(e);
                      }}
                    >
                      <option value="">Select Course Unit </option>

                      {props.courseUNitTitleOptions &&
                        props.courseUNitTitleOptions.length > 0 &&
                        props.courseUNitTitleOptions.map((item) => (
                          <>
                            {props.check ? (
                              <option value={item._id}>{item.title}</option>
                            ) : null}
                          </>
                        ))}
                    </select>
                    <span className="form-error">{error.courseUnitId}</span>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="save-changes-btn">
                <Button variant="danger" onClick={handleEdit}>
                  Next Step
                </Button>
              </div>
            </div>
            <ToastContainer />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default EditQuestionCourse;
