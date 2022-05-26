import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import AddModulePage from "./AddModulePage";
import { Button, Table } from "react-bootstrap";

import { useState } from "react";
import {
  addNewCourse,
  getCourseData,
  deleteCourseData,
  searchUser,
  getUser,
} from "../../services/CopyCourseModule";

import state from "../../config/state.json";

import Pagination from "react-js-pagination";
const IndexPage = () => {
  console.log(state, "helloo");

  useEffect(() => {
    getAllData();
  }, []);
  useEffect(() => {
    setUser(state.states);
  });

  const [show, setShow] = useState(false);
  const [errorData, setErrorData] = useState();
  const [pageLimit, setPageLimit] = useState(2);
  const [activePage, setActivePage] = useState(1);
  const [countPage, setCountPage] = useState("");
  const [search, setSearch] = useState();
  const [user, setUser] = useState([]);
  const [allGetData, setAllGetData] = useState([]);
  useEffect(() => {
    paginationFunction();
  }, [activePage]);

  const [allData, setAllData] = useState({});
  const handleClose = () => setShow(false);

  const onChangeFunction = (e) => {
    setAllData({ ...allData, [e.target.name]: e.target.value });
  };
  const addFunction = () => {
    setShow(true);
    setAllData({});
  };
  const onSubmitFunction = async (e) => {
    e.preventDefault();
    if (validationFunction()) {
      const res = await addNewCourse(allData);
      console.log(res, "popopooppp");
      console.log(allData, "LPLPLPLP");
      handleClose();
      getAllData();
      // handelePagination();
      paginationFunction();
    }
  };
  const getAllData = async () => {
    const res = await getCourseData();
    if (res && res.status === 200) {
      setAllGetData(res.data.data);
    }
    //console.log(res, "poppppppppp");
  };
  const deleteFunction = async (id) => {
    const res = await deleteCourseData(id);
    console.log(res, "lllllllllp");
    getAllData();
  };
  const searchFunction = async (e) => {
    let text = e.target.value;
    const res = await searchUser(activePage, pageLimit, text);
    console.log(res.data.data, "pppp");
    setAllGetData(res.data.data);
    if (text == "") {
      //getAllData();
      paginationFunction();
    }
  };
  const validationFunction = () => {
    let formData = true;
    switch (true) {
      case !allData.state:
        setErrorData({ state: "State  is required!" });
        formData = false;
        break;
      case !allData.title:
        setErrorData({ title: "Title is required!" });
        formData = false;
        break;
      case !allData.orderNo:
        setErrorData({ orderNo: "orderNo is required" });
        formData = false;
        break;

      default:
        formData = true;
    }
    return formData;
  };
  const handelePagination = (pageNumber) => {
    // console.log(pageNumber, "ppppppkkkk");
    setActivePage(pageNumber);
  };
  const paginationFunction = async () => {
    const res = await getUser(activePage, pageLimit);
    getAllData(res.data.data);
    setCountPage(res.data.countPage);
  };

  return (
    <div>
      <Layout>
        <div className="warmup-content-wrappper">
          <div className="plan-wrapper">
            <div className="plan-table-heading">
              <h3> Course Module List </h3>
              <div className="search-bar">
                <input
                  name="search"
                  type="text"
                  className="form-control"
                  placeholder="Search CourseUnit"
                  aria-label="search"
                  aria-describedby="search"
                  value={search}
                  onChange={searchFunction}
                />
                <i className="fa fa-search" aria-hidden="true"></i>
              </div>
              <div className="questionTitlebtn">
                <AddModulePage
                  onChangeFunction={onChangeFunction}
                  onSubmitFunction={onSubmitFunction}
                  allData={allData}
                  handleClose={handleClose}
                  // handleShow={handleShow}
                  addFunction={addFunction}
                  show={show}
                  errorData={errorData}
                  user={user}
                />
              </div>
            </div>

            <div className="plan-table">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Course State</th>
                    <th>course Title</th>
                    <th> OrderNo</th>
                    <th> Action</th>
                  </tr>
                </thead>
                {allGetData &&
                  allGetData.map((val) => (
                    <tbody>
                      <tr>
                        <td>{val.state}</td>
                        <td>{val.title}</td>
                        <td>{val.orderNo}</td>
                        <td>
                          <Button
                            type="submit"
                            style={{ color: "red" }}
                            onClick={() => deleteFunction(val._id)}
                          >
                            Delete
                          </Button>
                          {/* <Button variant="primary" onClick={editFunction}>
                          Edit
                        </Button> */}
                          {/* <Button style={{ color: "green" }} onClick={editFunction}>Edit</Button> */}
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </Table>
              <Pagination
                className="text-left"
                itemClass="page-item"
                linkClass="page-link"
                prevPageText="Previous"
                nextPageText="Next"
                value={activePage}
                itemsCountPerPage={pageLimit}
                totalItemsCount={countPage}
                onChange={handelePagination}
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default IndexPage;
