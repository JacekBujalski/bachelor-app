import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider, Paper } from "@material-ui/core";
import { Email, PermIdentity, PhoneAndroid } from "@material-ui/icons";
import axios from "axios";
import { API_URL } from "../../../API/api";
import { Link, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
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
  buttonLink: {
    textDecoration: "none",
    color: "inherit",
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
  userEditLeft: {
    flex: 2,
  },
  userEditTitle: {
    fontSize: "1.4rem",
    fontWeight: "600",
  },
  userEditForm: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(4),
  },
  userEditItem: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(4),
    "& label": {
      marginBottom: theme.spacing(2),
      fontSize: "1.1rem",
    },
  },
  userEditInput: {
    border: "none",
    fontSize: "1.2rem",
    width: "15vw",
    height: 30,
    borderBottom: "1px solid gray",
  },
  userEditImg: {
    width: 250,
    height: 250,
  },
  userEditRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  userUpdateButton: {
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

export default function User(props) {
  const [data, setData] = useState({});
  const [inputData, setInputData] = useState({});
  const classes = useStyles();

  const handleChange = (prop) => (event) => {
    setInputData({ ...inputData, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(API_URL + "usersData/" + idUser, inputData).then((response) => {
      if (response.data != null) {
        alert("Dane użytkownika zaaktualizowano pomyślnie.");
      }
    });
  };

  const params = useParams();
  const idUser = params.id;

  const getUserList = (idUser) => {
    axios.get(API_URL + "usersData/" + idUser).then((response) => {
      const users = response.data;
      users.userId = users.user.idUsers;
      users.companyId = users.company.idCompany;
      setData(users);
      setInputData(users);
    });
  };

  useEffect(() => {
    getUserList(idUser);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.userTitleContainer}>
        <h1 className={classes.userTitle}> Edytuj użytkownika </h1>
        <Button className={classes.userAddButton}>
          <Link to="/dashboard/users/addUser" className={classes.buttonLink}>
            Dodaj użytkownika
          </Link>
        </Button>
      </div>
      <div className={classes.userContainer}>
        <Paper className={classes.userDisplay} elevation={5}>
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
        <Paper className={classes.userEdit} elevation={5}>
          <span className={classes.userEditTitle}>Edycja danych</span>
          <form className={classes.userEditForm} onSubmit={handleSubmit}>
            <div className={classes.userEditLeft}>
              <div className={classes.userEditItem}>
                <label> Imie </label>
                <input
                  name={"firstName"}
                  type="text"
                  placeholder={data.firstName}
                  defaultValue={inputData.firstName}
                  className={classes.userEditInput}
                  onChange={handleChange("firstName")}
                />
              </div>
              <div className={classes.userEditItem}>
                <label> Nazwisko </label>
                <input
                  name={"lastName"}
                  type="text"
                  placeholder={data.lastName}
                  defaultValue={inputData.lastName}
                  className={classes.userEditInput}
                  onChange={handleChange("lastName")}
                />
              </div>
              <div className={classes.userEditItem}>
                <label> Numer Telefonu </label>
                <input
                  name={"phoneNumber"}
                  type="text"
                  placeholder={data.phoneNumber}
                  defaultValue={inputData.phoneNumber}
                  className={classes.userEditInput}
                  onChange={handleChange("phoneNumber")}
                />
              </div>
            </div>
            <div className={classes.userEditRight}>
              <img
                className={classes.userEditImg}
                src={process.env.PUBLIC_URL + "/assets/pic.png"}
                alt={""}
              />
              <button type={"submit"} className={classes.userUpdateButton}>
                Aktualizuj
              </button>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
}
