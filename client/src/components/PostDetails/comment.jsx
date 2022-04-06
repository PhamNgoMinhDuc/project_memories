import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentPost } from "../../redux/actions/postsAction";

const Comment = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);

  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const commentRef = useRef();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleComment = async () => {
    const commentp = `${post.name} : ${comment}`;
    const newComment = await dispatch(commentPost(post._id, commentp));
    setComments(newComment);
    setComment("");
    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  console.log(comments);

  return (
    <div className=" h-40 w-full mt-2">
      <h2 className=" text-base font-medium">Comment</h2>
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
