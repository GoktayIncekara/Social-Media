import { combineReducers } from "redux";

import posts from "./posts";
import auth from "./auth";
import load from "./load";

export default combineReducers({
  posts, //normally posts: posts but bcs they have same name we wrote like this
  auth,
  load,
});
