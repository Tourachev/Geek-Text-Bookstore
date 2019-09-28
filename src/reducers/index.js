import { combineReducers } from "redux";
import auth from "./auth";
import errors from "./errors";
import messages from "./messages";
import lead from "./leads";

export default combineReducers({
  auth,
  messages,
  errors,
  lead
});
