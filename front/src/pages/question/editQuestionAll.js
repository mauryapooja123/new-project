import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import * as courseServices from "../../services/courseModule";
import * as courseModuleService from "../../services/courseModule";
import * as courseQuestionService from "../../services/questionService";
import * as questionService from "../../services/questionService";

import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";
import Layout from "../../layout/Layout";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import _ from "lodash";

const EditQuestionAll = (props) => {
  const navigate = useNavigate();
  const [input, setInput] = useState([{ option: "", isAnswer: false }]);
  const [questionData, setQuestionData] = useState(false);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(props.data.length);
  const [questionAll, setQuestionAll] = useState("");
  const [answer, setAnswer] = useState("");
  const [marks, setMarks] = useState("");
  const [error, setError] = useState({});
  const [final, setFinal] = useState([]);
  const [finalObj, setFinalObj] = useState([]);
  const [ids, setIds] = useState([]);
  const formValidation = () => {
    const options = [...input];

    let formErrors = {};
    let isValid = true;

    if (!questionAll) {
      isValid = false;
      formErrors["question"] = "Please Enter Question";
    }

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

  useEffect(() => {
    const filterData = finalObj.filter((val, i) => i === count);
    setQuestionData(filterData);
  }, [count]);

  useEffect(() => {
    const filterData = finalObj.filter((val, i) => i === count);
    setQuestionData(filterData);
  }, [finalObj]);

  const getFirstTime = (data) => {
    const filterData = data.filter((val, i) => i === count);
    setQuestionData(filterData);
  };

  useEffect(() => {
    setFinalObj(props.data);
    getFirstTime(props.data);
  }, [props.data]);

  const addNewQuestion = () => {
    let total = finalObj.length;
    const obj = {
      questions: [{ option: "", isAnswer: false }],
      question: "",
      answer: "",
      marks: "",
    };
    setFinalObj([...finalObj, obj]);

    setCount(total);
  };

  useEffect(() => {
    if (questionData != false) {
      setVal();
    }
  }, [questionData]);
  const buttonText = count < finalObj.length ? "Next" : "Submit";
  const handleClick = async () => {
    if (formValidation()) {
      if (count === finalObj.length) {
        if (buttonText == "Submit") {
          try {
            const data = {
              courseId: props.courseId,
              module: props.module,
              coursUnit: props.check ? props.courseUnitId : null,
              questions: finalObj,
              isUnitQuiz: props.check,
            };

            const response = await courseQuestionService.editQuestion(
              props.id,
              data
            );

            if (response.status == 200) {
              createNotification("success", response.data.message);
              setTimeout(() => {
                navigate("/question");
              }, 2000);
            } else {
              createNotification("error", response.data.message);
            }

            return response;
          } catch (err) {
            console.log(err);
          }
        }
        setCount(count);
      } else {
        if (buttonText == "Next") {
          const data1 = {
            questions: [...input],
            question: questionAll,
            answer: answer,
            marks: marks,
            ids: ids,
          };

          const objIndex = finalObj.findIndex(
            (obj) => obj._id == questionData[0]._id
          );
          if (objIndex !== undefined) {
            finalObj[objIndex].questions = [...input];
            finalObj[objIndex].question = questionAll;
            finalObj[objIndex].answer = answer;
            finalObj[objIndex].marks = marks;
            setCount(count + 1);
          } else {
            setFinalObj([...finalObj, data1]);
          }
          setFinal([...final, data1]);
        } else {
          console.log("error");
        }
      }
    }
  };

  const setVal = () => {
    return questionData.map((val, index) => {
      setIds(val._id);
      setQuestionAll(val.question);
      setAnswer(val.answer);
      setMarks(val.marks);
      setInput(val.questions);
    });
  };
  const buttonText1 = count < finalObj.length ? "" : "privious";
  console.log(count, finalObj.length, "finalobj");
  const priHandleClick = async () => {
    setCount(count - 1);
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
                  <h6>Question</h6>

                  <input
                    className="input1"
                    name="question"
                    type="text"
                    placeholder="Question"
                    value={questionAll}
                    onChange={(e) => setQuestionAll(e.target.value)}
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
                        ? input.map((opt, index) => {
                            return (
                              <React.Fragment key={opt._id}>
                                <div className="optionsAnswer">
                                  <label>Option</label>
                                  <div className="option_Answer_corner">
                                    <div className="optionEditAnswer">
                                      <input
                                        className="input1"
                                        type="text"
                                        name="option"
                                        placeholder="Option"
                                        value={opt.option}
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
                                        value={opt.isAnswer}
                                        name="isAnswer"
                                        checked={opt.isAnswer}
                                        onChange={(e) => {
                                          let data = [...input];
                                          data = data.map((item) => {
                                            return {
                                              ...item,
                                              isAnswer: false,
                                            };
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
                    placeholder="Marks"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                  >
                    <option value="">Select Marks</option>
                    {[...Array.from(Array(11).keys())]
                      .slice(1)
                      .map((num, i) => (
                        <option key={i}>{num}</option>
                      ))}
                  </select>
                  <span className="form-error">{error.marks}</span>
                </div>
              </div>
              <div className="save_changes_btn_wrapper d-flex w-100 justify-content-between align-items-center">
                <div className="save-changes-btn">
                  <Button
                    type="submit"
                    variant="danger"
                    onClick={props.prevStep}
                  >
                    Back to Step 1
                  </Button>
                </div>
                <div className="save-changes-btn_right d-flex ">
                  <div className="save-changes-btn mr-3">
                    {count > 0 ? (
                      <Button
                        type="submit"
                        variant="danger"
                        onClick={priHandleClick}
                      >
                        previous
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="save-changes-btn">
                    <Button
                      type="submit"
                      variant="danger"
                      onClick={handleClick}
                    >
                      {buttonText}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center add-more-quewrap">
                <div className="save-changes-btn">
                  <Button
                    type="submit"
                    variant="danger"
                    onClick={addNewQuestion}
                  >
                    Add More Question
                  </Button>
                </div>
              </div>
            </div>
            <ToastContainer />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default EditQuestionAll;
