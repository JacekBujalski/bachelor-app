import React, { useEffect, useState } from "react";
import { makeStyles, Paper } from "@material-ui/core";
import axios from "axios";
import { API_URL } from "../API/api";
import { Route, Switch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  selectContainer: {
    padding: theme.spacing(2),
  },
  item: {
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
  },
  itemSelect: {
    fontSize: "1.1rem",
    borderRadius: "5px",
    color: "#9b9b9b",
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  errorMessage: {
    marginTop: theme.spacing(4),
    fontSize: "1.4rem",
    color: "#d32f2f",
  },
}));

export default function ReportPage(props) {
  const classes = useStyles();
  const [companies, setCompanies] = useState([]);
  const [showCarSelect, setShowCarSelect] = useState(false);
  const [cars, setCars] = useState({});
  const [values, setValues] = useState({});
  const reportType = ["Raport tankowań", "Raport uszkodzeń", "Raport serwisów"];

  const getCompaniesList = () => {
    axios.get(API_URL + "company/").then((response) => {
      const data = response.data;
      setCompanies(data);
    });
  };

  const getCarsList = (companyId) => {
    axios.get(API_URL + "company/" + companyId + "/cars").then((response) => {
      const data = response.data;
      console.log(data);
      setCars(data);
      if (Array.isArray(data) && data.length) {
        setShowCarSelect(true);
      } else {
        setShowCarSelect(false);
      }
    });
  };

  useEffect(() => {
    getCompaniesList();
  }, []);

  useEffect(() => {
    if (values.companyId != null) {
      getCarsList(values.companyId);
    }
  }, [values.companyId]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Paper elevation={3} className={classes.selectContainer}>
      <div className={classes.item}>
        <label>Wybierz firmę</label>
        <select
          className={classes.itemSelect}
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
      {showCarSelect && cars ? (
        <>
          <div className={classes.item}>
            <label>Wybierz samochód</label>
            <select
              className={classes.itemSelect}
              onChange={handleChange("carId")}
            >
              <option> Wybierz samochód</option>
              {cars.map((car) => (
                <option key={car.idCar} value={car.idCar}>
                  {`${car.carBrand} ${car.carModel} ${car.plateNumber}`}
                </option>
              ))}
            </select>
          </div>
          <div className={classes.item}>
            <label>Wybierz typ raportu</label>
            <select
              className={classes.itemSelect}
              onChange={handleChange("reportType")}
            >
              <option> Wybierz typ raportu</option>
              {reportType.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
              )}
            </select>
          </div>
        </>
      ) : (
        <>
          <h1 className={classes.errorMessage}> Brak samochodów w firmie</h1>
        </>
      )}
    </Paper>
  );
}
