import React from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";

import { getPosts } from "../../actions/posts";

import { useEffect, useState } from "react";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8">
          <Posts setCurrentId={setCurrentId} />
        </div>
        <div className="col-4">
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </div>
    </div>
  );
};

export default Home;
