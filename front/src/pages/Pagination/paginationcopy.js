import React, { useState } from "react";
import Pagination from "react-js-pagination";

const Pagination1 = (props) => {
  const { paginationFun, allDataCount, pageLimit } = props;

  const [activePage, setActivePage] = useState();
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    paginationFun(pageNumber);
  };
  return (
    <div>
      <Pagination
        className="text-left"
        itemClass="page-item"
        linkClass="page-link"
        prevPageText="Previous"
        nextPageText="Next"
        activePage={activePage}
        itemsCountPerPage={pageLimit}
        totalItemsCount={allDataCount}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Pagination1;
