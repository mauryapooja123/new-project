import React, { useEffect, useState } from "react";
// import { Loader } from "../../Loader/Loader";
import { Button, Table } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import PaginationReuse from "../Pagination/PaginationReuse";
import * as blogService from "../../services/blogService";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "./deleteBlog";

const Blog = (props) => {
  let navigate = useNavigate();
  const [modelIsOpendelete, setModelIsOpendelete] = useState(false);
  const [pageAfterSearch, setPageAfterSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const [deleteItem, setDelteItem] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalData, setTotalData] = useState();
  const [pageLimit, setPageLimit] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [searchValue, setSearchValue] = useState();
  const [popupMessage, setPopupMessage] = useState();
  const [deleteStatus, setDeleteStatus] = useState();

  const searchBlog = async (e) => {
    try {
      if (!e.target.value) {
        getBlogList(pageNumber);
        setPageAfterSearch(false);
      } else {
        setLoading(true);
        setSearchValue(e.target.value);
        const response = await blogService.getSearchBlog(
          pageNumber,
          pageLimit,
          e.target.value
        );
        setBlogList(response.data.data);
        setTotalData(response.data.totalCount);
        setPageAfterSearch(true);
        setLoading(false);
      }
    } catch (error) {}
  };

  const searchPlanForPagination = async (pagenumber) => {
    try {
      if (!searchValue) {
        getBlogList(pagenumber);
        setPageAfterSearch(false);
      } else {
        const response = await blogService.getSearchBlog(
          pagenumber,
          pageLimit,
          searchValue
        );
        setBlogList(response.data.data);
        setTotalData(response.data.totalCount);
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
      getBlogList(pagenumber);
    }
  };

  const getBlogList = async (pageNumber) => {
    setLoading(true);
    const response = await blogService.getBlog(pageNumber, pageLimit);
    setBlogList(response.data.data);
    setTotalData(response.data.totalCount);
    setLoading(false);
  };

  useEffect(() => {
    getBlogList(pageNumber);
  }, []);

  const getDeleteModalPopOpenIsTrue = (items) => {
    setModelIsOpendelete(true);
    setDelteItem(items);
    setDeleteStatus("Delete Blog");
    setPopupMessage([<p>Do you Want to Delete Blog!!</p>]);
  };

  const onButtonClickHandle = () => {
    navigate("/blog/plus");
  };

  const handleEdit = (items) => {
    navigate(`/blog/editBlog/${items._id}`);
  };
  return (
    <div>
      <Layout>
        <React.Fragment>
          <div className="warmup-content-wrappper">
            <div className="plan-wrapper">
              <div className="plan-table-heading">
                <div className="heading-tilte">
                  <h3>Blog</h3>
                </div>
                <div className="search-bar">
                  <input
                    name="search"
                    type="text"
                    className="form-control"
                    placeholder="Search Blogs"
                    aria-label="search"
                    aria-describedby="search"
                    onChange={searchBlog}
                  />
                  <i className="fa fa-search" aria-hidden="true"></i>
                </div>
                <div className="addpopup-btn">
                  <Button
                    className="addpopup-btn"
                    onClick={onButtonClickHandle}
                  >
                    Add Blog
                  </Button>
                </div>
              </div>

              <div className="plan-table">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr style={{ height: "30px" }}>
                      <th>Id</th>
                      <th>Category</th>
                      <th>Title</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {blogList &&
                      blogList.length > 0 &&
                      blogList.map((items, index) => (
                        <tr key={items._id} style={{ height: "35px" }}>
                          <td>{index + 1}</td>
                          <td>{items.categoryId && items.categoryId.name}</td>
                          <td>{items.title}</td>
                          <td>
                            <Button
                              variant="info"
                              onClick={() => handleEdit(items)}
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

              <DeleteConfirmation
                showModal={modelIsOpendelete}
                toggleModal={setModelIsOpendelete}
                deleteItem={deleteItem}
                getBlogList={getBlogList}
                pageNumber={pageNumber}
                popupMessage={popupMessage}
                deleteStatus={deleteStatus}
              ></DeleteConfirmation>
              <div className="pagination-box">
                {totalData > 3 ? (
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

export default Blog;
