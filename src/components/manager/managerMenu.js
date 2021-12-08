import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  AddBox,
  AddCircle,
  Assessment,
  Business,
  DirectionsCar,
  Home,
  People,
  PersonAdd,
  PostAdd,
  SpeakerNotes,
  Event,
  Today,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menuLinks: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function ManagerMenu() {
  const classes = useStyles();

  return (
    <>
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
        <Link className={classes.menuLinks} to="/dashboard/cars">
          <ListItem button key={"Cars"}>
            <ListItemIcon>
              <DirectionsCar />
            </ListItemIcon>
            <ListItemText primary={"Samochody"} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link className={classes.menuLinks} to="/dashboard/posts">
          <ListItem button key={"Posts"}>
            <ListItemIcon>
              <SpeakerNotes />
            </ListItemIcon>
            <ListItemText primary={"Posty"} />
          </ListItem>
        </Link>
        <Divider />
        <Link className={classes.menuLinks} to="/dashboard/services/planned">
          <ListItem button key={"PlannedServices"}>
            <ListItemIcon>
              <Today />
            </ListItemIcon>
            <ListItemText primary={"Planowane serwisy"} />
          </ListItem>
        </Link>
        <Link
          className={classes.menuLinks}
          to="/dashboard/services/planned/addService"
        >
          <ListItem button key={"AddPlannedServices"}>
            <ListItemIcon>
              <Event />
            </ListItemIcon>
            <ListItemText primary={"Dodaj planowany serwis"} />
          </ListItem>
        </Link>
        <Divider />
        <Link className={classes.menuLinks} to="/dashboard/reports">
          <ListItem button key={"Reports"}>
            <ListItemIcon>
              <Assessment />
            </ListItemIcon>
            <ListItemText primary={"Raporty"} />
          </ListItem>
        </Link>
      </List>
    </>
  );
}
