import React, { useState } from "react";
import Pagination from "react-js-pagination";

const Pagination1 = (props) => {
  const { allDataCount, activePage, pageLimit, onchange } = props;
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
        pageRangeDisplayed={4}
        onChange={onchange}
      />
    </div>
  );
};

export default Pagination1;
