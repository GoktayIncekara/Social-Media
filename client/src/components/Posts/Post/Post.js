import React, { useState } from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result.googleId || user?.result._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <div className="card shadow bg-body rounded" style={{ width: "22rem" }}>
      <img
        className="card-img-top"
        onClick={openPost}
        src={post.selectedFile}
        alt="Post"
        style={{ cursor: "pointer" }}
      ></img>
      <div className="card-img-overlay d-flex justify-content-between h-25">
        <div>
          <h6 className="bg-dark text-white rounded">
            &nbsp;{post.name}&nbsp;
          </h6>
          <p className="bg-dark text-white rounded">
            &nbsp;{moment(post.createdAt).fromNow()} &nbsp;
          </p>
        </div>
        <div>
          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => {
                setCurrentId(post._id);
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </button>
          )}
        </div>
      </div>

      <div className="card-body">
        <div onClick={openPost} style={{ cursor: "pointer" }}>
          <h6 className="card-subtitle mb-2 text-muted">
            {post.tags.map((tag) => `#${tag} `)}
          </h6>
          <h5>{post.title}</h5>
          <p className="card-text">{post.message}</p>
        </div>
        <button
          type="button"
          className="btn btn-dark"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <button
            className="btn btn-dark mx-2"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" /> &nbsp; Delete &nbsp;
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
