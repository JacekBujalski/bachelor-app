import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, Paper } from "@material-ui/core";
import axios from "axios";
import { API_URL } from "../../../API/api";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  carTitle: {
    paddingTop: theme.spacing(2),
    margin: theme.spacing(1, 8),
    fontSize: "1.5rem",
    fontWeight: 600,
  },
  carForm: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(8),
  },
  carItem: {
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
  carItemSelect: {
    fontSize: "1.1rem",
    borderRadius: "5px",
    color: "#9b9b9b",
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  carButton: {
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

export default function CarAdd() {
  const classes = useStyles();
  let history = useHistory();
  const [companies, setCompanies] = useState([]);
  const [values, setValues] = useState({
    carBrand: "",
    carModel: "",
    carManufactureYear: "",
    carType: "",
    engineCapacity: "",
    enginePower: "",
    plateNumber: "",
    isTaken: "",
    companyId: "",
    insuranceId: "",
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
      setValues({
        ...values,
        insuranceId: localStorage.getItem("insuranceId"),
      });
    }, 2500);
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API_URL + "car", values).then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("insuranceId");
        alert("Auto dodane pomyślnie");
        setTimeout(() => {
          history.push("/dashboard/cars");
        }, 1000);
      }
    });
  };

  const taken = [0, 1];

  return (
    <Paper elevation={3} className={classes.root}>
      <h1 className={classes.carTitle}> Nowy Samochód</h1>
      <form className={classes.carForm} onSubmit={handleSubmit}>
        <div className={classes.carItem}>
          <label>Marka</label>
          <input
            type="text"
            placeholder="Podaj markę auta"
            onChange={handleChange("carBrand")}
          />
        </div>
        <div className={classes.carItem}>
          <label>Model</label>
          <input
            type="text"
            placeholder="Podaj model auta"
            onChange={handleChange("carModel")}
          />
        </div>
        <div className={classes.carItem}>
          <label>Rok produkcji</label>
          <input
            type="text"
            placeholder="Podaj rok produkcji auta"
            onChange={handleChange("carManufactureYear")}
          />
        </div>
        <div className={classes.carItem}>
          <label>Typ samochodu</label>
          <input
            type="text"
            placeholder="Podaj typ samochodu"
            onChange={handleChange("carType")}
          />
        </div>
        <div className={classes.carItem}>
          <label>Pojemność silnika</label>
          <input
            type="text"
            placeholder="Podaj pojemność silnika"
            onChange={handleChange("engineCapacity")}
          />
        </div>
        <div className={classes.carItem}>
          <label>Moc silnika</label>
          <input
            type="text"
            placeholder="Podaj moc silnika"
            onChange={handleChange("enginePower")}
          />
        </div>
        <div className={classes.carItem}>
          <label>Rejestracja</label>
          <input
            type="text"
            placeholder="Podaj rejestrację"
            onChange={handleChange("plateNumber")}
          />
        </div>
        <div className={classes.carItem}>
          <label>Czy zajęty</label>
          <select
            className={classes.carItemSelect}
            onChange={handleChange("isTaken")}
          >
            <option> Czy samochód jest zajęty?</option>
            {taken.map((taken) => (
              <option key={taken} value={taken}>
                {taken && taken === 1 ? "tak" : "nie"}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.carItem}>
          <label>Wybierz firmę</label>
          <select
            className={classes.carItemSelect}
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
        <div className={classes.carItem}>
          <button type="submit" className={classes.carButton}>
            Dodaj Firmę
          </button>
        </div>
      </form>
    </Paper>
  );
}
