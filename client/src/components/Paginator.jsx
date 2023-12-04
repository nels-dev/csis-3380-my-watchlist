import React from "react";
import { useState } from "react";
import Pagination from "./Pagination";

const Paginator = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const firstItem = (currentPage - 1) * props.itemsLimit;
  const lastItem = firstItem + props.itemsLimit;
  const subset = props.list.slice(firstItem, lastItem);
  const changePage = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div>
      {/* Content of current page */}
      <props.targetComponent list={subset} />
      {/* Pagination buttons */}
      <Pagination totalPages={props.totalPages} currentPage={currentPage} changePage={changePage}/>
      
    </div>
  );
};
export default Paginator;
