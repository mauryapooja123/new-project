import React, { useEffect, useState } from "react";
import "./course.css";
import { Loader } from "../../Loader/Loader";
import { Button, Table, ButtonGroup } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import PaginationReuse from "../Pagination/PaginationReuse";
import AddPopup from "../../models/AddPopup";
import EditPopup from "../../models/EditPopup";
import * as courseServices from "../../services/courseServices";
import Layout from "../../layout/Layout";
import DeletePop from "../../models/Deletedpop";
import CourseAddModal from "../../models/CourseAddModal";
import * as copyCourseServices from "../../services/copyCourseServices";
import ReactPagination from "../../react-pagination/ReactPagination";
import CustomPagination from "../../react-pagination/CustomPagination";

const Course = () => {
  return (
    <>
      <Layout>
        <React.Fragment>
          <div className="warmup-content-wrappper">
            <div className="plan-wrapper">
              <div className="plan-table-heading">
                <h3>Course Title List</h3>
                <div className="search-bar">
                  <input
                    name="search"
                    type="text"
                    className="form-control"
                    placeholder="Search Course Title"
                    aria-label="search"
                    aria-describedby="search"
                  />
                  <i className="fa fa-search" aria-hidden="true"></i>
                </div>
                <div className="addpopup-btn">
                  <ButtonGroup className="mb-1">
                    <Button>Add Course Title</Button>
                  </ButtonGroup>
                </div>
              </div>

              <div className="plan-table">
                {/* <Table striped bordered hover responsive>
                  <thead>
                    <tr style={{ height: "30px" }}>
                      <th>Id</th>
                      <th>State</th>
                      <th>Title</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {search
                      ? courses.length > 0 &&
                        courses
                          .filter(
                            (items) =>
                              items.state
                                .toLowerCase()
                                .includes(searchInp.toLowerCase()) ||
                              items.title
                                .toLowerCase()
                                .includes(searchInp.toLowerCase())
                          )
                          .map((item, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{item.state}</td>
                              <td>{item.title}</td>
                              <td>
                                <i
                                  className="fa fa-edit"
                                  style={{
                                    marginLeft: "10px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleEdit(item)}
                                ></i>
                                <i
                                  className="fa fa-trash"
                                  style={{
                                    marginLeft: "10px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleDelete(item._id)}
                                ></i>
                              </td>
                            </tr>
                          ))
                      : courses &&
                        courses.length > 0 &&
                        courses.map((item, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item.state}</td>
                            <td>{item.title}</td>
                            <td>
                              <i
                                className="fa fa-edit"
                                style={{
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleEdit(item)}
                              ></i>
                              <i
                                className="fa fa-trash"
                                style={{
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleDelete(item._id)}
                              ></i>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </Table> */}
              </div>
            </div>
          </div>
        </React.Fragment>
      </Layout>
    </>
  );
};

export default Course;
