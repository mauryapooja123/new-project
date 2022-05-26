import React from "react";
import { Table, Button } from "react-bootstrap";

const CourseTable = (props) => {
  console.log(props.userData, "ttttttt");
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>state</th>
            <th>Title</th>
          </tr>
        </thead>
        {props.userData &&
          props.userData.map((data, i) => (
            <tbody key={i}>
              <tr>
                <td>{data.state}</td>
                <td>{data.title}</td>
                <td>
                  <Button onClick={() => props.handleEdit(data)}>edit</Button>
                  <Button variant="primary" onClick={props.handleAdd}>
                    add
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => props.handledelete(data.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
      </Table>
    </>
  );
};

export default CourseTable;
