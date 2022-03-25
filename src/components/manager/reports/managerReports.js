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
  selectContainer: {
    padding: theme.spacing(2),
    width: "50%",
    margin: "auto",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 600,
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
  generateButton: {
    border: "none",
    borderRadius: "5px",
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    fontSize: "1rem",
    backgroundColor: "#ff0000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#e80606",
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
    dateFrom: moment(dateFrom).format("yyyy-MM-DD"),
    dateTo: moment(dateTo).format("yyyy-MM-DD"),
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
    let formattedDateFrom = moment(dateFrom).format("yyyy-MM-DD");
    setDates({ ...dates, dateFrom: formattedDateFrom });
  }, [dateFrom]);

  useEffect(() => {
    let formattedDate = moment(dateTo).format("yyyy-MM-DD");
    setDates({ ...dates, dateTo: formattedDate });
  }, [dateTo]);

  return (
    <Paper elevation={3} className={classes.selectContainer}>
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
        <div className={classes.item}>
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
        <div className={classes.item}>
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
          <button type="submit" className={classes.generateButton}>
            Dalej >
          </button>
        </div>
      </form>
    </Paper>
  );
}
