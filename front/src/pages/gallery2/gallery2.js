import React, { useEffect, useState } from "react";
import { Loader } from "../../Loader/Loader";
import "react-toastify/dist/ReactToastify.css";
import PaginationReuse from "../Pagination/PaginationReuse";
import { AddImage } from "../../models/gallery2/addImage";
import * as galaryService from "../../services/galaryService";
import Layout from "../../layout/Layout";
import { apiBaseUrl } from "../../contants/constants";
import Gallery from "react-grid-gallery";

const Galary2 = (props) => {
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [pageAfterSearch, setPageAfterSearch] = useState(false);
  const [test, setTest] = useState("rahul");
  const [selectedItem, setSelectedItem] = useState();
  const [loading, setLoading] = useState(false);
  const [galaryList, setGalaryList] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [totalData, setTotalData] = useState();
  const [pageLimit, setPageLimit] = useState(20);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    getImageList(pageNumber);
  }, []);

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

  const modalStatus = () => {
    getImageList(pageNumber);
  };
  const IMAGES =
    galaryList &&
    galaryList.length > 0 &&
    galaryList.map((items, index) => {
      return {
        src: `${apiBaseUrl}/uploads/Galary/${items && items.image}`,
        thumbnail: `${apiBaseUrl}/uploads/Galary/${items && items.image}`,
      };
    });
  return (
    <div>
      <Layout>
        <React.Fragment>
          <div className="warmup-content-wrappper">
            <div className="plan-wrapper">
              <div className="plan-table-heading">
                <h3>Gallery</h3>
                <div className="addpopup-btn">
                  <AddImage
                    showModal={modelIsOpen}
                    toggleModal={setModelIsOpen}
                    selectedItem={selectedItem}
                    modalStatus={modalStatus}
                    getImageList={getImageList}
                    test={test}
                  ></AddImage>
                </div>
              </div>
              <div>
                {galaryList.length > 0 ? (
                  <Gallery images={IMAGES} showThumbnails={false} />
                ) : (
                  ""
                )}
              </div>

              <div className="pagination-box">
                {totalData > 20 ? (
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

export default Galary2;
