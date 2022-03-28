import React from "react";
import Post from "./post/post";

const posts = () => {
  return (
    <div className=" md:flex-auto md:w-[80%]">
      <div className="md:grid md:grid-cols-4 gap-4 mt-4 md:mt-0">
        <Post className="col-span-1" />
        <Post className="col-span-1" />
        <Post className="col-span-1" />
        <Post className="col-span-1" />
        <Post className="col-span-1" />
      </div>
    </div>
  );
};

export default posts;
