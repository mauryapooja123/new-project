import React, { useEffect, useState } from "react";
import { Loader } from "../../Loader/Loader";
import { Button, Table } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import PaginationReuse from "../Pagination/PaginationReuse";
import { AddCourseModule } from "../../models/courseModule/AddModule";
import EditCourseModule from "../../models/courseModule/EditModule";
import SwapCourseModule from "../../models/courseModule/SwapModule";
import * as courseModuleService from "../../services/courseModuleService";
import Layout from "../../layout/Layout";
import DeleteCourseModule from "../../models/courseModule/DeleteModule";
import * as courseModule from "../../services/courseModule";

const CourseModule = (props) => {
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [modelIsOpenSwap, setModelIsOpenSwap] = useState(false);
  const [modelIsOpendelete, setModelIsOpendelete] = useState(false);
  const [pageAfterSearch, setPageAfterSearch] = useState(false);
  const [test, setTest] = useState("rahul");
  const [selectedItem, setSelectedItem] = useState();
  const [loading, setLoading] = useState(false);
  const [moduleList, setModuleList] = useState([]);
  const [deleteItem, setDelteItem] = useState();
  const [swapModule, setSwapModule] = useState();

  const [pageNumber, setPageNumber] = useState(1);
  const [totalData, setTotalData] = useState();
  const [pageLimit, setPageLimit] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [searchValue, setSearchValue] = useState();
  const [popupMessage, setPopupMessage] = useState();
  const [deleteStatus, setDeleteStatus] = useState();
  const [stateTitle, setStateTitle] = useState();

  return (
    <div>
      <Layout>
        <React.Fragment>
          <div className="warmup-content-wrappper">
            <div className="plan-wrapper">
              <div className="plan-table-heading">
                <h3>Module List</h3>
                <div className="search-bar">
                  <input
                    name="search"
                    type="text"
                    className="form-control"
                    placeholder="Search Modules"
                    aria-label="search"
                    aria-describedby="search"
                  />
                  <i className="fa fa-search" aria-hidden="true"></i>
                </div>
                <div className="addpopup-btn">
                  {/* <AddCourseModule
                  // showModal={modelIsOpen}
                  // toggleModal={setModelIsOpen}
                  // selectedItem={selectedItem}
                  // modalStatus={modalStatus}
                  // test={test}
                  ></AddCourseModule> */}
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
                      <th>OrderNo</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {moduleList &&
                      moduleList.length > 0 &&
                      moduleList.map((items, index) => {
                        return (
                          <tr key={items._id} style={{ height: "35px" }}>
                            <td>{index + 1}</td>
                            <td>{items.state}</td>

                            <td>
                              {items && items.courseId && items.courseId.title}
                            </td>
                            <td>{items && items.title}</td>
                            <td>{items.orderNo}</td>
                            <td>
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
                                // onClick={() =>
                                //   getDeleteModalPopOpenIsTrue(items)
                                // }
                              >
                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                ></i>
                              </Button>
                              <Button
                                variant="info"
                                onClick={() => {
                                  getSwapModalPopIsTrue(items);
                                }}
                              >
                                <i
                                  className="fa fa-exchange"
                                  aria-hidden="true"
                                ></i>
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
              {/* <EditCourseModule
                showModal={modelIsOpen}
                toggleModal={setModelIsOpen}
                selectedItem={selectedItem}
                stateTitle={stateTitle}
              ></EditCourseModule> */}
              {/* <DeleteCourseModule
                showModal={modelIsOpendelete}
                toggleModal={setModelIsOpendelete}
                deleteItem={deleteItem}
                getModuleList={getModuleList}
                pageNumber={pageNumber}
                popupMessage={popupMessage}
                deleteStatus={deleteStatus}
              ></DeleteCourseModule> */}
              {/* <SwapCourseModule
                showModal={modelIsOpenSwap}
                toggleModal={setModelIsOpenSwap}
                swapModule={swapModule}
                modalStatus={modalStatus}
              ></SwapCourseModule> */}
              {/* <div className="pagination-box">
                {totalData > 10 ? (
                  <PaginationReuse
                    allDataCount={totalData}
                    pageLimit={pageLimit}
                    activePage={activePage}
                    pagenumber={pageNumber}
                    onchange={handlePageChange}
                  />
                ) : (
                  ""
                )}
              </div> */}
            </div>
          </div>
          {loading ? <Loader /> : null}
        </React.Fragment>
      </Layout>
    </div>
  );
};

export default CourseModule;
