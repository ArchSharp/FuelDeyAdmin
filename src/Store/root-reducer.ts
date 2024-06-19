import { Action, combineReducers, Reducer } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import userReducer from "../Features/User/userSlice";
import errorReducer from "../Features/Error/errorSlice";
import { RootState } from "../Store/store";

const appReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
});

const rootReducer: Reducer = (state: RootState, action: Action) => {
  if (action.type === "user/setLogout") {
    // this applies to all keys defined in persistConfig(s)
    storage.removeItem("persist:root");
    state = {} as RootState;
  }
  return appReducer(state, action);
};

export default rootReducer;
