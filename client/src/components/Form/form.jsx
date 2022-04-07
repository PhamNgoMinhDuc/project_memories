/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPosts, updatePost } from "../../redux/actions/postsAction";

const form = (props) => {
  const { currentId, setCurrentId } = props;
  const [postData, setPostData] = useState({ title: "", message: "", tags: "", selectedFile: "" });
  const [error, setError] = useState({ title: "", message: "", tags: "", selectedFile: "" });
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const post = useSelector((state) => (currentId ? state.posts.posts.find((p) => p._id === currentId) : null));
  const err = useSelector((state) => state.posts.err.message);

  console.log(error);
  useEffect(() => {
    setError(err);
  }, [err]);

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  if (!user?.result?.name) {
    return <div>Vui long dang nhap</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentId) {
      dispatch(createPosts({ ...postData, name: user?.result?.name }));
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: "", message: "", tags: "", selectedFile: "" });
  };

  return (
    <div className=" h-[500px] form ">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h3 className=" text-center font-bold">Creating a Memory</h3>

        <input type="text" value={postData.title} placeholder="Title" onChange={(e) => setPostData({ ...postData, title: e.target.value })} className="form-input"></input>
        {error && <div>{error.title}</div>}

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
          <button className=" bg-blue-600 btn mt-1">SUBMIT</button>
          <div onClick={clear} className=" bg-red-600 btn mt-1 text-center">
            Clear
          </div>
        </div>
      </form>
    </div>
  );
};

export default form;
