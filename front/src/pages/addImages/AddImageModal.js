import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import * as ImageServices from "../../services/imageServices";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const AddImageModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  let subtitle;
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleMultipleImages = async (e) => {
    let files = e.target.files;
    console.log(files, "files");
    const formData = new FormData();
    formData.append("img", files[0]);
    const response = await ImageServices.postImage(formData);
    console.log(response, "asdf");
  };
  const handleSubmit = async () => {
    // console.log(data);
    // if (data && data.length > 0) {
    // }
  };
  return (
    <>
      <Button type="button" onClick={openModal}>
        Add Image
      </Button>
      <div className="form-group my-3 mx-3"></div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h5 ref={(_subtitle) => (subtitle = _subtitle)}>Add Images</h5>
        <label className="mdc-text-field mdc-text-field--filled">
          <span className="mdc-text-field__ripple"></span>
          <span className="mdc-floating-label" id="my-label-id">
            Images
          </span>
          <input
            className="mdc-text-field__input"
            type="file"
            name="images"
            aria-labelledby="my-label-id"
            onChange={handleMultipleImages}
            multiple
          />
          <span className="mdc-line-ripple"></span>
        </label>
        <br />
        <button onClick={closeModal} style={{ marginRight: "10px" }}>
          close
        </button>
        <button onClick={handleSubmit}>Add</button>
      </Modal>
    </>
  );
};

export default AddImageModal;
