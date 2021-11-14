import React, { useEffect, useState } from "react";
import { useStyles } from "../../stylesForEdit";
import moment from "moment";
import axios from "axios";
import { API_URL } from "../../../API/api";
import { Link, useParams } from "react-router-dom";
import { Button, Divider, Paper } from "@material-ui/core";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { pl } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";

export default function PlannedService(props) {
  const [data, setData] = useState({});
  const [selectedDate, setSelectedDate] = useState();
  const [inputData, setInputData] = useState({});
  const params = useParams();
  const idPlanned = params.id;
  const classes = useStyles();

  const handleChange = (prop) => (event) => {
    setInputData({ ...inputData, [prop]: event.target.value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    let formattedDate = moment(selectedDate).format("yyyy-MM-DDThh:mm:ss");
    setInputData({ ...inputData, date: formattedDate });
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(API_URL + "planned/" + idPlanned, inputData).then((response) => {
      if (response.data != null) {
        alert("Planowany serwis zaaktualizowano pomyślnie.");
      }
    });
  };

  const getPlannedList = (idPlanned) => {
    axios.get(API_URL + "planned/" + idPlanned).then((response) => {
      const planned = response.data;
      planned.carId = planned.car.idCar;
      setData(planned);
      setInputData(planned);
    });
  };

  useEffect(() => {
    getPlannedList(idPlanned);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <h1 className={classes.title}> Edytuj planowany serwis </h1>
        <Button className={classes.addButton}>
          <Link
            to="/dashboard/services/planned/addService"
            className={classes.buttonLink}
          >
            Dodaj planowany serwis
          </Link>
        </Button>
      </div>
      <div className={classes.container}>
        <Paper className={classes.dataDisplay} elevation={5}>
          <div className={classes.dataDisplayTop}>
            <span className={classes.dataDisplayHeading}>Planowany serwis</span>
            <span className={classes.dataDisplaySubHeading}>
              {moment(data.date).format("DD.MM.yyyy")}
            </span>
          </div>
          <Divider />
          <div className={classes.dataDisplayBottom}>
            <span className={classes.dataShowTitle}>Szczegóły</span>
            <div className={classes.dataShowInfo}>
              <span className={classes.dataItemTitle}>Data : </span>
              <span className={classes.dataShowInfoTitle}>
                {moment(data.date).format("DD.MM.yyyy hh:mm")}
              </span>
            </div>
            <div className={classes.dataShowInfo}>
              <span className={classes.dataItemTitle}>Opis : </span>
              <span className={classes.dataShowInfoTitle}>
                {data.description}
              </span>
            </div>
          </div>
        </Paper>
        <Paper className={classes.dataEdit} elevation={5}>
          <span className={classes.dataEditTitle}>Edycja danych</span>
          <form className={classes.editForm} onSubmit={handleSubmit}>
            <div className={classes.editLeft}>
              <div className={classes.editItem}>
                <label> Opis </label>
                <textarea
                  name={"description"}
                  placeholder={data.description}
                  className={classes.editInputArea}
                  onChange={handleChange("description")}
                />
              </div>
              <div className={classes.editItem}>
                <label> Data </label>
                <MuiPickersUtilsProvider locale={pl} utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    autoOk
                    ampm={false}
                    cancelLabel={"Anuluj"}
                    variant="dialog"
                    inputVariant="standard"
                    format="dd.MM.yyyy HH:mm"
                    value={selectedDate}
                    className={classes.editInputDatePicker}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={(date) => handleDateChange(date)}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className={classes.editRight}>
              <img
                className={classes.editImg}
                src={process.env.PUBLIC_URL + "/assets/pic6.png"}
                alt={""}
              />
              <button type={"submit"} className={classes.updateButton}>
                Aktualizuj
              </button>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
}
