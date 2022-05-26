import { Modal, Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";

import _ from "lodash";

import Layout from "../../layout/Layout";

const AddQuestionCourse = (props) => {
  const [error, setError] = useState({});
  const formValidation = () => {
    let formErrors = {};
    let isValid = true;
    if (!props.courseId) {
      isValid = false;
      formErrors["courseId"] = "Please select course ";
    }
    if (!props.moduleId) {
      isValid = false;
      formErrors["moduleId"] = "Please select module";
    }
    if (!props.courseUnitId && props.check) {
      isValid = false;
      formErrors["courseUnitId"] = "Courseunit is required";
    }
    // if (props.check) {
    //   isValid = false;
    //   formErrors["courseUnitId"] = "Please select courseunit";
    // }

    setError(formErrors);

    return isValid;
  };
  const clickHandleCourseUnit = () => {
    if (formValidation()) {
      props.nextStep();
    }
  };

  return (
    <div>
      <Layout>
        <div className="warmup-content-wrappper">
          <div className="plan-wrapper">
            <React.Fragment>
              <div className="heading-tilte">
                <h3>Add Question</h3>
              </div>
              <div className="form-filed_course">
                <label>Select Course</label>

                <div className="popup-form-box">
                  <select
                    className="input1"
                    type="text"
                    name="courseId"
                    placeholder="CourseId"
                    value={props.courseId && props.courseId}
                    onChange={props.handle}
                  >
                    <option value="">Select Course</option>
                    {props.course &&
                      props.course.length > 0 &&
                      props.course.map((item) => (
                        <option value={item.id}>{item.title}</option>
                      ))}
                  </select>
                  <span className="form-error">{error.courseId}</span>
                </div>
              </div>
              <div className="form-filed_course">
                <label>Select Module</label>
                <div className="popup-form-box">
                  <select
                    className="input1"
                    type="text"
                    name="module"
                    placeholder="module"
                    value={props.moduleId && props.moduleId}
                    onChange={props.handle}
                  >
                    <option value="">Select Module</option>

                    {props.module &&
                      props.module.length > 0 &&
                      props.module.map((item) => (
                        <>
                          <option value={item.id}>{item.title}</option>
                        </>
                      ))}
                  </select>
                  <span className="form-error">{error.moduleId}</span>
                </div>
              </div>

              <div className="AddCoursecheckbox">
                <input
                  type="checkbox"
                  value={props.check}
                  checked={props.check && props.check}
                  onChange={props.handleChangechanck}
                ></input>
                <span>Use this questions as unit Quiz</span>
              </div>
              {props.check ? (
                <div className="form-filed_course">
                  <label>Select Course Unit</label>
                  <div className="popup-form-box">
                    <select
                      className="input1"
                      type="text"
                      name="courseUnit"
                      placeholder="courseUnit "
                      value={props.courseUnitId ? props.courseUnitId : null}
                      onChange={props.handle}
                    >
                      <option value="">Select Course Unit </option>
                      {/* <span>Option</span> */}

                      {props.courseUNitTitleOptions &&
                        props.courseUNitTitleOptions.length > 0 &&
                        props.courseUNitTitleOptions.map((item) => (
                          <>
                            {props.check ? (
                              <option value={item._id}>{item.title}</option>
                            ) : (
                              ""
                            )}
                            )
                          </>
                        ))}
                    </select>
                  </div>
                  <span className="form-error">{error.courseUnitId}</span>
                </div>
              ) : (
                ""
              )}
              <div class="save-changes-btn">
                <Button
                  type="submit"
                  variant="danger"
                  onClick={clickHandleCourseUnit}
                >
                  Next Step
                </Button>
              </div>
            </React.Fragment>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AddQuestionCourse;
