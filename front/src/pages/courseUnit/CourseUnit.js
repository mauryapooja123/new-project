import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import PaginationReuse from "../Pagination/PaginationReuse";
import * as courseUnitService from "../../services/courseUnitService";
import Layout from "../../layout/Layout";
import DeleteConfirmation from "../../models/CourseUnit/DeleteConfirmation";
import SwapCourseUnit from "../../models/CourseUnit/SwapCourseUnit";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import * as courseModule from "../../services/courseModule";

const CourseUnit = () => {
  const navigate = useNavigate();

  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [modelIsOpenSwap, setModelIsOpenSwap] = useState(false);
  const [modelIsOpendelete, setModelIsOpendelete] = useState(false);
  const [pageAfterSearch, setPageAfterSearch] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState();
  const [loading, setLoading] = useState(false);
  const [courseUnitList, setCourseUnitList] = useState([]);
  const [deleteItem, setDelteItem] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCourseUnit, settotalCourseUnit] = useState();
  const [pageLimit, setPageLimit] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [searchValue, setSearchValue] = useState();
  const [popupMessage, setPopupMessage] = useState();
  const [deleteStatus, setDeleteStatus] = useState();
  const [stateTitle, setStateTitle] = useState();

  useEffect(() => {
    getCourseUnitlist(pageNumber);
  }, [modelIsOpen]);

  const searchCourses = async (e) => {
    try {
      if (!e.target.value) {
        getCourseUnitlist(pageNumber);
        setPageAfterSearch(false);
      } else {
        setSearchValue(e.target.value);
        const response = await courseUnitService.getSearchCourseUnit(
          pageNumber,
          pageLimit,
          e.target.value
        );

        setCourseUnitList(response.data.data);
        settotalCourseUnit(response.data.totalCount);
        setPageAfterSearch(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const searchCourseUnitForPagination = async (pagenumber) => {
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
        setCourseUnitList(response.data.data);
        settotalCourseUnit(response.data.totalCount);
        setPageAfterSearch(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCourseUnitlist = async (pagenumber) => {
    const response = await courseUnitService.getCourseUnit(
      pagenumber,
      pageLimit
    );
    setCourseUnitList(response.data.data);
    settotalCourseUnit(response.data.totalCount);
    setLoading(false);
  };

  const handlePageChange = (pagenumber) => {
    if (pageAfterSearch) {
      searchCourseUnitForPagination(pagenumber);
      setActivePage(pagenumber);
    } else {
      getCourseUnitlist(pagenumber);
      setActivePage(pagenumber);
    }
  };

  const modalStatus = () => {
    getCourseUnitlist(pageNumber);
  };

  const getDeleteModalPopOpenIsTrue = (items) => {
    setModelIsOpendelete(true);
    setDelteItem(items);
    setDeleteStatus("Delete Course Unit");
    setPopupMessage([<p>Do you Want to Delete CourseUnit......</p>]);
  };

  const getModelOpenIsTrue = (data) => {
    navigate(`/courseunit/edit/${data._id}`);
  };

  const getCourseTitle = async (state) => {
    const response = await courseModule.getTitleByState(state);
    setStateTitle(response.data.data);
  };
  const swapModelOpenIsTrue = (data) => {
    setModelIsOpenSwap(true);
    setSelectedSwap(data);
  };

  const navifunc = () => {
    navigate("/courseunit/add");
  };

  return (
    <div>
      <Layout>
        <div className="warmup-content-wrappper">
          <div className="plan-wrapper">
            <div className="plan-table-heading">
              <h3>Course Unit List</h3>
              <div className="search-bar">
                <input
                  name="search"
                  type="text"
                  className="form-control"
                  placeholder="Search CourseUnit"
                  aria-label="search"
                  aria-describedby="search"
                  onChange={searchCourses}
                />
                <i className="fa fa-search" aria-hidden="true"></i>
              </div>
              <div className="questionTitlebtn">
                <Button className="addpopup-btn" onClick={navifunc}>
                  Add Course Unit
                </Button>
              </div>
            </div>

            <div className="plan-table">
              <Table striped bordered hover responsive>
                <thead>
                  <tr style={{ height: "30px" }}>
                    <th>Id</th>
                    <th>State</th>
                    <th>Course Title</th>
                    <th>Module Title</th>
                    <th>Title</th>
                    <th>OrderNo</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {courseUnitList &&
                    courseUnitList.length > 0 &&
                    courseUnitList.map((items, index) => (
                      <tr key={items._id} style={{ height: "35px" }}>
                        <td>{index + 1}</td>
                        <td>{items && items.state}</td>
                        <td>
                          {items && items.courseId && items.courseId.title}
                        </td>
                        <td>{items && items.module && items.module.title}</td>
                        <td>{items.title}</td>
                        {/* <td>{parse(items.content)}</td> */}
                        <td>{items.orderNo}</td>
                        <td>
                          <Button
                            variant="info"
                            onClick={() => {
                              swapModelOpenIsTrue(items);
                            }}
                          >
                            <i
                              className="fa fa-exchange"
                              aria-hidden="true"
                            ></i>
                          </Button>
                          <Button
                            variant="info"
                            onClick={() => {
                              getModelOpenIsTrue(items);
                              getCourseTitle(items.state);
                            }}
                          >
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => getDeleteModalPopOpenIsTrue(items)}
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
            <SwapCourseUnit
              showModal={modelIsOpenSwap}
              toggleModal={setModelIsOpenSwap}
              selectedSwap={selectedSwap}
              modalStatus={modalStatus}
              // test={test}
            ></SwapCourseUnit>

            <DeleteConfirmation
              showModal={modelIsOpendelete}
              toggleModal={setModelIsOpendelete}
              deleteItem={deleteItem}
              getCourseUnitlist={getCourseUnitlist}
              pageNumber={pageNumber}
              popupMessage={popupMessage}
              deleteStatus={deleteStatus}
            ></DeleteConfirmation>
            <div className="pagination-box">
              {totalCourseUnit > 10 ? (
                <PaginationReuse
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
      </Layout>
    </div>
  );
};

export default CourseUnit;
