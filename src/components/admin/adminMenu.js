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
  SpeakerNotes,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menuLinks: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function AdminMenu() {
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
        <Link className={classes.menuLinks} to="/dashboard/companies">
          <ListItem button key={"Companies"}>
            <ListItemIcon>
              <Business />
            </ListItemIcon>
            <ListItemText primary={"Firmy"} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link className={classes.menuLinks} to="/dashboard/users/addUser">
          <ListItem button key={"AddUsers"}>
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            <ListItemText primary={"Dodaj Użytkownika"} />
          </ListItem>
        </Link>
        <Link className={classes.menuLinks} to="/dashboard/cars/addCar">
          <ListItem button key={"AddCars"}>
            <ListItemIcon>
              <AddBox />
            </ListItemIcon>
            <ListItemText primary={"Dodaj Samochód"} />
          </ListItem>
        </Link>
        <Link
          className={classes.menuLinks}
          to="/dashboard/companies/addAddress"
        >
          <ListItem button key={"AddCompanies"}>
            <ListItemIcon>
              <AddCircle />
            </ListItemIcon>
            <ListItemText primary={"Dodaj Firmę"} />
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
