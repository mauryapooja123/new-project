import { Modal, Button } from "react-bootstrap";
import "./EditPopup.css";
import _ from "lodash";
import * as courseServices from "../../src/services/courseServices";
import { createNotification } from "../../src/helper/notification";

const DeletePop = (props) => {
  const { getCourseList, pageNumber, deleteItem } = props;

  const handleClose = () => {
    props.toggleModal(false);
  };

  const deleteCourse = async (e, id) => {
    try {
      const response = await courseServices.deleteCourse(id);
      if (response.status == 200) {
        createNotification("success", response.data.message);
      }
      props.toggleModal(false);
      getCourseList(pageNumber);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <Modal show={props.showModal} onHide={handleClose}>
        <div className="login1">
          <Modal.Header>
            <Modal.Title>{props.deleteStatus}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>Warning!</h2>
            {props.popupMessage}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={(e) => deleteCourse(e, deleteItem._id)}
            >
              Delete
            </Button>
            <Button variant="info" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default DeletePop;
