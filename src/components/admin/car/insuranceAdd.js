import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, Paper } from "@material-ui/core";
import axios from "axios";
import { API_URL } from "../../../API/api";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  insuranceTitle: {
    paddingTop: theme.spacing(2),
    margin: theme.spacing(1, 8),
    fontSize: "1.5rem",
    fontWeight: 600,
  },
  insuranceForm: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(8),
  },
  insuranceItem: {
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
  insuranceButton: {
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

export default function InsuranceAdd() {
  const classes = useStyles();
  let history = useHistory();
  const [values, setValues] = useState({
    assistanceNumber: "",
    policyNumber: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  let insuranceId;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API_URL + "insurance", values).then((res) => {
      if (res.data != null) {
        insuranceId = res.data.idInsurance;
        localStorage.setItem("insuranceId", insuranceId);
        history.push("/dashboard/cars/addCar");
      }
    });
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <h1 className={classes.insuranceTitle}> Nowy Samochód</h1>
      <form className={classes.insuranceForm} onSubmit={handleSubmit}>
        <div className={classes.insuranceItem}>
          <label>Numer ubezpieczenia</label>
          <input
            type="text"
            placeholder="Podaj numer ubezpieczenia"
            onChange={handleChange("policyNumber")}
          />
        </div>
        <div className={classes.insuranceItem}>
          <label>Numer telefonu ubezpieczalni</label>
          <input
            type="text"
            placeholder="Podaj numer telefonu ubezpieczalni"
            onChange={handleChange("assistanceNumber")}
          />
        </div>

        <div className={classes.insuranceItem}>
          <button type="submit" className={classes.insuranceButton}>
            Dodaj ubezpieczenie
          </button>
        </div>
      </form>
    </Paper>
  );
}
