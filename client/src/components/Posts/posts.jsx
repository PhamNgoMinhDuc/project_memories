/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Post from "./post/post";
import { useSelector } from "react-redux";

const posts = (props) => {
  const { setCurrentId } = props;

  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading)
    return (
      <>
        <div className=" md:flex-auto md:w-[80%]">
          <div className="gap-4 mt-4 md:mt-0 w-full h-screen flex justify-center">
            <div className=" h-20 w-20 border-[10px] border-t-8 border-t-blue-600 md:mt-60 rounded-full animate-spin mt-10"></div>
          </div>
        </div>
      </>
    );
  return isLoading ? (
    <>
      <div className=" lg:flex-auto lg:w-[80%]">
        <div className="gap-4 mt-4 lg:mt-0 w-full h-screen flex justify-center">
          <div className=" h-20 w-20 border-[10px] border-t-8 border-t-blue-600 md:mt-60 rounded-full animate-spin mt-10"></div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className=" lg:flex-auto lg:w-[80%] md:flex-auto md:w-[80%] sm:flex-auto sm:w-[80%]">
        <div className="lg:grid lg:grid-cols-4 lg:mt-0 md:grid md:grid-cols-3 md:mt-0 sm:grid sm:grid-cols-2 sm:mt-0 gap-4 mt-4">
          {posts.map((post) => (
            <Post key={post._id} post={post} setCurrentId={setCurrentId} />
          ))}
        </div>
      </div>
    </>
  );
};

export default posts;
