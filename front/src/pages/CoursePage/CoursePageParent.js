import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CoursePage from "./CoursePage";
import {
  addCourseApi,
  getCourseApi,
  getEditCourseApi,
  deleteCourseApi,
  SearchCourseApi,
  getUser,
} from "../../services/copyCourse";
import StatesJson from "../../config/state.json";
import CourseTable from "./CourseTable";
import Layout from "../../layout/Layout";
import ReactPagination from "./ReactPagination";
import SearchCoursePage from "./SearchCoursePage";

const CoursePageParent = () => {
  useEffect(() => {
    getAllData();
  }, []);
  console.log(StatesJson, "LLLLLLLLLLLLL");

  const [activePage, setActivePage] = useState(1);
  const [searchInp, setSearchInp] = useState("");
  const [pageLimit, setPageLimit] = useState(5);
  const [totalCount, setTotalCount] = useState("");
  const [userData, setUserData] = useState([]);
  const [show, setShow] = useState(false);
  // const [id, setId] = useState();
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState();
  const [courseState, setCourseState] = useState([]);
  console.log(courseState, "iiiiiiiiiiiiii");
  const [user, setUser] = useState({
    state: "",
    title: "",
  });
  useEffect(() => {
    setCourseState(StatesJson.states);
  }, []);
  useEffect(() => {
    getUsersData();
  }, [activePage]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = () => {
    handleShow();
    setUser({});
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  //console.log(user, "ppppppppppppppp");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
      const res = await addCourseApi(user);

      console.log(res, "llllllllllll");
      getAllData();
      handleClose();
      getUsersData();
    }
  };
  const isValid = () => {
    let formData = true;
    switch (true) {
      case !user.state:
        setError({ state: "State field is required!" });
        formData = false;
        break;
      case !user.title:
        setError({ title: "Title field is required!" });
        formData = false;
        break;

      default:
        formData = true;
    }
    return formData;
  };

  const getAllData = async () => {
    const res = await getCourseApi();
    console.log(res, "dddddddddddd");
    if (res && res.status === 200) {
      setUserData(res.data.data);
    }
  };

  const handleEdit = (data) => {
    handleShow();
    setEdit(true);
    setUser(data);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    setEdit(true);
    console.log(user._id, "fffffffffffffff");
    // if (isValid()) {
    //   const res = await getEditCourseApi(user._id, user);
    //   console.log(res, "fffffffff");
    //   setShow(false);
    //   getUsersData();
    //   // setUser({});
    // }

    if (isValid()) {
      const res = await getEditCourseApi(user._id, user);
      if (res) {
        toast.success(res.data.message);
        getUsersData();
        setShow(false);
      } else {
        toast.error(res.data.message);
      }
    }
  };

  const handledelete = async (id) => {
    console.log(id, "ppp");
    const res = await deleteCourseApi(id);
    console.log(res, "pppppppppppplllllllllll");
    // getAllData();
  };

  const handleSearch = async (e) => {
    setSearchInp(e.target.value);
    const text = e.target.value;
    const response = await SearchCourseApi(activePage, pageLimit, text);
    console.log(response, "lllllllllllll");
    setUserData(response.data.data);
  };

  const getUsersData = async () => {
    const res = await getUser(activePage, pageLimit);
    console.log(res.totalCount, "kkkkkkkkkkklllll");
    setUserData(res.data.data);
    setTotalCount(res.data.totalCount);
  };
  const handlePageChange = (pageNumber) => {
    console.log(pageNumber, "p");
    setActivePage(pageNumber);
  };

  return (
    <>
      <Layout>
        <CoursePage
          handleClose={handleClose}
          handleShow={handleShow}
          show={show}
          handleChange={handleChange}
          user={user}
          edit={edit}
          error={error}
          handleSubmit={handleSubmit}
          courseState={courseState}
          handleUpdate={handleUpdate}
        />
        <SearchCoursePage handleSearch={handleSearch} searchInp={searchInp} />
        <CourseTable
          userData={userData}
          handleEdit={handleEdit}
          handleAdd={handleAdd}
          handledelete={handledelete}
        />
        <ReactPagination
          activePage={activePage}
          pageLimit={pageLimit}
          totalCount={totalCount}
          handlePageChange={handlePageChange}
        />
      </Layout>
    </>
  );
};

export default CoursePageParent;
