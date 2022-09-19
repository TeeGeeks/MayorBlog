import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNum = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNum.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNum.map((num, index) => (
          <li className="page-item" key={index}>
            <Link onClick={() => paginate(num)} className="page-link">
              {num}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
