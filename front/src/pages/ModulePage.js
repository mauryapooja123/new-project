import Layout from "../layout/Layout";
import { createNotification } from "../helper/notification";
import NewAddModule from "../models/courseModulePage/NewAddModule";
import { Button, Table } from "react-bootstrap";
import {
  getCourseData,
  addNewCourse,
  deleteCourseData,
  EditCourseData,
  // getCourseModule,
  // getCourse,
  searchUser,
  getUser,
} from "../services/CopyCourseModule";
import { useEffect, useState } from "react";
import state from "../config/state.json";
import ReactPaginationPage from "../models/courseModulePage/ReactPagination";
import Pagination from "react-js-pagination";

const ModulePage = () => {
  useEffect(() => {
    getData();
  }, []);
  console.log(state, "lllllllllll");
  const [json, setJson] = useState([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({
    state: "",
    title: "",
    orderNo: "",
  });
  const [userData, setUserData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pageLimit, setPageLimit] = useState(4);
  const [totalCount, setTotalCount] = useState("");
  const [searchData, setSearchData] = useState();
  const [error, setError] = useState();
  const [id, setId] = useState("");

  useEffect(() => {
    setJson(state.states);
  }, []);

  useEffect(() => {
    handlePagination();
  }, [activePage]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAdd = () => {
    setEdit(false);
    setShow(true);
    setUser({});
  };

  console.log(user, "klmnop");
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValidation()) {
      // try {
      const res = await addNewCourse(user);

      console.log(res, "ppppppppp");
      getData();
      setUser({});
      handleClose();
      handlePagination();
      // } catch (err) {
      //   createNotification("success", response.data.message);
      // }
    }
  };

  const getData = async () => {
    const res = await getCourseData();
    //console.log(res, "dddddddddddd");
    if (res && res.status === 200) {
      setUserData(res.data.data);
    }
  };

  //console.log(user, "jkjkj");

  const handleChangePagination = (pageNumber) => {
    // console.log(pageNumber, "pppp");
    setActivePage(pageNumber);
  };

  const handlePagination = async () => {
    const res = await getUser(activePage, pageLimit);
    console.log(res.totalCount, "kkkkkkkkkkklllll");
    setUserData(res.data.data);
    setTotalCount(res.data.totalCount);
  };

  const handleEdit = (data) => {
    console.log(data, "plo");
    const { title, state, orderNo } = data;
    handleShow();
    setEdit(true);
    setId(data._id);
    setUser({ ...user, title, state, orderNo });
  };

  const handleUpdate = async (e) => {
    console.log(user);
    e.preventDefault();
    if (formValidation()) {
      const res = await EditCourseData(id, user);
      // console.log(res, "pppppppppp");
      handleClose();
      getData();
      handlePagination();
    }
  };

  const handleSearch = async (e) => {
    console.log(e.target.value);
    let text = e.target.value;
    const response = await searchUser(activePage, pageLimit, text);
    console.log(response.data);
    setUserData(response.data.data);
    if (text == "") {
      handleChangePagination();
    }
  };

  const handledelete = async (id) => {
    console.log(id, "pppppp");
    const response = await deleteCourseData(id);

    console.log(response, "rrrrr");
    getData();
    handlePagination();
  };

  //console.log(userData, "popo");

  const formValidation = () => {
    let formData = true;
    switch (true) {
      case !user.state:
        setError({ state: "State  is required!" });
        formData = false;
        break;
      case !user.title:
        setError({ title: "Title  is required!" });
        formData = false;
        break;
      case !user.orderNo:
        setError({ orderNo: " orderNo  is required!" });
        formData = false;
        break;

      default:
        formData = true;
    }
    return formData;
  };

  return (
    <>
      <Layout>
        <input
          type="text"
          placeholder="Search..."
          value={searchData}
          onChange={handleSearch}
        />

        <NewAddModule
          user={user}
          handleAdd={handleAdd}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleClose={handleClose}
          handleShow={handleShow}
          show={show}
          json={json}
          edit={edit}
          error={error}
          handleUpdate={handleUpdate}
        />
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>State</th>
              <th>Course Title</th>
              {/* <th>Module Title</th> */}
              <th>OrderNo</th>
            </tr>
          </thead>
          {userData &&
            userData.map((data, i) => (
              <tbody key={i}>
                <tr>
                  <td>{data.state}</td>
                  <td>{data.title}</td>
                  {/* <td>{item.courseId}</td> */}
                  <td>{data.orderNo}</td>
                  <td>
                    <Button
                      type="submit"
                      onClick={() => handledelete(data._id)}
                    >
                      Delete
                    </Button>
                    <Button type="submit" onClick={() => handleEdit(data)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>

        <ReactPaginationPage
          pageLimit={pageLimit}
          totalCount={totalCount}
          activePage={activePage}
          handleChangePagination={handleChangePagination}
        />
      </Layout>
    </>
  );
};
export default ModulePage;
