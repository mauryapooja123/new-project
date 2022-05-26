import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
// import "./AddPopup.css";
import * as galaryService from "../../services/galaryService";
import _ from "lodash";
import PaginationReuse from "../Pagination/PaginationReuse";

import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";
import { apiBaseUrl } from "../../contants/constants";
import ImageClickPopup from "./imageClickPopup";
export const SelectGalleryPopup = (props) => {
  const MAX_BOARD_SIZE = 12;
  const [image, setImage] = useState(null);

  const [show, setShow] = useState(false);
  const [pageAfterSearch, setPageAfterSearch] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState([]);
  const [galaryList, setGalaryList] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalData, setTotalData] = useState();
  const [pageLimit, setPageLimit] = useState(20);
  useEffect(() => {
    getImageList(pageNumber);
  }, []);
  const getImageList = async (pageNumber) => {
    const response = await galaryService.getImage(pageNumber, pageLimit);
    setGalaryList(response.data.data);
    setTotalData(response.data.totalCount);
  };
  const formValidation = () => {
    // const { image } = image;
    let formErrors = {};
    let isValid = true;
    if (!image) {
      isValid = false;
      formErrors["image"] = "Please select Image";
    }
    setError(formErrors);
    return isValid;
  };

  const clickHandleImage = async (e) => {
    if (formValidation()) {
      try {
        const formData = new FormData();
        formData.append("image", image);
        const response = await galaryService.addImage(formData);
        createNotification("success", response.data.message);
        props.getImageList();
        props.modalStatus();
      } catch (err) {}
      setShow(false);
    }
  };

  const handleShow = () => setShow(true);
  const handleCloseOnCloseButton = () => {
    setShow(false);
  };

  const handlePageChange = (pagenumber) => {
    if (pageAfterSearch) {
      searchPlanForPagination(pagenumber);
      setActivePage(pagenumber);
    } else {
      setActivePage(pagenumber);
      getImageList(pagenumber);
    }
  };

  const getModelOpenIsTrue = (data) => {
    setSelectedItem(data);
    setModalIsOpen(true);
  };
  return (
    <div>
      <Button variant="info" onClick={handleShow}>
        Select Gallery
      </Button>

      <Modal
        className="gallery-popup"
        show={show}
        onHide={handleCloseOnCloseButton}
      >
        <Modal.Header>
          <Modal.Title>Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="popup-form-box">
            {galaryList &&
              galaryList.length > 0 &&
              galaryList.map((items, index) => (
                <div className="gallery-image-list">
                  <img
                    key={items._id}
                    src={`${apiBaseUrl}/uploads/Galary/${items && items.image}`}
                    onClick={() => {
                      getModelOpenIsTrue(items);
                    }}
                    alt="not showing"
                  />
                </div>
              ))}
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
        </Modal.Body>
        <ImageClickPopup
          showModal={modalIsOpen}
          toggleModal={setModalIsOpen}
          selectedItem={selectedItem}
        ></ImageClickPopup>
        <Modal.Footer>
          <Button variant="info" onClick={handleCloseOnCloseButton}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
