import React, { useEffect, useState } from "react";
// import "./Student.css";
import ModalPopup from "../modalPopUp/ModalPopup";
import { Button, Table } from "react-bootstrap";
import { Loader } from "../../Loader/Loader";
import "react-toastify/dist/ReactToastify.css";
import "./user.css";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "../Pagination/PaginationReuse";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import swal from "sweetalert";
import * as usersServices from "../../services/usersServices";

toast.configure();
function GetAllUSers(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [pageLimit, setPageLimit] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [searchValue, setSearchvalue] = useState("");

  const getUsersAll = async (pageNumber) => {
    // console.log("pageNumber", pageNumber, pageLimit);
    const response = await usersServices.getAllusers(pageNumber, pageLimit);
    //console.log(response, "sss");
    if (response && response.status !== 200) {
      return await swal({
        title: "Data fetch failed",
        text: response.message,

        type: "danger",
        timer: 3000,
      });
    } else if (response && response.status === 200) {
      setData(response.data);
      setTotalData(response.totalCount);
    }
  };
  useEffect(async () => {
    getUsersAll(activePage);
  }, [modelIsOpen]);
  const getModelOpenIsTrue = (data) => {
    setModelIsOpen(true);
    setSelectedItem(data);
  };

  const changeStatusFun = async (id, status) => {
    const Response = await usersServices.changeStatus(id, status);
    getUsersAll(activePage);

    // console.log(Response, "1222");

    // if (Response.status == 200) {
    //   const Response = await usersServices.getAllusers(pageNumber, pageLimit);
    //   console.log(Response, "aaaaaaaa");
    //   if (Response.status == 200) {
    // setData(Response.data);
    // } else if (Response.data.status == 401) {
    //   localStorage.clear();
    //   props.navigate("/login");
  };
  // }
  // };
  const searchItem = async (e) => {
    if (!e.target.value) {
      getUsersAll(pageNumber);
      // setData(response.data);
      // setTotalData(response.totalCount);
    } else {
      const response = await usersServices.getAllSearchuser(
        pageNumber,
        pageLimit,
        e.target.value
      );
      if (response.status !== 200) {
        return await swal({
          title: "Data fetch failed",
          text: response.message,

          type: "danger",
          timer: 3000,
        });
      } else {
        setData(response.data);
        setTotalData(response.totalCount);
        setSearchvalue(response.totalCount);
      }
    }

    // setData(response.data);
  };

  const handlePageChange = (pagenumber) => {
    setActivePage(pagenumber);
    getUsersAll(pagenumber);
    searchItem(pagenumber);
  };
  return (
    <div>
      <Layout>
        <div className="warmup-content-wrappper">
          <div className="plan-wrapper">
            <div className="plan-table-heading">
              <h3>All Users</h3>
              <div className="search-bar">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search user ....."
                  aria-label="search"
                  aria-describedby="search"
                  onChange={searchItem}
                />
              </div>
            </div>

            <div className="plan-table">
              <Table striped bordered hover responsive>
                <thead>
                  <tr style={{ height: "30px" }}>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.length > 0 &&
                    data.map((items, index) => (
                      <tr key={items._id} style={{ height: "35px" }}>
                        <td>{index + 1}</td>
                        <td>{items.firstName}</td>
                        <td>{items.lastName}</td>
                        <td>{items.email}</td>
                        <td>
                          <button
                            className={
                              items.status === "Active"
                                ? "user-activation btn bg-primary"
                                : "user-dctivation btn btn-secondary  "
                            }
                            onClick={() =>
                              changeStatusFun(items._id, items.status)
                            }
                          >
                            {items.status}
                          </button>
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

                          <Button disabled variant="danger">
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
            <ModalPopup
              showModal={modelIsOpen}
              toggleModal={setModelIsOpen}
              selectedItem={selectedItem}
              modal={setModelIsOpen}
            ></ModalPopup>

            {loading ? <Loader /> : null}
            <div className="pagination-box">
              <div
                aria-label="Pagination Navigation"
                role="navigation"
                className="ui pagination menu "
              ></div>
              {totalData && totalData >= pageLimit ? (
                <Pagination
                  allDataCount={totalData}
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
}

export default GetAllUSers;
