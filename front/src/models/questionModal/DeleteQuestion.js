import { Modal, Button } from "react-bootstrap";
// import "./EditPopup.css";
import _ from "lodash";
import * as courseQuestionService from "../../services/questionService";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";

const DeleteQuestion = (props) => {
  const { getCourseUnitlist, pageNumber, deleteItem } = props;
  const handleClose = () => {
    props.toggleModal(false);
  };

  const deleteQuestion = async (e, id) => {
    try {
      const response = await courseQuestionService.deleteQuestions(id);
      if (response.status == 200) {
        createNotification("success", response.data.message);
      }
      props.toggleModal(false);
      getCourseUnitlist(pageNumber);
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
            <Button variant="info" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={(e) => deleteQuestion(e, deleteItem._id)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default DeleteQuestion;
