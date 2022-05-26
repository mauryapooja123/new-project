// import React, { useState, useEffect } from "react";
// import { Button, Table } from "react-bootstrap";

// const CustomPagination = ({
//   data,
//   contentPerPage,
//   handleDelete,
//   handleEdit,
// }) => {
//   const [totalPageCount, setTotalPageCount] = useState(
//     Math.ceil(data && data.length / contentPerPage)
//   );
//   const [currentPage, setCurrentPage] = useState(1);
//   const [prevDisable, setPrevDisable] = useState(false);
//   const [nextDisable, setNextDisable] = useState(false);
//   const [records, setRecords] = useState([]);
//   /* 👇 little UX tweak when user clicks on any button we scoll to top of the page */
//   useEffect(() => {
//     window.scrollTo({
//       behavior: "smooth",
//       top: "0px",
//     });
//   }, [currentPage]);

//   function goToNextPage() {
//     setCurrentPage((page) => page + 1);
//   }
//   function goToPreviousPage() {
//     if (`${currentPage > 0}`) {
//       setPrevDisable(true);
//     }
//     setCurrentPage((page) => page - 1);
//   }

//   const getPaginatedData = () => {
//     const startIndex = currentPage * contentPerPage - contentPerPage;
//     const endIndex = startIndex + contentPerPage;
//     const d = data.slice(startIndex, endIndex);
//     setRecords(d);
//   };

//   useEffect(() => {
//     getPaginatedData();
//   }, []);

//   return (
//     <>
//       <div className="plan-table">
//         <h6
//           style={{ float: "right", marginRight: "50px" }}
//         >{`Page.no-${currentPage}`}</h6>
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr style={{ height: "30px" }}>
//               <th>Id</th>
//               <th>State</th>
//               <th>Title</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records &&
//               records.length > 0 &&
//               records.map((item, index) => (
//                 <tr>
//                   <td>{index + 1}</td>
//                   <td>{item.state}</td>
//                   <td>{item.title}</td>
//                   <td>
//                     <i
//                       className="fa fa-edit"
//                       style={{
//                         marginLeft: "10px",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => handleEdit(item)}
//                     ></i>
//                     <i
//                       className="fa fa-trash"
//                       style={{
//                         marginLeft: "10px",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => handleDelete(item._id)}
//                     ></i>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </Table>
//       </div>

//       <div className="pagination">
//         {/* previous button */}
//         <Button
//           onClick={goToPreviousPage}
//           variant={`${currentPage > 0 && "primary"}`}
//           disabled={prevDisable}
//           style={{ marginRight: "10px" }}
//         >
//           previous
//         </Button>
//         {/* next button */}
//         <Button
//           onClick={goToNextPage}
//           variant={`${currentPage !== totalPageCount && "info"}`}
//           disabled={nextDisable}
//         >
//           next
//         </Button>
//       </div>
//     </>
//   );
// };

// export default CustomPagination;
