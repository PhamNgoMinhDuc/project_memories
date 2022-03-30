/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPosts, updatePost } from "../../redux/actions/postsAction";

const form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: "", message: "", tags: "", selectedFile: "" });

  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: "", selectedFile: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPosts({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return <div>Vui long dang nhap</div>;
  }
  return (
    <div className=" h-[580px] form ">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h3 className=" text-center font-bold">Creating a Memory</h3>

        <input type="text" value={postData.title} placeholder="Title" onChange={(e) => setPostData({ ...postData, title: e.target.value })} className="form-input"></input>
        <textarea
          type="text"
          cols="40"
          rows="5"
          Class
          value={postData.message}
          placeholder="Message"
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
          className=" resize-none form-input"
        ></textarea>
        <input type="text" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })} placeholder="Tags" className="form-input"></input>

        <div className="my-2">
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <div>
          <button type="submit" className=" bg-blue-600 btn mt-1">
            SUBMIT
          </button>
          <button onClick={clear} className=" bg-red-600 btn mt-1">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default form;
