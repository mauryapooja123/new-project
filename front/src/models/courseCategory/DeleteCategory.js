import { Modal, Button } from "react-bootstrap";
import _ from "lodash";
import * as courseCategoryServices from "../../services/categoryService";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";

const DeleteCategory = (props) => {
  const { getCategoryList, pageNumber, deleteItem } = props;
  const handleClose = () => {
    props.toggleModal(false);
  };
  const deleteCategory = async (e, id) => {
    try {
      const response = await courseCategoryServices.deleteCourseCategory(id);
      if (response.status == 200) {
        props.getCategoryList(pageNumber);
        createNotification("success", response.data.message);
      }
      props.toggleModal(false);
      getCategoryList(pageNumber);
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
              onClick={(e) => deleteCategory(e, deleteItem._id)}
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

export default DeleteCategory;
