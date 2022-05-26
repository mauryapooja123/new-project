import React from "react";

import Pagination from "react-js-pagination";
const ReactPaginationPage = ({
  activePage,
  pageLimit,
  totalCount,
  handleChangePagination,
}) => {
  console.log(activePage, pageLimit, totalCount, "pppp");
  return (
    <>
      <Pagination
        className="text-left"
        itemClass="page-item"
        linkClass="page-link"
        prevPageText="Previous"
        nextPageText="Next"
        activePage={activePage}
        itemsCountPerPage={pageLimit}
        totalItemsCount={totalCount}
        onChange={handleChangePagination}
      />
    </>
  );
};
export default ReactPaginationPage;
