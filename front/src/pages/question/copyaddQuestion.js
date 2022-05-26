import { Modal, Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import * as courseServices from "../../services/courseServices";
import * as questionService from "../../services/questionService";
import * as courseModuleService from "../../services/courseModule";
import _ from "lodash";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";

const AddQuestionCourse = () => {
  const navigate = useNavigate();

  const [courseoptions, setCourseoptions] = useState([]);
  const [courseModuleOptions, setCourseModuleOptions] = useState([]);
  const [input, setInput] = useState([{ option: "", isAnswer: true }]);
  const [addQuestion, setAddQuestion] = useState({
    courseId: "",
    module: "",
    question: "",
    answer: "",
    marks: "",
  });
  const [error, setError] = useState([]);

  useEffect(() => {
    getCourse();
  }, []);

  const formValidation = () => {
    const { answer, marks, question, courseId, module } = addQuestion;
    const options = [...input];
    let formErrors = {};
    let isValid = true;
    if (!courseId) {
      isValid = false;
      formErrors["courseId"] = "Please Enter Course ";
    }
    if (!module) {
      isValid = false;
      formErrors["module"] = "Please Enter Module";
    }
    if (!question) {
      isValid = false;
      formErrors["question"] = "Please Enter question";
    }

    if (!answer) {
      isValid = false;
      formErrors["answer"] = "Please Enter Answer Explanation";
    }
    if (!marks) {
      isValid = false;
      formErrors["marks"] = "Please Enter marks";
    }

    if (options.length <= 1) {
      isValid = false;
      formErrors["option"] = "Please Select more Answer Option";
    }

    setError(formErrors);
    return isValid;
  };

  const handleCloseOnCloseButton = () => {
    navigate("/question");
  };

  const clickHandleCourseUnit = async (e) => {
    if (formValidation()) {
      try {
        const data = {
          questions: [...input],
          courseId: addQuestion.courseId,
          module: addQuestion.module,
          question: addQuestion.question,
          answer: addQuestion.answer,
          marks: addQuestion.marks,
        };
        const response = await questionService.addQuestion(data);
        if (response.status === 400) {
          createNotification("error", response.message);
        } else {
          createNotification("success", response.message);
          setTimeout(() => {
            navigate("/question");
          }, 2000);

          setAddQuestion("");
          setInput([input]);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddQuestion({
      ...addQuestion,
      [name]: value,
    });

    if (name === "courseId") {
      getCourseModule(value);
    }
  };

  const getCourse = async () => {
    const response = await courseServices.getAll();
    setCourseoptions(response.data.data);
  };
  const getCourseModule = async (courseId) => {
    const response = await courseModuleService.getModuleById(courseId);
    setCourseModuleOptions(response.data.data);
  };

  return (
    <div>
      <Layout>
        <div className="warmup-content-wrappper">
          <div className="plan-wrapper">
            <React.Fragment>
              <div className="heading-tilte">
                <h3>Add Questions</h3>
              </div>
              <div className="form-filed_course">
                <label>Select Course</label>

                <div className="popup-form-box">
                  <select
                    className="input1"
                    type="text"
                    name="courseId"
                    placeholder="CourseId..."
                    onChange={handleChange}
                  >
                    <option value="">Select Course</option>
                    {courseoptions &&
                      courseoptions.length > 0 &&
                      courseoptions.map((item) => (
                        <option value={item.id}>{item.title}</option>
                      ))}
                  </select>
                  <span className="form-error">{error.courseId}</span>
                </div>
                <div className="form-filed_course">
                  <label>Select Module</label>

                  <select
                    className="input1"
                    type="text"
                    name="module"
                    placeholder="module..."
                    onChange={handleChange}
                  >
                    <option value="">Select Module</option>

                    {courseModuleOptions &&
                      courseModuleOptions.length > 0 &&
                      courseModuleOptions.map((item) => (
                        <>
                          <option value={item.id}>{item.title}</option>
                        </>
                      ))}
                  </select>
                  <span className="form-error">{error.module}</span>
                </div>
                <div className="form-filed_course">
                  <label>Enter Question</label>
                  <input
                    className="input1"
                    type="text"
                    name="question"
                    placeholder="question...."
                    value={addQuestion.question}
                    onChange={handleChange}
                  />
                  <span className="form-error">{error.question}</span>
                </div>
                <div className="form-filed_course map_courseOptions">
                  <Form.Label
                    onClick={(e) => {
                      e.preventDefault();
                      let sub = [...input];
                      sub.push({ option: "", isAnswer: false });
                      setInput(sub);
                    }}
                  >
                    Add Answers option +
                  </Form.Label>
                  <div className="App">
                    <div className="add-Data">
                      {input && input.length
                        ? input.map((val, index) => {
                            return (
                              <React.Fragment key={val._id}>
                                <div className="optionsAnswer">
                                  <label>Option</label>
                                  <div className="option_Answer_corner">
                                    <div className="optionEditAnswer">
                                      <input
                                        className="input1"
                                        type="text"
                                        name="option"
                                        placeholder="option..."
                                        value={val.option}
                                        onChange={(e) => {
                                          let data = [...input];

                                          data[index] = {
                                            ...data[index],
                                            option: e.target.value,
                                          };

                                          setInput([...data]);
                                        }}
                                      />
                                      {index === 0 ? null : (
                                        <label
                                          className="cross-sign"
                                          onClick={(e) => {
                                            let data = [...input];
                                            data.splice(index, 1);
                                            setInput(data);
                                          }}
                                        >
                                          +
                                        </label>
                                      )}
                                    </div>

                                    <div className="radioAnswer">
                                      <Form.Label>IsAnswer</Form.Label>
                                      <input
                                        type="radio"
                                        value={val.isAnswer}
                                        checked={val.isAnswer}
                                        name="isAnswer"
                                        // checked={val.isAnswer}
                                        onChange={(e) => {
                                          let data = [...input];
                                          data = data.map((item) => {
                                            return { ...item, isAnswer: false };
                                          });
                                          data[index] = {
                                            ...data[index],
                                            isAnswer: true,
                                          };

                                          setInput([...data]);
                                        }}
                                      />
                                    </div>

                                    {/* {error ? (
                                      <p
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                          paddingLeft: "20px",
                                        }}
                                      >
                                        {error.isAnswer}
                                      </p>
                                    ) : null} */}
                                  </div>
                                  <span className="form-error">
                                    {error.option}
                                  </span>
                                </div>
                              </React.Fragment>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </div>
                <div className="form-filed_course">
                  <label>Answer Explanation</label>

                  <textarea
                    className="input1"
                    type="text"
                    name="answer"
                    placeholder="Answer explanation..."
                    value={addQuestion.answer}
                    onChange={handleChange}
                  />
                  <span className="form-error">{error.answer}</span>
                </div>
                <div className="form-filed_course">
                  <label>Select Marks</label>

                  <select
                    className="input1"
                    type="number"
                    name="marks"
                    placeholder="marks..."
                    value={addQuestion.marks}
                    onChange={handleChange}
                  >
                    <option value="">Select Marks</option>
                    {[...Array.from(Array(11).keys())].map((num, i) => (
                      <option key={i}>{num}</option>
                    ))}
                  </select>
                  <span className="form-error">{error.marks}</span>
                </div>
              </div>
              <div class="save-changes-btn">
                <Button
                  type="submit"
                  variant="danger"
                  onClick={clickHandleCourseUnit}
                >
                  Add
                </Button>
              </div>
              <ToastContainer autoClose={3000} />
            </React.Fragment>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AddQuestionCourse;
