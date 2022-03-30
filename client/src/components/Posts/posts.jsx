/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Post from "./post/post";
import { useSelector } from "react-redux";

const posts = (props) => {
  const { setCurrentId } = props;

  const posts = useSelector((state) => state.posts);

  return (
    <div className=" md:flex-auto md:w-[80%]">
      <div className="md:grid md:grid-cols-4 gap-4 mt-4 md:mt-0">
        {posts.map((post) => (
          <Post key={post._id} post={post} setCurrentId={setCurrentId} />
        ))}
      </div>
    </div>
  );
};

export default posts;
