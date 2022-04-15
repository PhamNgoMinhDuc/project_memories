/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AiFillLike, AiOutlineDelete, AiFillEdit, AiOutlineLike } from "react-icons/ai";

import { deletePost, likePost } from "../../../redux/actions/postsAction";
import { useTranslation } from "react-i18next";
const post = (props) => {
  const { post, setCurrentId } = props;
  const [likes, setLikes] = useState(post?.likes);

  const user = JSON.parse(localStorage.getItem("profile"));
  const lng = localStorage.getItem("i18nextLng");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const userId = user?.result?.googleId || user?.result?._id;
  const hasLikePost = post.likes.find((like) => like === userId);

  const handleClick = async () => {
    dispatch(likePost(post._id));

    if (hasLikePost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
        <>
          <AiFillLike />
          <div>
            {likes.length}
            {lng === "en" ? (likes.length === 1 ? " Like" : " Likes") : " Thích"}
          </div>
        </>
      ) : (
        <>
          <AiOutlineLike />
          <div>
            {likes.length}
            {lng === "en" ? (likes.length === 1 ? " Like" : " Likes") : " Thích"}
          </div>
        </>
      );
    }

    return (
      <>
        <AiOutlineLike />
        {t("posts.like")}
      </>
    );
  };

  return (
    <div className="mb-4 md:mb-0 w-full h-auto flex flex-col overflow-hidden rounded-[10px] border-1 border-black shadow-[0px_5px_10px_0px_rgba(0,0,0,0.5)] dark:bg-[#242526] dark:text-[#dddee3]">
      <div className="relative">
        <img
          src={post.selectedFile || "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"}
          alt=""
          className="w-full h-36 object-cover brightness-50 hover:brightness-100 transition delay-100 cursor-pointer"
          onClick={openPost}
        />
        <div className=" absolute top-0 flex justify-between w-full p-4 text-white">
          <div>
            <h3 className=" text-xl font-semibold">{post.name}</h3>
            <h4 className=" text-xs">{moment(post.createdAt).fromNow()}</h4>
          </div>
          {user?.result?.googleId === post?.creator || user?.result?._id === post?.creator ? (
            <>
              <button onClick={() => setCurrentId(post._id)} className=" flex justify-center items-center gap-1">
                <AiFillEdit />
                {t("posts.edit")}
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className=" p-2 px-4">
        <h3 className=" text-sm text-gray-400 truncate">{post.tags}</h3>
        <h3 className=" text-xl py-2 font-semibold truncate">{post.title}</h3>
        <p className=" text-sm break-words text-overflow truncation overflow-hidden w-full max-h-[84px]">{post.message}</p>
        <div className="flex justify-between items-end mt-2">
          <button onClick={handleClick} disabled={!user?.result} className="flex gap-1 items-center justify-center">
            <Likes />
          </button>
          {user?.result?.googleId === post?.creator || user?.result?._id === post?.creator ? (
            <>
              <button onClick={() => dispatch(deletePost(post._id))} className="flex gap-1 items-center justify-center">
                <AiOutlineDelete />
                {t("posts.delete")}
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default post;
