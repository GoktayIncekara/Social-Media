import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <div className="bg-light">
        <h6>
          Please Sign In to create your own memories and like other's memories.
        </h6>
      </div>
    );
  }

  return (
    <div className="bg-secondary px-3 pt-3 pb-1">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <h6 className="text-white">
              {currentId ? "Editing" : "Creating"} a Memory
            </h6>
          </div>
          <div className="col-12 mb-1">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="title"
                aria-describedby="title"
                placeholder="Title"
                value={postData.title}
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
              />
            </div>
          </div>
          <div className="col-12 mb-1">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="message"
                aria-describedby="message"
                placeholder="Message"
                value={postData.message}
                onChange={(e) =>
                  setPostData({ ...postData, message: e.target.value })
                }
              />
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="tags"
                aria-describedby="tags"
                placeholder="Tags"
                value={postData.tags}
                onChange={(e) =>
                  setPostData({ ...postData, tags: e.target.value.split(",") })
                }
              />
            </div>
          </div>
          <div className="col-12 mb-3">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            ></FileBase>
          </div>
          <button className="btn btn-dark btn-block mb-2" type="submit">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-light btn-block"
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
