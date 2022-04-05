import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentPost } from "../../redux/actions/postsAction";

const Comment = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);

  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const commentRef = useRef();

  const handleComment = async () => {
    const commentp = `${post.name} : ${comment}`;
    const newComment = await dispatch(commentPost(post._id, commentp));
    setComments(newComment);
    setComment("");
    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  console.log(comments);

  return (
    <div className=" border-4 border-black">
      <h2>Comment</h2>
      <ul>
        {comments.map((cm, index) => (
          <li key={index}>{cm}</li>
        ))}
      </ul>

      <div ref={commentRef}></div>

      <div>
        <textarea className="border border-black w-full" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        <button className="btn bg-blue-600" onClick={handleComment}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Comment;
