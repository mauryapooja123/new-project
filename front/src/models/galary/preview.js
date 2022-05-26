import { React, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { apiBaseUrl } from "../../contants/constants";

const Preview = (props) => {
  //   console.log(props, "propsss of preview");
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  //   console.log(image, "imageeeeeee");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (props) {
      //   setTitle(props.title ? props.title : "");
      setImage(props.image.image ? props.image.image : "");
    }
  });
  return (
    <>
      <button
        className="copy-preview btn"
        variant="primary"
        onClick={handleShow}
      >
        Preview
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="col-6">
            <img
              className="imageGalry"
              src={`${apiBaseUrl}/uploads/Galary/${image}`}
              style={{ width: "450px", height: "200px" }}
              alt="not showing"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Preview;
