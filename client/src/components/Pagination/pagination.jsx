/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getPosts } from "../../redux/actions/postsAction";

const pagination = (props) => {
  const { page } = props;
  const { numberOfPage, currentPage } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (page) dispatch(getPosts(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="mb-4 form ">
      <ul className="flex flex-row items-center justify-center gap-4 w-full">
        {currentPage <= 1 ? (
          ""
        ) : (
          <Link className="flex gap-2" to={`?page=${currentPage - 1}`}>
            <li className="btn-pagination">&laquo;</li>
            <li className="btn-pagination">{currentPage - 1}</li>
          </Link>
        )}

        <Link to={`?page=${currentPage}`}>
          <li className="btn-pagination">{currentPage}</li>
        </Link>

        {currentPage >= numberOfPage ? (
          ""
        ) : (
          <Link className="flex gap-2" to={`?page=${currentPage + 1}`}>
            <li className="btn-pagination">{currentPage + 1}</li>
            <li className="btn-pagination">&raquo;</li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default pagination;
