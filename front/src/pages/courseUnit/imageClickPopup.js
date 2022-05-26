import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
// import "./EditPopup.css";
// import * as courseServices from "../services/courseServices";
import _ from "lodash";
import { apiBaseUrl } from "../../contants/constants";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";

const ImageClickPopup = (props) => {
  const [id, setId] = useState("");
  const [url, setUrl] = useState("");
  const [imgtag, setImgTag] = useState("");

  const handleClose = (id) => {
    props.toggleModal(false);
  };

  useEffect(() => {
    if (props.selectedItem) {
      setId(props.selectedItem._id);
      setUrl(
        `${apiBaseUrl}/uploads/Galary/${
          props.selectedItem && props.selectedItem.image
        }`
      );
      let urlImage = `<img src=${'"' + apiBaseUrl}/uploads/Galary/${
        props.selectedItem && props.selectedItem.image + '"'
      }/>`;
      setImgTag(urlImage);
    }
  }, [props.selectedItem]);
  const ShowModal = () => {
    props.showModal(false);
  };
  return (
    <div>
      <Modal
        className="image-input-popup"
        show={props.showModal}
        onHide={handleClose}
      >
        <div>
          <Modal.Body>
            <div className="image-input-wrap">
              <input
                type="text"
                value={`${apiBaseUrl}/uploads/Galary/${
                  props.selectedItem && props.selectedItem.image
                }`}
              />
              <CopyToClipboard
                className="success-popup-notification"
                text={`${apiBaseUrl}/uploads/Galary/${
                  props.selectedItem && props.selectedItem.image
                }`}
                onCopy={() =>
                  createNotification("success", "Url copied successfully")
                }
              >
                <Button className="copy-url btn">Copy Url</Button>
              </CopyToClipboard>
            </div>
            <div className="image-input-wrap">
              <input type="text" value={imgtag} />
              <CopyToClipboard
                text={imgtag}
                onCopy={() =>
                  createNotification(
                    "success",
                    "Url with image tag copied successfully"
                  )
                }
              >
                <Button className="copy-url btn">Copy Image tag</Button>
              </CopyToClipboard>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default ImageClickPopup;
