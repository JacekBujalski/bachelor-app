import React, { useEffect, useState } from "react";
import { makeStyles, Paper } from "@material-ui/core";
import axios from "axios";
import { API_URL } from "../API/api";
import { useHistory } from "react-router-dom";
import moment from "moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { pl } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  selectContainer: {
    padding: theme.spacing(2),
    width: "50%",
    margin: "auto",
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

export default function ReportPage(props) {
  let history = useHistory();
  const classes = useStyles();
  const [companies, setCompanies] = useState([]);
  const [showCarSelect, setShowCarSelect] = useState(false);
  const [cars, setCars] = useState({});
  const [values, setValues] = useState({});
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [dates, setDates] = useState({
    dateFrom: moment(dateFrom).format("yyyy-MM-DD"),
    dateTo: moment(dateTo).format("yyyy-MM-DD"),
  });

  const getCompaniesList = () => {
    axios.get(API_URL + "company/").then((response) => {
      const data = response.data;
      setCompanies(data);
    });
  };

  const getCarsList = (companyId) => {
    axios.get(API_URL + "company/" + companyId + "/cars").then((response) => {
      const data = response.data;
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

  const handleDateFromChange = (date) => {
    setDateFrom(date);
  };

  const handleDateToChange = (date) => {
    setDateTo(date);
  };

  useEffect(() => {
    let formattedDateFrom = moment(dateFrom).format("yyyy-MM-DD");
    setDates({ ...dates, dateFrom: formattedDateFrom });
  }, [dateFrom]);

  useEffect(() => {
    let formattedDate = moment(dateTo).format("yyyy-MM-DD");
    setDates({ ...dates, dateTo: formattedDate });
  }, [dateTo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("dateTo", dates.dateTo);
    localStorage.setItem("dateFrom", dates.dateFrom);

    if (values.reportType === "fueling") {
      history.push("/dashboard/reports/fueling/" + values.carId);
    } else if (values.reportType === "services") {
      history.push("/dashboard/reports/services/" + values.carId);
    } else if (values.reportType === "damages") {
      history.push("/dashboard/reports/damages/" + values.carId);
    }
  };

  return (
    <Paper elevation={3} className={classes.selectContainer}>
      <form onSubmit={handleSubmit}>
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
          </>
        ) : (
          <>
            <h1 className={classes.errorMessage}> Brak samochodów w firmie</h1>
          </>
        )}
      </form>
    </Paper>
  );
}
