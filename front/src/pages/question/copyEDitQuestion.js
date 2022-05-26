import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import * as courseServices from "../../services/courseModule";
import * as courseModuleService from "../../services/courseModule";
import * as courseQuestionService from "../../services/questionService";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";
import Layout from "../../layout/Layout";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import _ from "lodash";

const EditCourseUnit = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState([{ option: "", isAnswer: false }]);
  const [courseId, setCourseId] = useState("");
  const [module, setModule] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [marks, setMarks] = useState("");
  const [error, setError] = useState({});
  const [courseoptions, setCourseoptions] = useState([]);
  const [courseModuleOptions, setCourseModuleOptions] = useState([]);

  useEffect(() => {
    getCourse();
    getAuestionById();
  }, []);

  const { _id } = useParams();
  const getAuestionById = async () => {
    const response = await courseQuestionService.getAllQuestionById(_id);

    getCourseModule(response.data.courseId);

    setCourseId(response.data.courseId);
    setModule(response.data.module);
    setMarks(response.data.marks);
    setAnswer(response.data.answer);
    setQuestion(response.data.question);
    setInput(response.data.questions);
  };

  const formValidation = () => {
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
      formErrors["question"] = "Please Enter Question";
    }

    // const filt = options.filter((value) => value.isAnswer == true);
    // if (filt == false) {
    //   isValid = true;
    //   formErrors["isAnswer"] =
    //     "Please Enter At least One  isAnswers is required";
    // }
    if (!answer) {
      isValid = false;
      formErrors["answer"] = "Please Enter Answer Explanation";
    }
    if (!marks) {
      isValid = false;
      formErrors["marks"] = "marks is required";
    }
    if (options.length <= 1) {
      isValid = false;
      formErrors["option"] = "Please Select more  Answer Option";
    }

    setError(formErrors);
    return isValid;
  };

  const handleEdit = async () => {
    if (formValidation()) {
      const obj = {
        questions: [...input],
        courseId: courseId,
        module: module,
        question: question,
        answer: answer,
        marks: marks,
      };
      const response = await courseQuestionService.editQuestion(_id, obj);
      if (response.status == 200) {
        createNotification("success", response.data.message);
        setTimeout(() => {
          navigate("/question");
        }, 2000);
      } else {
        createNotification("error", response.data.message);
      }

      return response;
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

  const handleClickBack = () => {
    navigate("/question");
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
                    value={courseId}
                    onChange={(e) => {
                      setCourseId(e.target.value);
                      getCourseModule(e.target.value);
                    }}
                  >
                    <option value="">Select Course</option>
                    {courseoptions &&
                      courseoptions.length > 0 &&
                      courseoptions.map((item) => {
                        return courseId == item.title ? (
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
                    value={module}
                    onChange={(e) => {
                      setModule(e.target.value);
                    }}
                  >
                    <option value="">Select Module......</option>
                    {courseModuleOptions &&
                      courseModuleOptions.length > 0 &&
                      courseModuleOptions.map((item) => (
                        <option value={item.id}>{item.title}</option>
                      ))}
                  </select>
                  <span className="form-error">{error.module}</span>
                </div>
                <div className="form-filed_course">
                  <label>Question</label>
                  <input
                    className="input1"
                    name="question"
                    type="text"
                    placeholder="Question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
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
                    Edit Answers option +
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
                                      <Form.Label>isAnswer</Form.Label>
                                      <input
                                        type="radio"
                                        value={val.isAnswer}
                                        name="isAnswer"
                                        checked={val.isAnswer}
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
                  <label>Answers Explanation</label>

                  <input
                    className="input1"
                    name="answer"
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
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
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                  >
                    <option value="">Select Marks</option>
                    {[...Array.from(Array(11).keys())].map((num, i) => (
                      <option key={i}>{num}</option>
                    ))}
                  </select>
                  <span className="form-error">{error.marks}</span>
                </div>
              </div>
              <div className="save-changes-btn">
                <Button variant="danger" onClick={handleEdit}>
                  Save Changes
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

export default EditCourseUnit;
