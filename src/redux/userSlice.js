import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../API/api";
import axios from "axios";
import authHeader from "../API/authHeader";

//initial values

const initialIsLoggedIn = localStorage.getItem("isLoggedIn")
  ? localStorage.getItem("isLoggedIn")
  : false;

const initialUserData = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

const initialToken = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialAdminRole = localStorage.getItem("adminRole")
  ? localStorage.getItem("adminRole")
  : false;

const initialManagerRole = localStorage.getItem("managerRole")
  ? localStorage.getItem("managerRole")
  : false;

const initialUserRole = localStorage.getItem("userRole")
  ? localStorage.getItem("userRole")
  : false;

// Slice

const slice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isLoggedIn: initialIsLoggedIn,
    userData: initialUserData,
    token: initialToken,
    adminRole: initialAdminRole,
    managerRole: initialManagerRole,
    userRole: initialUserRole,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = action.payload;
      localStorage.setItem("isLoggedIn", JSON.stringify(action.payload));
      state.isLoading = false;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    getUserData: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    authToken: (state, action) => {
      state.token = action.payload;
    },
    isAdmin: (state) => {
      state.adminRole = true;
    },
    isManager: (state) => {
      state.managerRole = true;
    },
    isUser: (state) => {
      state.userRole = true;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.userData = null;
      state.adminRole = null;
      state.managerRole = null;
      state.userRole = null;
      localStorage.clear();
    },
  },
});

export default slice.reducer;

// Actions

const {
  loginSuccess,
  logoutSuccess,
  authToken,
  isAdmin,
  isManager,
  isUser,
  getUserData,
  startLoading,
} = slice.actions;

let token;
let nickname;
let userID;
let Admin;
let Manager;
let User;

export const login =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      dispatch(startLoading());
      await axios
        .post(API_URL + "login", { username, password })
        .then((response) => {
          if (response.status === 200) {
            token = response.headers.authorization;
            localStorage.setItem("token", token);
            authHeader();
          }
        });
      await dispatch(authToken({ token }));
      await dispatch(getUsersData());
    } catch (e) {
      return console.error(e.message);
    }
  };

export const logout = () => async (dispatch) => {
  try {
    authHeader();
    dispatch(logoutSuccess());
  } catch (e) {
    console.error(e.message);
  }
};

//Getting data & role

export const getUsersData = () => async (dispatch) => {
  try {
    await axios.get(API_URL + "user").then((res) => {
      if (res.data != null) {
        nickname = res.data;
      }
    });
    await axios.get(API_URL + "user/" + nickname).then((res) => {
      if (res.data != null) {
        userID = res.data.idUsers;

        if (res.data.role === "ADMIN") {
          Admin = true;
          localStorage.setItem("adminRole", Admin);
          dispatch(isAdmin());
        } else if (res.data.role === "MANAGER") {
          Manager = true;
          localStorage.setItem("managerRole", Manager);
          dispatch(isManager());
        } else if (res.data.role === "USER") {
          User = true;
          localStorage.setItem("userRole", User);
          dispatch(isUser());
        }
      }
    });

    await axios.get(API_URL + "user/" + userID + "/usersdata").then((res) => {
      if (res.data != null) {
        let data = JSON.stringify(res.data);
        dispatch(getUserData({ data }));
        localStorage.setItem("userData", data);
      }
    });

    await dispatch(loginSuccess(true));
  } catch (e) {
    return console.error(e.message);
  }
};
