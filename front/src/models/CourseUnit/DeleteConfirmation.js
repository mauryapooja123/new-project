import { Modal, Button } from "react-bootstrap";
import _ from "lodash";
import * as courseUnitService from "../../services/courseUnitService";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";

const DeleteConfirmation = (props) => {
  const { getCourseList, pageNumber, deleteItem } = props;
  const handleClose = () => {
    props.toggleModal(false);
  };
  const deleteCourse = async (e, id) => {
    try {
      const response = await courseUnitService.deleteCourseUnit(id);
      if (response.status == 200) {
        props.getCourseUnitlist(pageNumber);
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
            <h4>Warning!</h4>
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
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default DeleteConfirmation;
