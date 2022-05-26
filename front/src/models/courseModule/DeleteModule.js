import { Modal, Button } from "react-bootstrap";
// import "./EditPopup.css";
import _ from "lodash";
import * as courseModuleServices from "../../services/courseModuleService";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";

const DeleteModule = (props) => {
  const { getCourseList, pageNumber, deleteItem } = props;
  const handleClose = () => {
    props.toggleModal(false);
  };

  const deleteModule = async (e, id) => {
    try {
      const response = await courseModuleServices.deleteCourseModule(id);
      if (response.status == 200) {
        props.getModuleList(pageNumber);
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
              onClick={(e) => deleteModule(e, deleteItem._id)}
            >
              Delete
            </Button>
            <Button variant="info" onClick={handleClose}>
              Cancle
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default DeleteModule;
