import { configureStore, combineReducers } from "@reduxjs/toolkit";

import user from "./userSlice";

import authHeader from "../API/authHeader";

const reducer = combineReducers({
  user,
});

const store = configureStore({
  reducer,
});

if (localStorage.token) {
  authHeader();
}

export default store;
