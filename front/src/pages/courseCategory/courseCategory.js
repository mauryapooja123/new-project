import React, { useEffect, useState } from "react";
// import { Loader } from "../../Loader/Loader";
import { Button, Table } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import PaginationReuse from "../Pagination/PaginationReuse";
import { AddCourseCategory } from "../../models/courseCategory/AddCategory";
import EditCourseCategory from "../../models/courseCategory/EditCategory";
import * as courseCategoryService from "../../services/categoryService";
import Layout from "../../layout/Layout";
import DeleteCourseCategory from "../../models/courseCategory/DeleteCategory";

const CourseCategory = (props) => {
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [modelIsOpendelete, setModelIsOpendelete] = useState(false);
  const [pageAfterSearch, setPageAfterSearch] = useState(false);
  const [test, setTest] = useState("rahul");
  const [selectedItem, setSelectedItem] = useState();
  const [loading, setLoading] = useState(false);
  const [moduleList, setModuleList] = useState([]);
  const [deleteItem, setDelteItem] = useState();

  const [pageNumber, setPageNumber] = useState(1);
  const [totalData, setTotalData] = useState();
  const [pageLimit, setPageLimit] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [searchValue, setSearchValue] = useState();
  const [popupMessage, setPopupMessage] = useState();
  const [deleteStatus, setDeleteStatus] = useState();

  const searchCategory = async (e) => {
    try {
      if (!e.target.value) {
        getCategoryList(pageNumber);
        setPageAfterSearch(false);
      } else {
        setLoading(true);
        setSearchValue(e.target.value);
        const response = await courseCategoryService.getSearchCourseCategory(
          pageNumber,
          pageLimit,
          e.target.value
        );
        setModuleList(response.data.data);
        setTotalData(response.data.totalCount);
        setPageAfterSearch(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchCategoryPagination = async (pagenumber) => {
    try {
      if (!searchValue) {
        getCategoryList(pagenumber);
        setPageAfterSearch(false);
      } else {
        const response = await courseCategoryService.getSearchCourseCategory(
          pagenumber,
          pageLimit,
          searchValue
        );
        setModuleList(response.data.data);
        setTotalData(response.data.totalCount);
        setPageAfterSearch(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePageChange = (pagenumber) => {
    if (pageAfterSearch) {
      searchCategoryPagination(pagenumber);
      setActivePage(pagenumber);
    } else {
      setActivePage(pagenumber);
      getCategoryList(pagenumber);
    }
  };

  const getCategoryList = async (pageNumber) => {
    setLoading(true);
    const response = await courseCategoryService.getCourseCategory(
      pageNumber,
      pageLimit
    );
    setModuleList(response.data.data);
    setTotalData(response.data.totalCount);
    setLoading(false);
  };

  useEffect(() => {
    getCategoryList(pageNumber);
  }, [modelIsOpen]);

  const modalStatus = () => {
    getCategoryList(pageNumber);
  };

  const getModelOpenIsTrue = (data) => {
    setModelIsOpen(true);
    setSelectedItem(data);
  };
  const getDeleteModalPopOpenIsTrue = (items) => {
    setModelIsOpendelete(true);
    setDelteItem(items);
    setDeleteStatus("Delete Category");
    setPopupMessage([<p>Do you Want to Delete Category!!</p>]);
  };

  return (
    <div>
      <Layout>
        <React.Fragment>
          <div className="warmup-content-wrappper">
            <div className="plan-wrapper">
              <div className="plan-table-heading">
                <h3>Category</h3>
                <div className="search-bar">
                  <input
                    name="search"
                    type="text"
                    className="form-control"
                    placeholder="Search Category"
                    aria-label="search"
                    aria-describedby="search"
                    onChange={searchCategory}
                  />
                  <i className="fa fa-search" aria-hidden="true"></i>
                </div>
                <div className="addpopup-btn">
                  <AddCourseCategory
                    showModal={modelIsOpen}
                    toggleModal={setModelIsOpen}
                    selectedItem={selectedItem}
                    modalStatus={modalStatus}
                    test={test}
                  ></AddCourseCategory>
                </div>
              </div>

              <div className="plan-table">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr style={{ height: "30px" }}>
                      <th>Id</th>
                      <th>Name</th>
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
                            <td>{items.name}</td>
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
                        );
                      })}
                  </tbody>
                </Table>
              </div>
              <EditCourseCategory
                showModal={modelIsOpen}
                toggleModal={setModelIsOpen}
                selectedItem={selectedItem}
              ></EditCourseCategory>
              <DeleteCourseCategory
                showModal={modelIsOpendelete}
                toggleModal={setModelIsOpendelete}
                deleteItem={deleteItem}
                getCategoryList={getCategoryList}
                pageNumber={pageNumber}
                popupMessage={popupMessage}
                deleteStatus={deleteStatus}
              ></DeleteCourseCategory>
              <div className="pagination-box">
                {totalData > 5 ? (
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
              </div>
            </div>
          </div>
          {/* {loading ? <Loader /> : null} */}
        </React.Fragment>
      </Layout>
    </div>
  );
};

export default CourseCategory;
