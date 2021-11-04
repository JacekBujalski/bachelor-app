import React, { useState } from "react";
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

export default function AddressAdd() {
  const classes = useStyles();
  let history = useHistory();
  const [values, setValues] = useState({
    country: "",
    zipCode: "",
    city: "",
    street: "",
    buildingNumber: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  let addressId;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API_URL + "address", values).then((res) => {
      if (res.data != null) {
        addressId = res.data.idAddress;
        localStorage.setItem("addressId", addressId);
        history.push("/dashboard/companies/addCompany");
      }
    });
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <h1 className={classes.addressTitle}> Nowa Firma</h1>
      <form className={classes.addressForm} onSubmit={handleSubmit}>
        <div className={classes.addressItem}>
          <label>Państwo</label>
          <input
            type="text"
            placeholder="Podaj państwo"
            onChange={handleChange("country")}
          />
        </div>
        <div className={classes.addressItem}>
          <label>Kod pocztowy</label>
          <input
            type="text"
            placeholder="Podaj kod pocztowy"
            onChange={handleChange("zipCode")}
          />
        </div>
        <div className={classes.addressItem}>
          <label>Miasto</label>
          <input
            type="text"
            placeholder="Podaj miasto"
            onChange={handleChange("city")}
          />
        </div>
        <div className={classes.addressItem}>
          <label>Ulica</label>
          <input
            type="text"
            placeholder="Podaj ulicę"
            onChange={handleChange("street")}
          />
        </div>
        <div className={classes.addressItem}>
          <label>Numer budynku</label>
          <input
            type="text"
            placeholder="Podaj numer budynku"
            onChange={handleChange("buildingNumber")}
          />
        </div>
        <div className={classes.addressItem}>
          <button type="submit" className={classes.addressButton}>
            Dodaj Adres
          </button>
        </div>
      </form>
    </Paper>
  );
}
