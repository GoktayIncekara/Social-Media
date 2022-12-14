import { LOAD } from "../constants/actionTypes";

export default (state = { scriptLoaded: false }, action) => {
  switch (action.type) {
    case LOAD:
      return { ...state, scriptLoaded: true };
    default:
      return state;
  }
};
