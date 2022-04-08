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
import Modal from "../Modal/modal";
import ModalUser from "../Modal/modalUser";

import useModal from "../../useModal";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const home = (props) => {
  const { isMobile } = props;
  const [currentId, setCurrentId] = useState(0);

  const { isShowing, toggle, isShowingUser, toggleUser } = useModal();

  const dispatch = useDispatch();

  const query = useQuery();
  const page = query.get("page") || 1;
  // eslint-disable-next-line no-unused-vars
  const searchQuery = query.get("searchQuery");

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div>
      <Modal isShowing={isShowing} toggle={toggle} toggleUser={toggleUser} isMobile={isMobile} />
      <ModalUser isShowingUser={isShowingUser} toggleUser={toggleUser} isMobile={isMobile} />
      <NavBar isMobile={isMobile} toggle={toggle} />
      <div className="lg:flex md:flex sm:flex gap-4 px-4 pt-20 ">
        <div className=" lg:flex-auto lg:w-[20%] md:flex-auto md:w-[25%] sm:flex-auto sm:w-[30%]">
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
