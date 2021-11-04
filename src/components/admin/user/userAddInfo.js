import React, { useEffect, useState } from "react";
import { makeStyles, Paper } from "@material-ui/core";
import axios from "axios";
import { API_URL } from "../../../API/api";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  userInfoTitle: {
    paddingTop: theme.spacing(2),
    margin: theme.spacing(1, 8),
    fontSize: "1.5rem",
    fontWeight: 600,
  },
  userInfoForm: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(8),
  },
  userInfoItem: {
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
  userInfoItemSelect: {
    fontSize: "1.1rem",
    borderRadius: "5px",
    color: "#9b9b9b",
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  userInfoButton: {
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

export default function UserAddInfo() {
  const classes = useStyles();
  const history = useHistory();
  const [companies, setCompanies] = useState([]);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    userId: "",
    companyId: "",
  });

  const getCompaniesList = () => {
    axios.get(API_URL + "company/").then((response) => {
      const data = response.data;
      setCompanies(data);
    });
  };

  useEffect(() => {
    getCompaniesList();

    setTimeout(() => {
      setValues({ ...values, userId: localStorage.getItem("usersId") });
    }, 2500);
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API_URL + "usersData", values).then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("usersId");
        alert("Użytkownik dodany pomyślnie");
        setTimeout(() => {
          history.push("/dashboard/users");
        }, 1000);
      }
    });
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <h1 className={classes.userInfoTitle}> Dane Użytkownika</h1>
      <form className={classes.userInfoForm} onSubmit={handleSubmit}>
        <div className={classes.userInfoItem}>
          <label>Imię</label>
          <input
            type="text"
            placeholder="Podaj imię użytkownika"
            onChange={handleChange("firstName")}
          />
        </div>
        <div className={classes.userInfoItem}>
          <label>Nazwisko</label>
          <input
            type="text"
            placeholder="Podaj nazwisko użytkownika"
            onChange={handleChange("lastName")}
          />
        </div>
        <div className={classes.userInfoItem}>
          <label>Numer Telefonu</label>
          <input
            type="text"
            placeholder="Podaj numer telefonu"
            onChange={handleChange("phoneNumber")}
          />
        </div>
        <div className={classes.userInfoItem}>
          <label>Wybierz firmę</label>
          <select
            className={classes.userInfoItemSelect}
            onChange={handleChange("companyId")}
          >
            <option> Wybierz firmę</option>
            {companies.map((company) => (
              <option key={company.idCompany} value={company.idCompany}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.userInfoItem}>
          <button type="submit" className={classes.userInfoButton}>
            Stwórz użytkownika
          </button>
        </div>
      </form>
    </Paper>
  );
}
