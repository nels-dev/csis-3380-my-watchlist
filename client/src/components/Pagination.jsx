import React from "react";

const Pagination = ({ totalPages, currentPage, changePage }) => {
  const maxVisiblePages = 10;

  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div>
      <button onClick={() => changePage(Math.max(1, currentPage - 1))}>
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => changePage(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ))}

      <button onClick={() => changePage(Math.min(totalPages, currentPage + 1))}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
