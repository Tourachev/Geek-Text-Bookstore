import { createStore, applyMiddleware } from "redux";
import combinaRedures from "../reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  combinaRedures,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
