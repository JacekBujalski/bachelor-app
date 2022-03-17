import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../API/api";
import { Paper } from "@material-ui/core";
import { useStyles } from "../../stylesForForms";
import { pl } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";

export default function ManagerPlannedServiceAdd(props) {
  const classes = useStyles();
  let history = useHistory();
  let userData = JSON.parse(localStorage.getItem("userData"));
  let companyId = userData.company.idCompany;
  const [selectedDate, setSelectedDate] = useState();
  const [cars, setCars] = useState([]);
  const [values, setValues] = useState({
    description: "",
    date: selectedDate,
    carId: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API_URL + "planned", values).then((res) => {
      if (res.data != null) {
        history.push("/dashboard/manager/services/planned/" + values.carId);
      }
    });
  };

  const getCarsList = () => {
    axios.get(API_URL + "company/" + companyId + "/cars").then((res) => {
      const cars = res.data;
      setCars(cars);
    });
  };

  useEffect(() => {
    getCarsList();
  }, []);

  useEffect(() => {
    let formattedDate = moment(selectedDate).format("yyyy-MM-DDThh:mm:ss");
    setValues({ ...values, date: formattedDate });
  }, [selectedDate]);

  return (
    <Paper elevation={3} className={classes.root}>
      <h1 className={classes.title}> Nowy planowany serwis</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.item}>
          <label>Opis</label>
          <input
            className={classes.input}
            type="text"
            placeholder="Podaj opis"
            onChange={handleChange("description")}
          />
        </div>
        <div className={classes.item}>
          <label>Data i czas serwisu</label>
          <MuiPickersUtilsProvider locale={pl} utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              className={classes.inputDatePicker}
              autoOk
              ampm={false}
              cancelLabel={"Anuluj"}
              variant="dialog"
              inputVariant="outlined"
              format="dd.MM.yyyy HH:mm"
              value={selectedDate}
              InputProps={{ className: classes.inputDatePicker }}
              InputAdornmentProps={{ position: "start" }}
              onChange={(date) => handleDateChange(date)}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.item}>
          <label>Wybierz samochód</label>
          <select
            className={classes.itemSelect}
            onChange={handleChange("carId")}
          >
            <option> Wybierz samochód</option>
            {cars.map((car) => (
              <option key={car.idCar} value={car.idCar}>
                {car.carBrand} {car.carModel}, {car.plateNumber}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.item}>
          <button type="submit" className={classes.sendButton}>
            Dodaj planowany serwis
          </button>
        </div>
      </form>
    </Paper>
  );
}
