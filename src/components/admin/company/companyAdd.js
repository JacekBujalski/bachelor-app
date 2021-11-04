import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, Paper } from "@material-ui/core";
import axios from "axios";
import { API_URL } from "../../../API/api";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  addressTitle: {
    paddingTop: theme.spacing(2),
    margin: theme.spacing(1, 8),
    fontSize: "1.5rem",
    fontWeight: 600,
  },
  addressForm: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(8),
  },
  addressItem: {
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
  addressButton: {
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

export default function CompanyAdd() {
  const classes = useStyles();
  let history = useHistory();
  const [values, setValues] = useState({
    name: "",
    nip: "",
    addressId: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setValues({ ...values, addressId: localStorage.getItem("addressId") });
    }, 2500);
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API_URL + "company", values).then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("addressId");
        alert("Firma dodana pomyślnie");
        setTimeout(() => {
          history.push("/dashboard/companies");
        }, 1000);
      }
    });
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <h1 className={classes.addressTitle}> Nowa Firma</h1>
      <form className={classes.addressForm} onSubmit={handleSubmit}>
        <div className={classes.addressItem}>
          <label>Nazwa firmy</label>
          <input
            type="text"
            placeholder="Podaj nazwę firmy"
            onChange={handleChange("name")}
          />
        </div>
        <div className={classes.addressItem}>
          <label>NIP</label>
          <input
            type="text"
            placeholder="Podaj nip firmy"
            onChange={handleChange("nip")}
          />
        </div>
        <div className={classes.addressItem}>
          <button type="submit" className={classes.addressButton}>
            Dodaj Firmę
          </button>
        </div>
      </form>
    </Paper>
  );
}
