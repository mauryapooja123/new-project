import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import Pagination1 from "../Pagination/PaginationReuse";
import * as questionService from "../../services/questionService";
import DeleteQuestion from "../../models/questionModal/DeleteQuestion";
import Layout from "../../layout/Layout";
import * as courseServices from "../../services/courseServices";
import * as courseModuleService from "../../services/courseModule";
import { useNavigate } from "react-router-dom";

const QuestionModule = () => {
  const navigate = useNavigate();
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [pageAfterSearch, setPageAfterSearch] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [loading, setLoading] = useState(false);
  const [planList, setPlanlist] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCourseUnit, settotalCourseUnit] = useState();
  const [pageLimit, setPageLimit] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [searchValue, setSearchValue] = useState();
  const [modelIsOpendelete, setModelIsOpendelete] = useState(false);
  const [popupMessage, setPopupMessage] = useState();
  const [deleteStatus, setDeleteStatus] = useState();
  const [deleteItem, setDelteItem] = useState();
  const [findQuestions, setFindQuestions] = useState({
    courseId: "",
    module: "",
  });
  const [answererror, setAnswerError] = useState([{}]);
  const [courseoptions, setCourseoptions] = useState([]);
  const [courseModuleOptions, setCourseModuleOptions] = useState([]);
  useEffect(() => {
    getCourseUnitlist(pageNumber);
  }, [modelIsOpen]);

  const searchPlanForPagination = async (pagenumber) => {
    try {
      if (!searchValue) {
        getCourseUnitlist(pagenumber);
        setPageAfterSearch(false);
      } else {
        const response = await courseUnitService.getSearchCourseUnit(
          pagenumber,
          pageLimit,
          searchValue
        );
        setPlanlist(response.data.data);
        settotalCourseUnit(response.data.totalCount);
        setPageAfterSearch(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePageChange = (pagenumber) => {
    if (pageAfterSearch) {
      searchPlanForPagination(pagenumber);
      setActivePage(pagenumber);
    } else {
      setActivePage(pagenumber);
      getCourseUnitlist(pagenumber);
    }
  };

  const getCourseUnitlist = async (pageNumber) => {
    const response = await questionService.getAllQuestion(
      pageNumber,
      pageLimit
    );
    setPlanlist(response.data);
    settotalCourseUnit(response.totalCount);
  };

  useEffect(() => {
    getCourse();
  }, []);

  const getModelOpenIsTrue = (data) => {
    navigate(`/question/edit/${data._id}`);
  };
  const getDeleteModalPopOpenIsTrue = (items) => {
    setModelIsOpendelete(true);
    setDelteItem(items);
    setDeleteStatus("Delete Question");
    setPopupMessage([<p>Do you Want to Delete Question!!</p>]);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFindQuestions({
      ...findQuestions,
      [name]: value,
    });
    if (name === "courseId") {
      getCourseModule(value);
    }
    if (name === "module") {
      getAllQuestions(value);
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

  const getAllQuestions = async (module) => {
    const response = await questionService.getQuestionByModule(module);

    setPlanlist(response.data.data);
  };

  const navifunc = () => {
    navigate("/question/add");
  };

  return (
    <div>
      <Layout>
        <div className="warmup-content-wrappper questions-tab">
          <div className="plan-wrapper">
            <div className="plan-table-heading">
              <div className="questionTitlebtn">
                <h3>Question List</h3>
                <Button className="addpopup-btn" onClick={navifunc}>
                  Add Question
                </Button>
              </div>
              <div className="question-table-head">
                <div className="search-bar">
                  <div className="question-select">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    <select
                      className="input1 select-1"
                      type="text"
                      name="courseId"
                      placeholder="CourseId..."
                      onChange={handleChange}
                    >
                      <option value="">Select Course</option>
                      {courseoptions &&
                        courseoptions.length > 0 &&
                        courseoptions.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.title}
                          </option>
                        ))}
                    </select>
                    <select
                      className="input1 select-2"
                      type="text"
                      name="module"
                      placeholder="Module......."
                      onChange={handleChange}
                    >
                      <option value="">Select Module</option>
                      {courseModuleOptions &&
                        courseModuleOptions.length > 0 &&
                        courseModuleOptions.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.title}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="plan-table">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr style={{ height: "30px" }}>
                      <th>Id</th>
                      <th>Course</th>
                      <th>Module</th>
                      <th>Unit</th>
                      <th>Question</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planList && planList.length > 0
                      ? planList.map((items, index) => (
                          <tr key={items._id} style={{ height: "35px" }}>
                            <td>{index + 1}</td>
                            <td>
                              {items.courseId ? items.courseId.title : ""}
                            </td>
                            <td>{items.module ? items.module.title : ""}</td>

                            <td>{items.coursUnit ? "true" : "false"}</td>

                            {/*
                             <td>
                              {items.isUnitQuiz ? items.isUnitQuiz : "null"}
                            </td>
                             <td>
                              {items.questions[0].question
                                ? items.questions[0].question
                                : ""}
                            </td> */}

                            <td>
                              {" "}
                              {items.questions.map((val) => {
                                return <p> {val.question} </p>;
                              })}{" "}
                            </td>

                            <td>
                              <Button
                                variant="info"
                                onClick={() => {
                                  getModelOpenIsTrue(items);
                                }}
                              >
                                <i
                                  className="fa fa-pencil-square-o"
                                  aria-hidden="true"
                                ></i>
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() =>
                                  getDeleteModalPopOpenIsTrue(items)
                                }
                              >
                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                ></i>
                              </Button>
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </Table>
              </div>

              <DeleteQuestion
                showModal={modelIsOpendelete}
                toggleModal={setModelIsOpendelete}
                deleteItem={deleteItem}
                getCourseUnitlist={getCourseUnitlist}
                pageNumber={pageNumber}
                popupMessage={popupMessage}
                deleteStatus={deleteStatus}
              ></DeleteQuestion>
              <div className="pagination-box">
                {totalCourseUnit > 10 ? (
                  <Pagination1
                    allDataCount={totalCourseUnit}
                    pageLimit={pageLimit}
                    activePage={activePage}
                    pagenumber={pageNumber}
                    onchange={handlePageChange}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default QuestionModule;
