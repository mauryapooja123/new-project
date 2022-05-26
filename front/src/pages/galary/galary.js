import React, { useEffect, useState } from "react";
import { Loader } from "../../Loader/Loader";
import { Button, Table } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import PaginationReuse from "../Pagination/PaginationReuse";
import { AddImagePopup } from "../../models/galary/addImage";
import * as galaryService from "../../services/galaryService";
import Layout from "../../layout/Layout";
import { apiBaseUrl } from "../../contants/constants";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Preview from "../../models/galary/preview";

const Galary = (props) => {
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [pageAfterSearch, setPageAfterSearch] = useState(false);
  const [test, setTest] = useState("rahul");
  const [selectedItem, setSelectedItem] = useState();
  const [loading, setLoading] = useState(false);
  const [galaryList, setGalaryList] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [totalData, setTotalData] = useState();
  const [pageLimit, setPageLimit] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pagenumber) => {
    if (pageAfterSearch) {
      searchPlanForPagination(pagenumber);
      setActivePage(pagenumber);
    } else {
      setActivePage(pagenumber);
      getImageList(pagenumber);
    }
  };

  const getImageList = async (pageNumber) => {
    setLoading(true);
    const response = await galaryService.getImage(pageNumber, pageLimit);
    setGalaryList(response.data.data);
    setTotalData(response.data.totalCount);
    setLoading(false);
  };

  useEffect(() => {
    getImageList(pageNumber);
  }, [modelIsOpen]);

  const modalStatus = () => {
    getCourseList(pageNumber);
  };

  return (
    <div>
      <Layout>
        <React.Fragment>
          <div className="warmup-content-wrappper">
            <div className="plan-wrapper">
              <div className="plan-table-heading">
                <h3>Gallery</h3>

                <div className="addpopup-btn">
                  <AddImagePopup
                    showModal={modelIsOpen}
                    toggleModal={setModelIsOpen}
                    selectedItem={selectedItem}
                    modalStatus={modalStatus}
                    getImageList={getImageList}
                    test={test}
                  ></AddImagePopup>
                </div>
              </div>

              <div className="plan-table gallery-table">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr style={{ height: "30px" }}>
                      <th>Id</th>
                      <th>Image</th>
                      {/* <th>Url</th> */}
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {galaryList &&
                      galaryList.length > 0 &&
                      galaryList.map((items, index) => (
                        <tr key={items._id} style={{ height: "35px" }}>
                          <td>{index + 1}</td>
                          <td>
                            {" "}
                            <img
                              className="imageGalry"
                              src={`${apiBaseUrl}/uploads/Galary/${
                                items && items.image
                              }`}
                              style={{ width: "200px", height: "200px" }}
                              alt="not showing"
                            />
                          </td>
                          {/*  <td>
                            <a
                              href={`${apiBaseUrl}/uploads/Galary/${
                                items && items.image
                              }`}
                              target="_blank"
                            >
                              items.image
                            </a>
                          </td>*/}
                          <td>
                            <CopyToClipboard
                              text={`${apiBaseUrl}/uploads/Galary/${
                                items && items.image
                              }`}
                            >
                              <button className="copy-url btn">Copy Url</button>
                            </CopyToClipboard>
                            <Preview image={items} />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>

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
          {loading ? <Loader /> : null}
        </React.Fragment>
      </Layout>
    </div>
  );
};

export default Galary;
