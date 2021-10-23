import axios from "axios";

export default function authHeader() {
  if (localStorage.getItem("token") !== null) {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
