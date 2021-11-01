import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { ExitToApp, Inbox, Mail, Home, People } from "@material-ui/icons";
import {
  CssBaseline,
  Drawer,
  AppBar,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  List,
  ListItem,
  IconButton,
} from "@material-ui/core";
import { logout } from "../redux/userSlice";
import { Link, useHistory } from "react-router-dom";
import { adminRoutes } from "./admin/adminRoutes";

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
          <List>
            <Link className={classes.menuLinks} to="/dashboard">
              <ListItem button key={"Main"}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary={"Strona główna"} />
              </ListItem>
            </Link>
            <Link className={classes.menuLinks} to="/dashboard/users">
              <ListItem button key={"Users"}>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText primary={"Użytkownicy"} />
              </ListItem>
            </Link>
          </List>
          <Divider />
          {/*<List>*/}
          {/*  {["All mail", "Trash", "Spam"].map((text, index) => (*/}
          {/*    <ListItem button key={text}>*/}
          {/*      <ListItemIcon>*/}
          {/*        {index % 2 === 0 ? <Inbox /> : <Mail />}*/}
          {/*      </ListItemIcon>*/}
          {/*      <ListItemText primary={text} />*/}
          {/*    </ListItem>*/}
          {/*  ))}*/}
          {/*</List>*/}
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {adminRoutes}
      </main>
    </div>
  );
}
