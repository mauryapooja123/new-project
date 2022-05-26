import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import * as courseUnitService from "../../services/courseUnitService";
import _ from "lodash";

const SwapCourseUnit = (props) => {
  // console.log(props, "props");
  const MAX_BOARD_SIZE = 12;
  const [fromOrderNo, setFromOrderNo] = useState("");
  const [toOrderNo, setToOrderNo] = useState();
  const [allOrderNo, setAllOrderNo] = useState();
  const [error, setError] = useState({});
  const [id, setId] = useState("");

  const handleClose = (id) => {
    props.toggleModal(false);
  };

  useEffect(() => {
    getCourseUnitlist();
  }, []);

  useEffect(() => {
    if (props.selectedSwap) {
      setFromOrderNo(
        props.selectedSwap.orderNo ? props.selectedSwap.orderNo : ""
      );
      setId(props.selectedSwap._id);
    }
  }, [props.selectedSwap]);

  const getCourseUnitlist = async () => {
    const response = await courseUnitService.getAllCourseUnit();
    setAllOrderNo(response.data.data);
    // console.log(response.data.data, "::::::::::::response of swap api");
  };

  const handleSwap = async () => {
    const obj = {
      fromId: fromOrderNo,
      toId: toOrderNo,
    };
    const response = await courseUnitService.swapCourseUnit(obj);
    props.toggleModal(false);
    props.modalStatus();
    return response;
  };

  return (
    <div>
      <Modal show={props.showModal} onHide={handleClose}>
        <div className="login1">
          <Modal.Header>
            <Modal.Title>Swap Order Number Of Course Unit</Modal.Title>
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
              {/* <label>Course</label> */}
              <select
                className="input1"
                name="toOrderNo"
                type="number"
                onChange={(e) => setToOrderNo(e.target.value)}
              >
                <option>Select Order Number.....</option>
                {allOrderNo &&
                  allOrderNo.length > 0 &&
                  allOrderNo.map((item) => (
                    <option key={item.orderNo} value={item.id}>
                      {item.orderNo}
                    </option>
                  ))}
              </select>
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

export default SwapCourseUnit;
