import { createStore, compose, applyMiddleware } from "redux";

import reducer from "./reducers";

const useDevTools = process.env.NODE_ENV === "development";

const composeEnhancers =
  (useDevTools && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middlewares = [];

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
