import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { ExitToApp } from "@material-ui/icons";
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import { logout } from "../redux/userSlice";
import { useHistory } from "react-router-dom";
import { adminRoutes } from "./admin/adminRoutes";
import AdminMenu from "./admin/adminMenu";
import ManagerMenu from "./manager/managerMenu";
import { managerRoutes } from "./manager/managerRoutes";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#000",
  },
  colorSpan: {
    color: "#ff0000",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "2rem",
    cursor: "pointer",
    marginLeft: theme.spacing(4),
    flexGrow: "1",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  settingsButton: {
    color: "#fff",
  },
  menuLinks: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { adminRole, managerRole, isLoggedIn } = useSelector(
    (state) => state.user
  );

  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <span className={classes.logo}>
            Drrive<span className={classes.colorSpan}>Go</span>
          </span>
          <IconButton
            className={classes.settingsButton}
            onClick={() => handleLogout()}
          >
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          {isLoggedIn
            ? (adminRole && <AdminMenu />) || (managerRole && <ManagerMenu />)
            : ""}
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {isLoggedIn
          ? (adminRole && adminRoutes) || (managerRole && managerRoutes)
          : ""}
      </main>
    </div>
  );
}
