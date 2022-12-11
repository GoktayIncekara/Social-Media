import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getPost, getPostsBySearch } from "../../actions/posts";
import { useParams, useNavigate } from "react-router-dom";
import CommentSection from "../CommentSection/CommentSection";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getPostsBySearch({ search: "none", tags: post?.tags.join(",") }));
  }, [post, dispatch]);

  if (!post) return null;

  if (isLoading) {
    return (
      <div className="spinner-border text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  const openPost = (_id) => navigate(`/posts/${_id}`);

  return (
    <div>
      <div className="card shadow bg-body rounded mx-5 mb-5">
        <div className="row">
          <div className="col-lg-4">
            <img
              className="img-fluid rounded-start"
              src={post.selectedFile}
              alt="Post"
            ></img>
          </div>
          <div className="col-lg-8  d-flex align-items-center">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">
                {post.tags.map((tag) => `#${tag} `)}
              </h6>
              <h3>{post.title}</h3>
              <p className="card-text">{post.message}</p>
              <h6>By: {post.name}</h6>
              <p>
                {" "}
                <i>{moment(post.createdAt).fromNow()} </i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <CommentSection post={post} />
      {recommendedPosts.length && (
        <div className="card rounded mx-5">
          <h4 className="text-center font-italic font-weight-bold m-4 text-secondary">
            You might also like
          </h4>
          <div className="row px-2 d-flex justify-content-center">
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <div className="col-lg-3 m-3" key={_id}>
                  <div
                    className="card shadow bg-body rounded"
                    onClick={() => openPost(_id)}
                    key={_id}
                  >
                    <img
                      className="card-img-top"
                      src={selectedFile}
                      alt="Post"
                      style={{ cursor: "pointer" }}
                    ></img>
                    <div className="card-body">
                      <h1>{title}</h1>
                      <h4>{name}</h4>
                      <p>{message}</p>
                      <p>Likes: {likes.length}</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
