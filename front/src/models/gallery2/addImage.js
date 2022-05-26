import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import * as galaryService from "../../services/galaryService";
import _ from "lodash";
import { createNotification } from "../../helper/notification";

import { ToastContainer } from "react-toastify";
import { Resizable } from "react-resizable";
import Resizer from "react-image-file-resizer";

export const AddImage = (props) => {
  const MAX_BOARD_SIZE = 12;
  const [image, setImage] = useState("");
  const [original, setOriginal] = useState("");
  const [show, setShow] = useState(false);
  const [widthimage, setwidthimage] = useState("");
  const [heightimage, setHeightimage] = useState("");
  const [newImage, setNewImage] = useState("");
  const [error, setError] = useState([]);

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
        // const formData = new FormData();
        // formData.append("image", newImage.newImage);
        // formData.append("widthimage", widthimage);
        // formData.append("heightimage", heightimage);
        // console.log(formData, "formdata");
        const formdata = {
          image: newImage.newImage,
          widthimage: widthimage,
          heightimage: heightimage,
        };
        const response = await galaryService.addImage(formdata);
        createNotification("success", response.data.message);
        setOriginal("");
        setNewImage("");
        setwidthimage("");
        setHeightimage("");
        props.getImageList();
        props.modalStatus();
      } catch (err) {}
      setShow(false);
    }
  };

  const handleShow = () => setShow(true);
  const handleCloseOnCloseButton = () => {
    setOriginal("");
    setNewImage("");
    setwidthimage("");
    setHeightimage("");
    setShow(false);
  };

  const imageChange = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      // The file's text will be printed here
    };
    reader.readAsText(file);
    var file, img;
    if (e.target.files[0]) {
      img = new Image();
      var _URL = window.URL || window.webkitURL;
      var objectUrl = _URL.createObjectURL(e.target.files[0]);
      // setOriginal(_URL.createObjectURL(e.target.files[0]));
      img.onload = function () {
        setwidthimage(img.width);
        setHeightimage(img.height);
        setOriginal(_URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);

        // setImage(img);
        _URL.revokeObjectURL(objectUrl);
      };
      img.src = objectUrl;
    }
  };

  const fileChangedHandler = (e) => {
    if (image) {
      try {
        Resizer.imageFileResizer(
          image,
          widthimage,
          heightimage,
          "JPEG",
          100,
          0,
          (uri) => {
            setNewImage({ newImage: uri });
          },
          "base64",
          widthimage,
          heightimage
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      <Button variant="info" onClick={handleShow}>
        Add Gallery
      </Button>
      <Modal
        show={show}
        onHide={handleCloseOnCloseButton}
        className="add-gallery-popup"
      >
        <Modal.Header>
          <Modal.Title>Add Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="popup-form-box">
            <div className="form-filed_course">
              <label>Image</label>
              <input
                className="input1"
                type="file"
                name="image"
                placeholder="Select File..."
                // onChange={(e) => {
                //   imageChange(e);
                // }}
                onChange={imageChange}
              />

              <span className="form-error">{error.image}</span>

              {original ? (
                <>
                  <div className="add-gallery-image">
                    <img
                      src={original}
                      alt="not fount"
                      // style={{ width: "450px" }}
                    ></img>
                  </div>
                  <div className="addformgrprow">
                    <div className="addgalleryformgrp">
                      <label>Width</label>
                      <input
                        type="text"
                        name="widthimage"
                        value={widthimage}
                        onChange={(e) => setwidthimage(e.target.value)}
                        placeholder="width"
                      />
                    </div>
                    <div className="addgalleryformgrp">
                      <label>Height</label>
                      <input
                        type="text"
                        name="heightimage"
                        value={heightimage}
                        onChange={(e) => setHeightimage(e.target.value)}
                        placeholder="height"
                      />
                    </div>
                    <Button onClick={fileChangedHandler}>Resize</Button>
                  </div>
                </>
              ) : null}
            </div>
            {newImage.newImage ? (
              <div className="add-gallery-image add-gallery-resizeimage">
                <img src={newImage.newImage} alt="notImage" />
              </div>
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOnCloseButton}>
            Close
          </Button>
          {newImage.newImage ? (
            <Button type="submit" variant="primary" onClick={clickHandleImage}>
              Add
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} />
    </div>
  );
};
