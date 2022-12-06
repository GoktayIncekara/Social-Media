import React from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Pagination";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { getPosts } from "../../actions/posts";
import { useEffect, useState } from "react";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag != tagToDelete));

  const searchPost = () => {
    if (search.trim()) {
      //dispatch -> fetch search post
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8">
          <Posts setCurrentId={setCurrentId} />
        </div>
        <div className="col-4">
          <div className="bg-dark p-3">
            <div className="col-12 mb-2">
              <h3 className="text-white">Search Memories</h3>
            </div>
            <div className="col-12 mb-2">
              <input
                type="text"
                className="form-control"
                aria-describedby="Search"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div className="col-12 mb-3">
              <ChipInput
                fullWidth
                style={{ margin: "10px 0", backgroundColor: "white" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
            </div>
            <div className="col-12">
              <button className="btn btn-light mb-2" onClick={searchPost}>
                Search Post
              </button>
            </div>
          </div>
          <div className="bg-light mb-5">
            <Paginate />
          </div>

          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </div>
    </div>
  );
};

export default Home;
