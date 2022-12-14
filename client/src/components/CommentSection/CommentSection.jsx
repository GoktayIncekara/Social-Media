import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  let comments = post?.comments;
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const handleClick = async () => {
    const finalComment = `${user.userObject.name}: ${comment}`;
    dispatch(commentPost(finalComment, post._id));
    setComment("");
  };

  return (
    <div>
      <div className="row mx-5 mt-3 d-flex justify-content-around">
        {user?.userObject.name && (
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
              className="btn btn-dark mb-4"
              disabled={!comment}
              onClick={handleClick}
            >
              Make a comment
            </button>
            <h1 className="mb-3 text-dark text-center">
              {comments.length ? "Comments" : ""}
            </h1>
          </div>
        )}
        {comments.map((com, index) => (
          <div
            key={index}
            className="col-md-4 col-lg-2 mb-3 mx-2 bg-secondary text-white rounded"
          >
            <h3 className="mt-3">{com.split(": ")[0]}</h3>
            <hr />
            <p>{com.split(":")[1]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
