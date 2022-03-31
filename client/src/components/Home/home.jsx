/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/postsAction";

import { useLocation } from "react-router-dom";
import Form from "../Form/form";
import Search from "../Search/search";
import Posts from "../Posts/posts";
import NavBar from "../navBar/navBar";
import Pagination from "../Pagination/pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const home = (props) => {
  const { isMobile } = props;
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <div>
      <NavBar isMobile={isMobile} />
      <div className="md:flex gap-4 px-4 pt-20 ">
        <div className=" md:flex-auto  md:w-[20%]">
          <Search />
          <Pagination page={page} />
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
        <Posts setCurrentId={setCurrentId} />
      </div>
    </div>
  );
};

export default home;
