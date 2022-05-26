import React from "react";
const SearchCoursePage = (props) => {
  return (
    <div>
      <input
        // style={{ marginBottom: "20px", marginLeft: "100px" }}
        type="search"
        placeholder="Search......"
        value={props.SearchInp}
        onChange={props.handleSearch}
      />
    </div>
  );
};
export default SearchCoursePage;
