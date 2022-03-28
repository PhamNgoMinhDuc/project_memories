import React from "react";
import memories from "../../../images/memories.png";
import { AiFillLike, AiOutlineDelete, AiFillEdit } from "react-icons/ai";
const post = () => {
  return (
    <div className="mb-4 md:mb-0 w-full h-80 flex flex-col overflow-hidden rounded-[10px] border-1 border-black shadow-[0px_5px_10px_0px_rgba(0,0,0,0.5)]">
      <div className="relative">
        <img src={memories} alt="" className="w-full h-36 object-cover bg-[rgba(0,0,0,0.7)]" />
        <div className=" absolute top-0 flex justify-between w-full p-4 text-white">
          <div>
            <h3 className=" text-xl font-semibold">PNMD Duc</h3>
            <h4>2 hours ago</h4>
          </div>
          <div className="flex  justify-center items-center gap-1 cursor-pointer">
            <AiFillEdit />
            EDIT
          </div>
        </div>
      </div>
      <div className=" p-4">
        <h3>#tags, #tags #tags</h3>
        <h3>Duc DTrai</h3>
        <p className="break-words text-overflow truncation overflow-hidden  w-full max-h-12">
          dsfsdfffffdddddddddffffssssssssssssssssffffffffffffffffffffffffffffffffffdfdsfdsfffffffffffffdddddddddddddddfffffffsdfffffdd
        </p>
        <div className="flex justify-between items-center">
          <button className="flex gap-1 items-center justify-center">
            <AiFillLike />
            LIKE
          </button>
          <button className="flex gap-1 items-center justify-center">
            <AiOutlineDelete />
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default post;
