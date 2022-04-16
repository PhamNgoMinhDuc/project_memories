/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { createPosts, updatePost } from "../../redux/actions/postsAction";

const form = (props) => {
  const { currentId, setCurrentId } = props;
  const [postData, setPostData] = useState({ title: "", message: "", tags: "", selectedFile: "" });
  const [error, setError] = useState({ title: "", message: "", tags: "", selectedFile: "" });

  const post = useSelector((state) => (currentId ? state.posts.posts.find((p) => p._id === currentId) : null));
  const err = useSelector((state) => state.posts.err.message);

  const user = JSON.parse(localStorage.getItem("profile"));
  const lng = localStorage.getItem("i18nextLng");

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    setError(err);
  }, [err]);

  useEffect(() => {
    if (post) setPostData(post);
    setError(null);
  }, [post]);

  if (!user?.result?.name) {
    return <div className="form text-center">{t("form.request")}</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentId) {
      dispatch(createPosts({ ...postData, name: user?.result?.name, userId: user?.result?._id || user?.result?.googleId }));
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setError(null);
    setPostData({ title: "", message: "", tags: "", selectedFile: "" });
  };

  return (
    <div className=" h-auto form ">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h3 className=" text-center font-bold">{t("form.creatPost")}</h3>

        <input type="text" value={postData.title} placeholder={t("detail.title")} onChange={(e) => setPostData({ ...postData, title: e.target.value })} className="form-input"></input>
        {error && (lng === "en" ? <div className="text-error">{error.title}</div> : <div className="text-error">Tiêu đề trống</div>)}

        <textarea
          type="text"
          cols="40"
          rows="5"
          Class
          value={postData.message}
          placeholder={t("detail.message")}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
          className=" resize-none form-input"
        ></textarea>
        {error && (lng === "en" ? <div className="text-error">{error.message}</div> : <div className="text-error">Nội dung trống</div>)}
        <input type="text" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })} placeholder={t("detail.tags")} className="form-input"></input>
        {error && (lng === "en" ? <div className="text-error">{error.tags}</div> : <div className="text-error">Thẻ trống</div>)}
        <div className="my-2">
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        {error && (lng === "en" ? <div className="text-error">{error.selectedFile}</div> : <div className="text-error">Thư mục trống</div>)}
        <div>
          <button className=" bg-blue-600 btn mt-1">{t("btn.submit")}</button>
          <div onClick={clear} className=" bg-red-600 btn mt-1 text-center">
            {t("btn.clear")}
          </div>
        </div>
      </form>
    </div>
  );
};

export default form;
