import React from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
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
      <img className="card-img-top" src={post.selectedFile} alt="Post"></img>
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
        <h6 className="card-subtitle mb-2 text-muted">
          {post.tags.map((tag) => `#${tag} `)}
        </h6>
        <h5>{post.title}</h5>
        <p className="card-text">{post.message}</p>
        <button
          type="button"
          className="btn btn-dark"
          disabled={!user?.result}
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          <Likes />
        </button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <a
            className="btn btn-dark mx-2"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" /> &nbsp; Delete &nbsp;
          </a>
        )}
      </div>
    </div>
  );
};

export default Post;
