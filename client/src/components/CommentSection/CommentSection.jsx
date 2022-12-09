import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
    setComment("");
  };

  return (
    <div>
      {comments.map((com, index) => (
        <h1 key={index}>{com}</h1>
      ))}
      {user?.result.name && (
        <div>
          <h1>Write a comment</h1>
          <input
            type="text"
            className="form-control mb-3"
            aria-describedby="Comment"
            placeholder="Your comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button
            className="btn btn-dark"
            disabled={!comment}
            onClick={handleClick}
          >
            Make a comment
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
