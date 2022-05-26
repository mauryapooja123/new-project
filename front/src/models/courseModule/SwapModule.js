import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import * as courseModuleService from "../../services/courseModuleService";
import _ from "lodash";

const SwapCourseModule = (props) => {
  const [fromOrderNo, setFromOrderNo] = useState("");
  const [toOrderNo, setToOrderNo] = useState();
  const [orderOptions, setOrderOptions] = useState([]);
  const [error, setError] = useState([]);
  const [id, setId] = useState("");

  const handleClose = (id) => {
    props.toggleModal(false);
  };

  useEffect(() => {
    if (props.swapModule) {
      setFromOrderNo(props.swapModule.orderNo ? props.swapModule.orderNo : "");
      setId(props.swapModule._id);
      getCourse();
    }
  }, [props.swapModule]);

  const handleSwap = async () => {
    const obj = {
      id: fromOrderNo,
      idd: toOrderNo,
    };
    const response = await courseModuleService.swapCourseModule(obj);
    props.toggleModal(false);
    props.modalStatus();
    return response;
  };

  const getCourse = async () => {
    const response = await courseModuleService.getOrder();
    setOrderOptions(response.data.data);
  };

  return (
    <div>
      <Modal
        className="modulePopup-edit"
        show={props.showModal}
        onHide={handleClose}
      >
        <div className="login1">
          <Modal.Header>
            <Modal.Title>Swap Order Number Of Course Module</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="popup-form-box">
              <label>From</label>
              <input
                className="input1"
                name="fromOrderNo"
                type="number"
                value={fromOrderNo}
                onChange={(e) => setFromOrderNo(e.target.value)}
              />
              <p
                style={{ color: "red", textAlign: "left", paddingLeft: "8px" }}
              >
                {error.fromOrderNo}
              </p>
              <label>To</label>
              <select
                className="input1"
                name="toOrderNo"
                type="number"
                value={toOrderNo}
                onChange={(e) => setToOrderNo(e.target.value)}
              >
                <option value="">Select OrderNo</option>
                {orderOptions &&
                  orderOptions.length > 0 &&
                  orderOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.orderNo}
                    </option>
                  ))}
              </select>
              <p
                style={{ color: "red", textAlign: "left", paddingLeft: "8px" }}
              >
                {error.toOrderNo}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleSwap}>
              Swap
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default SwapCourseModule;
