/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";

import { getPost, getPostsBySearch } from "../../redux/actions/postsAction";

import NavBar from "../navBar/navBar";
import Comment from "./comment";

const postDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPost(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: "none", tags: post?.tags.join(",") }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const openPost = (_id) => {
    navigate(`/home/${_id}`);
  };

  if (!post) return null;

  if (isLoading)
    return (
      <>
        <div className=" md:flex-auto md:w-[80%]">
          <div className="gap-4 mt-4 md:mt-0 w-full h-full flex justify-center">
            <div className=" h-20 w-20 border-[10px] border-t-8 border-t-blue-600 md:mt-60 rounded-full animate-spin mt-10"></div>
          </div>
        </div>
      </>
    );

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
  return (
    <div>
      <NavBar />
      <div>
        <div className="h-20"></div>
        <div className="w-full h-auto form ">
          <div className="flex flex-wrap-reverse h-auto gap-2 md:flex-nowrap md:flex-row">
            <div className="flex-auto w-full h-[600px] md:flex-auto md:w-[50%]">
              <div className=" text-4xl font-medium w-full h-12 truncate">{post.title}</div>
              <div className=" text-sm text-gray-400 w-full h-5 truncate">{post.tags}</div>
              <div className=" text-base w-full max-h-72 overflow-hidden text-ellipsis">{post.message}</div>
              <div className="text-base text-gray-400 w-full h-5 truncate">{moment(post.createdAt).fromNow()}</div>
              <Comment />
            </div>
            <img
              className="flex-auto w-full md:flex-auto md:w-[50%] object-cover rounded-[5px]"
              src={post.selectedFile || "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="form mt-10">
        {recommendedPosts.length && (
          <>
            <div>You might also like:</div>
            <div className="flex flex-col md:flex-row gap-4">
              {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
                <>
                  <div className="form" key={_id} onClick={() => openPost(_id)}>
                    <button>{title}</button>
                  </div>
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default postDetails;
