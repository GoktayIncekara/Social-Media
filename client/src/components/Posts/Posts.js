import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";

const Posts = ({ setCurrentId }) => {
  const { posts } = useSelector((state) => state.posts);
  return !posts?.length ? (
    <div className="spinner-border text-dark" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <div className="container">
      <div className="row">
        {posts.map((post) => (
          <div className="col-4 mb-3" key={post._id}>
            <Post post={post} setCurrentId={setCurrentId} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
