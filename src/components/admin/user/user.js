import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider, Paper } from "@material-ui/core";
import { Email, PermIdentity, PhoneAndroid } from "@material-ui/icons";
import axios from "axios";
import { API_URL } from "../../../API/api";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 4,
    padding: theme.spacing(1),
  },
  userTitleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userTitle: {
    fontSize: "2rem",
  },
  userAddButton: {
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
  userContainer: {
    display: "flex",
    marginTop: theme.spacing(1),
  },
  userDisplay: {
    flex: 1,
    padding: theme.spacing(2),
    marginRight: theme.spacing(8),
  },
  userEdit: {
    flex: 2,
    padding: theme.spacing(2),
  },
  userDisplayTop: {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
  },
  userDisplayUsername: {
    fontSize: "1.4rem",
    fontWeight: 900,
  },
  userDisplayRole: {
    fontSize: "1.2rem",
    fontWeight: 400,
    color: "#9b9b9b",
  },
  userDisplayBottom: {
    marginTop: theme.spacing(2),
  },
  userShowTitle: {
    fontSize: "1.2rem",
    fontWeight: 600,
    color: "#9b9b9b",
  },
  userShowInfo: {
    display: "flex",
    margin: theme.spacing(4),
    alignItems: "center",
  },

  userShowIcon: {
    fontSize: "2rem",
  },

  userShowInfoTitle: {
    marginLeft: theme.spacing(2),
  },
}));

export default function User(props) {
  const [data, setData] = useState({});
  const classes = useStyles();

  const params = useParams();
  const idUser = params.id;

  const getUserList = (idUser) => {
    axios.get(API_URL + "usersData/" + idUser).then((response) => {
      const users = response.data;
      setData(users);
      console.log(users);
    });
  };

  useEffect(() => {
    getUserList(idUser);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.userTitleContainer}>
        <h1 className={classes.userTitle}> Edytuj użytkownika </h1>
        <Button className={classes.userAddButton}>Dodaj użytkownika</Button>
      </div>
      <div className={classes.userContainer}>
        <Paper className={classes.userDisplay}>
          <div className={classes.userDisplayTop}>
            <span className={classes.userDisplayUsername}>
              {data.firstName + ` ` + data.lastName}
            </span>
            <span className={classes.userDisplayRole}>
              {data.user && data.user.role}
            </span>
          </div>
          <Divider />
          <div className={classes.userDisplayBottom}>
            <span className={classes.userShowTitle}>Szczegóły</span>
            <div className={classes.userShowInfo}>
              <PermIdentity className={classes.userShowIcon} />
              <span className={classes.userShowInfoTitle}>
                {data.firstName}
              </span>
            </div>
            <div className={classes.userShowInfo}>
              <PermIdentity className={classes.userShowIcon} />
              <span className={classes.userShowInfoTitle}>{data.lastName}</span>
            </div>
            <span className={classes.userShowTitle}>Dane Kontaktowe</span>
            <div className={classes.userShowInfo}>
              <PhoneAndroid className={classes.userShowIcon} />
              <span className={classes.userShowInfoTitle}>
                {data.phoneNumber}
              </span>
            </div>
            <div className={classes.userShowInfo}>
              <Email className={classes.userShowIcon} />
              <span className={classes.userShowInfoTitle}>
                {data.user && data.user.email}
              </span>
            </div>
          </div>
        </Paper>
        <Paper className={classes.userEdit}></Paper>
      </div>
    </div>
  );
}
