import { setterReducer } from "../setter";

import getInitialState from "./initial";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = getInitialState(), action) => {
  let nextState = state;
  nextState = setterReducer(nextState, action, getInitialState);
  return nextState;
};
