import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Paper } from "@material-ui/core";
import axios from "axios";
import { API_URL } from "../../../API/api";
import { useHistory } from "react-router-dom";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { pl } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";
import moment, { locale } from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontSize: "1rem",
  },
  paper: {
    margin: "auto",
    flex: 0.5,
    padding: theme.spacing(2),
    textAlign: "center",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 600,
  },
  item: {
    alignItems: "center",
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
  itemSelect: {
    fontSize: "1rem",
    width: "50%",
    borderRadius: "5px",
    color: "#9b9b9b",
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  button: {
    width: "50%",
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
  picker: {
    alignItems: "center",
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
      border: "0px solid gray",
      borderRadius: "5px",
      color: "#9b9b9b",
    },
  },
}));

export default function ManagerReports() {
  const classes = useStyles();
  const history = useHistory();
  let userData = JSON.parse(localStorage.getItem("userData"));
  let companyId = userData.company.idCompany;
  const [data, setData] = useState([]);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [dates, setDates] = useState({
    dateFrom: moment(dateFrom).format("DD-MM-yyyy"),
    dateTo: moment(dateTo).format("DD-MM-yyyy"),
  });
  const [values, setValues] = useState({
    carId: "",
    reportType: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleDateFromChange = (date) => {
    setDateFrom(date);
  };

  const handleDateToChange = (date) => {
    setDateTo(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("dateTo", dates.dateTo);
    localStorage.setItem("dateFrom", dates.dateFrom);

    if (values.reportType === "fueling") {
      history.push("/dashboard/manager/reports/fueling/" + values.carId);
    } else if (values.reportType === "services") {
      history.push("/dashboard/manager/reports/services/" + values.carId);
    } else if (values.reportType === "damages") {
      history.push("/dashboard/manager/reports/damages/" + values.carId);
    }
  };

  const getCarList = () => {
    axios.get(API_URL + "company/" + companyId + "/cars").then((response) => {
      const cars = response.data;
      setData(cars);
    });
  };

  useEffect(() => {
    getCarList();
  }, []);

  useEffect(() => {
    let formattedDateFrom = moment(dateFrom).format("DD-MM-yyyy");
    setDates({ ...dates, dateFrom: formattedDateFrom });
  }, [dateFrom]);

  useEffect(() => {
    let formattedDate = moment(dateTo).format("DD-MM-yyyy");
    setDates({ ...dates, dateTo: formattedDate });
  }, [dateTo]);

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <h1 className={classes.title}>Generowanie raportu</h1>
        <Divider />
        <form onSubmit={handleSubmit}>
          <div className={classes.item}>
            <label>Wybierz samochód</label>
            <select
              className={classes.itemSelect}
              onChange={handleChange("carId")}
            >
              <option> Wybierz samochód</option>
              {data.map((car) => (
                <option key={car.idCar} value={car.idCar}>
                  {car.carBrand} {car.carModel}, {car.plateNumber}
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
              <option value={"fueling"}> Raport tankowań</option>
              <option value={"services"}> Raport serwisowy</option>
              <option value={"damages"}> Raport uszkodzeń</option>
            </select>
          </div>
          <div className={classes.picker}>
            <label>Data od</label>
            <MuiPickersUtilsProvider locale={pl} utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                cancelLabel={"Anuluj"}
                variant="dialog"
                inputVariant="outlined"
                format="dd.MM.yyyy"
                value={dateFrom}
                InputAdornmentProps={{ position: "start" }}
                onChange={(date) => handleDateFromChange(date)}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.picker}>
            <label>Data do</label>
            <MuiPickersUtilsProvider locale={pl} utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                cancelLabel={"Anuluj"}
                variant="dialog"
                inputVariant="outlined"
                format="dd.MM.yyyy"
                value={dateTo}
                InputAdornmentProps={{ position: "start" }}
                onChange={(date) => handleDateToChange(date)}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.item}>
            <button type="submit" className={classes.button}>
              Dalej >
            </button>
          </div>
        </form>
      </Paper>
    </div>
  );
}
