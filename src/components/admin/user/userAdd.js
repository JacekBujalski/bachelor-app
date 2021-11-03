import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, Paper } from "@material-ui/core";
import axios from "axios";
import { API_URL } from "../../../API/api";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  userTitle: {
    paddingTop: theme.spacing(2),
    margin: theme.spacing(1, 8),
    fontSize: "1.5rem",
    fontWeight: 600,
  },
  userForm: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(8),
  },
  userItem: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    "& label": {
      marginBottom: theme.spacing(2),
      fontSize: "1.4rem",
      fontWeight: 600,
      color: "#9b9b9b",
    },
    "& input": {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      padding: theme.spacing(1),
      fontSize: "1.1rem",
      border: "1px solid gray",
      borderRadius: "5px",
      color: "#9b9b9b",
    },
  },
  userItemSelect: {
    fontSize: "1.1rem",
    borderRadius: "5px",
    color: "#9b9b9b",
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  userButton: {
    border: "none",
    borderRadius: "5px",
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    fontSize: "1rem",
    backgroundColor: "#ff0000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#e80606",
    },
  },
}));

export default function UserAdd() {
  const classes = useStyles();
  let history = useHistory();
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  let usersId;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    axios.post(API_URL + "user", values).then((res) => {
      if (res.data != null) {
        usersId = res.data.idUsers;
        localStorage.setItem("usersId", usersId);
        history.push("/dashboard/users/addUserInfo");
      }
    });
  };

  const roleList = ["ADMIN", "MANAGER", "USER"];

  return (
    <Paper elevation={3} className={classes.root}>
      <h1 className={classes.userTitle}> Nowy Użytkownik</h1>
      <form className={classes.userForm} onSubmit={handleSubmit}>
        <div className={classes.userItem}>
          <label>Nazwa użytkownika</label>
          <input
            type="text"
            placeholder="Podaj nazwę użytkownika"
            onChange={handleChange("username")}
          />
        </div>
        <div className={classes.userItem}>
          <label>Hasło</label>
          <input
            type="password"
            placeholder="Podaj hasło"
            onChange={handleChange("password")}
          />
        </div>
        <div className={classes.userItem}>
          <label>E-mail</label>
          <input
            type="email"
            placeholder="Podaj E-mail"
            onChange={handleChange("email")}
          />
        </div>
        <div className={classes.userItem}>
          <label>Rola użytkownika</label>
          <select
            className={classes.userItemSelect}
            onChange={handleChange("role")}
          >
            <option> Wybierz rolę</option>
            {roleList.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
            )}
          </select>
        </div>
        <div className={classes.userItem}>
          <button type="submit" className={classes.userButton}>
            Stwórz użytkownika
          </button>
        </div>
      </form>
    </Paper>
  );
}
