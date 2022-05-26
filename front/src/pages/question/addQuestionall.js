import { Modal, Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";

import _ from "lodash";
import { ToastContainer } from "react-toastify";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";

const AddQuestionAll = (props) => {
  const navigate = useNavigate();

  const ClickPrivious = () => {
    props.prevStep();
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
                <div className="form-filed_course">
                  <label>Enter Question</label>
                  <input
                    className="input1"
                    type="text"
                    name="question"
                    placeholder="Question"
                    value={props.addQuestion.question}
                    onChange={props.handleQuestionChange}
                  />
                  <span className="form-error">{props.error.question}</span>
                </div>
                <div className="form-filed_course map_courseOptions">
                  <Form.Label onClick={props.pushquestion}>
                    Add Answers option +
                  </Form.Label>
                  <div className="App">
                    <div className="add-Data">
                      {props.inputValue && props.inputValue.length
                        ? props.inputValue.map((val, index) => {
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
                                        placeholder="Option"
                                        value={val.option}
                                        onChange={(e) =>
                                          props.handleInput(e, index)
                                        }
                                      />
                                      {index === 0 ? null : (
                                        <label
                                          className="cross-sign"
                                          onClick={(e) => {
                                            let data = [...props.inputValue];
                                            data.splice(index, 1);
                                            props.setInput(data);
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
                                        onChange={(e) => {
                                          props.handleRadio(e, index);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <span className="form-error">
                                    {props.error.option}
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
                    placeholder="Answer explanation"
                    value={props.addQuestion.answer}
                    onChange={props.handleQuestionChange}
                  />
                  <span className="form-error">{props.error.answer}</span>
                </div>
                <div className="form-filed_course">
                  <label>Select Marks</label>

                  <select
                    className="input1"
                    type="number"
                    name="marks"
                    placeholder="Marks"
                    value={props.addQuestion.marks}
                    onChange={props.handleQuestionChange}
                  >
                    <option value="">Select Marks</option>
                    {[...Array.from(Array(11).keys())]
                      .slice(1)
                      .map((num, i) => (
                        <option key={i}>{num}</option>
                      ))}
                  </select>
                  <span className="form-error">{props.error.marks}</span>
                </div>
              </div>
              <div className="save_changes_btn_wrapper d-flex w-100 justify-content-between align-items-center">
                <div class="save-changes-btn">
                  <Button
                    type="submit"
                    variant="danger"
                    onClick={ClickPrivious}
                  >
                    Back to Step 1
                  </Button>
                </div>
                <div className="save-changes-btn_right d-flex ">
                  <div class="save-changes-btn mr-3">
                    <Button
                      type="submit"
                      variant="danger"
                      onClick={props.clickAddQuestion}
                    >
                      Add
                    </Button>
                  </div>
                  <div class="save-changes-btn">
                    <Button
                      type="submit"
                      variant="danger"
                      onClick={props.submitClick}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
              <ToastContainer autoClose={3000} />
            </React.Fragment>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AddQuestionAll;
