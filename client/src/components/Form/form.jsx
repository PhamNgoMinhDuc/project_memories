import React from "react";
import FileBase from "react-file-base64";

const form = () => {
  return (
    <div className=" md:flex-auto  md:w-[20%] h-auto border-1 rounded-[10px] border-black px-4 py-2 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.5)]">
      <div>
        <h3 className=" text-center font-bold">Creating a Memory</h3>
        <input className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black" type="text" name="title" placeholder="title"></input>
        <input className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-40 mt-5 py-2 px-4 placeholder:text-black " type="text" name="Mesage" placeholder="Mesage"></input>
        <input className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black" type="text" name="Tags" placeholder="Tags"></input>

        <div className="my-2">
          <FileBase type="file" multiple={false} />
        </div>

        <button className=" bg-blue-600 text-white w-full mt-2 py-1 rounded-[5px] cursor-pointer">SUBMIT</button>
        <button className=" bg-red-600 text-white w-full mt-1 py-1 rounded-[5px] cursor-pointer">Clear</button>
      </div>
    </div>
  );
};

export default form;
