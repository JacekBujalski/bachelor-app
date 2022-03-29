import React from "react";
import { makeStyles } from "@material-ui/core";
import { logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/bg-user.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  app: {
    padding: theme.spacing(3),
  },
  topBar: {
    display: "flex",
  },
  logo: {
    flex: "1",
    fontWeight: "bold",
    fontSize: "2rem",
    cursor: "pointer",
    marginLeft: theme.spacing(4),
    flexGrow: "1",
  },
  colorSpan: {
    color: "#ff0000",
  },
  logoutButton: {
    marginRight: theme.spacing(4),
    border: "none",
    borderRadius: "5px",
    padding: theme.spacing(1),
    fontSize: "1rem",
    backgroundColor: "#ff0000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#e80606",
    },
  },
}));

export default function UserPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <div className={classes.root}>
      <div className={classes.app}>
        <div className={classes.topBar}>
          <span className={classes.logo}>
            Drrive<span className={classes.colorSpan}>Go</span>
          </span>
          <button
            className={classes.logoutButton}
            onClick={() => handleLogout()}
          >
            Wyloguj
          </button>
        </div>
      </div>
    </div>
  );
}
