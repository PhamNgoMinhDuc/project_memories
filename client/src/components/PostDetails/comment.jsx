import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { commentPost } from "../../redux/actions/postsAction";
import { useTranslation } from "react-i18next";
const Comment = () => {
  // eslint-disable-next-line no-use-before-define
  const [comment, setComment] = useState("");

  const { post } = useSelector((state) => state.posts);
  const [comments, setComments] = useState(post?.comments);

  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();
  const commentRef = useRef();
  const { t } = useTranslation();
  const handleComment = async () => {
    const commentp = `${post.name} : ${comment}`;
    const newComment = await dispatch(commentPost(post._id, commentp));
    setComments(newComment);
    setComment("");
    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className=" h-40 w-full mt-2">
      <h2 className=" text-base font-medium">{t("posts.comment")}</h2>
      <div className=" overflow-y-scroll overflow-x-hidden max-h-24">
        {comments.map((cm, index) => (
          <div key={index}>{cm}</div>
        ))}
        <div ref={commentRef}></div>
      </div>
      {user?.result?.name && (
        <div>
          <input className="form-input w-full max-h-10 mt-2" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)}></input>
          <button className="btn bg-blue-600 mt-2" onClick={handleComment}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
