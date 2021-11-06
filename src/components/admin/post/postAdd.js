import React, { useEffect, useState } from "react";
import "date-fns";
import { useHistory } from "react-router-dom";
import { makeStyles, Paper } from "@material-ui/core";
import axios from "axios";
import { API_URL } from "../../../API/api";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import { pl } from "date-fns/locale";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  postTitle: {
    paddingTop: theme.spacing(2),
    margin: theme.spacing(1, 8),
    fontSize: "1.5rem",
    fontWeight: 600,
  },
  postForm: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(8),
  },
  postItem: {
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
  postPickerItem: {
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
      border: "0px gray",
      borderRadius: "5px",
      color: "#9b9b9b",
    },
  },
  postItemSelect: {
    fontSize: "1.1rem",
    borderRadius: "5px",
    color: "#9b9b9b",
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  postButton: {
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

export default function PostAdd() {
  const classes = useStyles();
  let history = useHistory();
  const [companies, setCompanies] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [values, setValues] = useState({
    title: "",
    description: "",
    date: selectedDate,
    companyId: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    let formattedDate = moment(selectedDate).format("DD.MM.yyyy");
    setValues({ ...values, date: formattedDate });
  }, [selectedDate]);

  const getCompaniesList = () => {
    axios.get(API_URL + "company/").then((response) => {
      const data = response.data;
      setCompanies(data);
    });
  };

  useEffect(() => {
    getCompaniesList();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API_URL + "posts", values).then((res) => {
      if (res.data != null) {
        history.push("/dashboard/posts");
      }
    });
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <h1 className={classes.postTitle}> Nowy Post</h1>
      <form className={classes.postForm} onSubmit={handleSubmit}>
        <div className={classes.postItem}>
          <label>Tytuł</label>
          <input
            type="text"
            placeholder="Podaj tytuł"
            onChange={handleChange("title")}
          />
        </div>
        <div className={classes.postItem}>
          <label>Opis</label>
          <input
            type="text"
            placeholder="Opis"
            onChange={handleChange("description")}
          />
        </div>
        <div className={classes.postItem}>
          <label>Wybierz firmę</label>
          <select
            className={classes.postItemSelect}
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
        <div className={classes.postPickerItem}>
          <label>Data</label>
          <MuiPickersUtilsProvider locale={pl} utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              variant="inline"
              inputVariant="outlined"
              format="dd.MM.yyyy"
              value={selectedDate}
              InputAdornmentProps={{ position: "start" }}
              onChange={(date) => handleDateChange(date)}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.postItem}>
          <button type="submit" className={classes.postButton}>
            Dodaj Post
          </button>
        </div>
      </form>
    </Paper>
  );
}
