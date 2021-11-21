/**
 * setter, resetter and setterReducer helpers create
 * abstraction for redux store, see examples below
 */

export const SETTER = "@SETTER/";
export const RESETTER = "@RESETTER";

// setter examples

// 1. create action to set field authUser
// const setAuthUser = setter("authUser");

// 2. dispatch action
// dispatch(setAuthUser(value));

export const setter = (field) => (payload) => ({
  type: `${SETTER}${field}`,
  payload,
});

// resetter examples

// 1. create action to reset state
// const resetState = resetter();

// 2. create action to reset state, skip field authUser by default
// const resetState = resetter(["authUser"]);

// 3. dispatch action
// dispatch(resetState());

// 4. dispatch action, skip fields authUser and seasonChoices
// dispatch(resetState(["authUser", "seasonChoices"]));

export const resetter =
  (defaultSkipFields = []) =>
  (skipFields = defaultSkipFields) => ({
    type: RESETTER,
    payload: { skipFields },
  });

// setterReducer examples

// 1. use inside of reducer
// const reducer = (state = getInitialState(), action) => {
//     let nextState = state;
//     nextState = setterReducer(nextState, action, getInitialState);
//     return nextState;
// };

export const setterReducer = (state, action, getInitialState) => {
  const { type, payload } = action;
  if (type.startsWith(SETTER)) {
    const field = type.substr(SETTER.length, type.length);
    return {
      ...state,
      [field]: payload,
    };
  }
  if (type === RESETTER) {
    const next = getInitialState();
    const { skipFields } = payload || {};
    if (skipFields)
      skipFields.forEach((field) => {
        next[field] = state[field];
      });
    return next;
  }
  return state;
};
