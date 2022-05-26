// import { Modal, Button } from "react-bootstrap";
// import { useState } from "react";
// // import "./AddPopup.css";
// import * as galaryService from "../../services/galaryService";
// import _ from "lodash";
// import { createNotification } from "../../helper/notification";
// import { ToastContainer } from "react-toastify";

// export const AddImagePopup = (props) => {
//   const MAX_BOARD_SIZE = 12;
//   const [image, setImage] = useState(null);
//   const [widthImage, setWidthImage] = useState();
//   const [heightImage, setHeightImage] = useState();
//   const [show, setShow] = useState(false);

//   const [error, setError] = useState([]);

//   const formValidation = () => {
//     // const { image } = image;
//     let formErrors = {};
//     let isValid = true;
//     if (!image) {
//       isValid = false;
//       formErrors["image"] = "Please select Image";
//     }
//     setError(formErrors);
//     return isValid;
//   };

//   const clickHandleImage = async (e) => {
//     if (formValidation()) {
//       try {
//         debugger;
//         const formData = new FormData();
//         formData.append("image", image);
//         formData.append("widthImage", widthImage);
//         formData.append("heightImage", heightImage);

//         const response = await galaryService.addImage(formData);
//         console.log(response, "response");
//         createNotification("success", response.data.message);
//         props.getImageList();
//         props.modalStatus();
//       } catch (err) {}
//       setShow(false);
//     }
//   };

//   const handleShow = () => setShow(true);
//   const handleCloseOnCloseButton = () => {
//     setShow(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAddCourses({
//       ...addCourses,
//       [name]: value,
//     });
//   };
//   const imageChange = (e) => {
//     setImage(e.target.files[0]);
//     var file = e.target.files[0];
//     var reader = new FileReader();
//     reader.onload = function (event) {
//       // The file's text will be printed here
//     };

//     reader.readAsText(file);
//     var file, img;
//     if (e.target.files[0]) {
//       img = new Image();
//       var _URL = window.URL || window.webkitURL;
//       var objectUrl = _URL.createObjectURL(e.target.files[0]);
//       // setImage(_URL.createObjectURL(e.target.files[0]));

//       img.onload = function () {
//         setWidthImage(img.width);
//         setHeightImage(img.height);
//         _URL.revokeObjectURL(objectUrl);
//       };
//       img.src = objectUrl;
//     }
//   };

//   return (
//     <div>
//       <Button variant="info" onClick={handleShow}>
//         Add Gallery
//       </Button>

//       <Modal show={show} onHide={handleCloseOnCloseButton}>
//         <Modal.Header>
//           <Modal.Title>Add Gallery</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="popup-form-box">
//             <div className="form-filed_course">
//               <label>Image</label>
//               <input
//                 className="input1"
//                 type="file"
//                 name="image"
//                 accept=".jpg,.jpeg,.png"
//                 placeholder="Select File..."
//                 // value={blogImg}
//                 // onChange={(e) => {
//                 //   setImage(e.target.files[0]);
//                 // }}
//                 onChange={imageChange}
//               />
//               <span className="form-error">{error.image}</span>
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseOnCloseButton}>
//             Close
//           </Button>
//           <Button type="submit" variant="primary" onClick={clickHandleImage}>
//             Add
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       <ToastContainer autoClose={3000} />
//     </div>
//   );
// };

import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
// import "./AddPopup.css";
import * as galaryService from "../../services/galaryService";
import _ from "lodash";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";

export const AddImagePopup = (props) => {
  const MAX_BOARD_SIZE = 12;
  const [image, setImage] = useState(null);

  const [show, setShow] = useState(false);

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
        const formData = new FormData();
        formData.append("image", image);
        const response = await galaryService.createSimpleImage(formData);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddCourses({
      ...addCourses,
      [name]: value,
    });
  };

  return (
    <div>
      <Button variant="info" onClick={handleShow}>
        Add Gallery
      </Button>

      <Modal show={show} onHide={handleCloseOnCloseButton}>
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
                accept=".jpg,.jpeg,.png"
                placeholder="Select File..."
                // value={blogImg}
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <span className="form-error">{error.image}</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOnCloseButton}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={clickHandleImage}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} />
    </div>
  );
};
