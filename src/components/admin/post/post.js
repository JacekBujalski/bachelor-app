import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider, Paper } from "@material-ui/core";
import axios from "axios";
import { API_URL } from "../../../API/api";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { pl } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  postTitleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postTitle: {
    fontSize: "2rem",
  },
  postAddButton: {
    border: "none",
    borderRadius: "5px",
    padding: theme.spacing(1),
    fontSize: "1rem",
    backgroundColor: "#ff0000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#e80606",
    },
  },
  buttonLink: {
    textDecoration: "none",
    color: "inherit",
  },
  postContainer: {
    display: "flex",
    marginTop: theme.spacing(1),
  },
  postDisplay: {
    flex: 1.5,
    padding: theme.spacing(2),
    marginRight: theme.spacing(8),
  },
  postEdit: {
    flex: 2,
    padding: theme.spacing(2),
  },
  postDisplayTop: {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
  },
  postDisplayHeading: {
    fontSize: "1.4rem",
    fontWeight: 900,
  },
  postDisplayCompany: {
    fontSize: "1.2rem",
    fontWeight: 400,
    color: "#9b9b9b",
  },
  postDisplayBottom: {
    marginTop: theme.spacing(2),
  },
  postShowTitle: {
    fontSize: "2rem",
    fontWeight: 600,
    color: "#9b9b9b",
  },
  postShowInfo: {
    display: "flex",
    margin: theme.spacing(4),
    alignItems: "center",
  },

  postItemTitle: {
    fontSize: "1.8rem",
    flex: 0.3,
  },

  postShowInfoTitle: {
    flex: 1,
    fontSize: "1.8rem",
    marginLeft: theme.spacing(2),
  },
  postEditLeft: {
    flex: 2,
  },
  postEditTitle: {
    fontSize: "1.4rem",
    fontWeight: "600",
  },
  postEditForm: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(4),
  },
  postEditItem: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(4),
    "& label": {
      marginBottom: theme.spacing(2),
      fontSize: "1.1rem",
    },
  },
  postEditInput: {
    border: "none",
    fontSize: "1.2rem",
    minWidth: "15vw",
    maxWidth: "15vw",
    height: 30,
    borderBottom: "1px solid gray",
  },
  postEditInputArea: {
    border: "none",
    fontSize: "1.2rem",
    minWidth: "15vw",
    maxWidth: "15vw",
    minHeight: 90,
    borderBottom: "1px solid gray",
  },
  postEditInputDatePicker: {
    border: "none",
    fontSize: "1.2rem",
    width: "15vw",
    height: 90,
  },
  postEditImg: {
    width: 250,
    height: 250,
  },
  postEditRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  postUpdateButton: {
    border: "none",
    borderRadius: "5px",
    padding: theme.spacing(1),
    fontSize: "1rem",
    backgroundColor: "#ff0000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#e80606",
    },
  },
}));

export default function Post(props) {
  const [data, setData] = useState({});
  const [selectedDate, setSelectedDate] = useState();
  const [inputData, setInputData] = useState({});

  const classes = useStyles();

  const handleChange = (prop) => (event) => {
    setInputData({ ...inputData, [prop]: event.target.value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
  };

  useEffect(() => {
    let formattedDate = moment(selectedDate).format("DD.MM.yyyy");
    setInputData({ ...inputData, date: formattedDate });
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(API_URL + "posts/" + idPost, inputData).then((response) => {
      if (response.data != null) {
        alert("Post zaaktualizowano pomyślnie.");
      }
    });
  };

  const params = useParams();
  const idPost = params.id;

  const getPostList = (idUser) => {
    axios.get(API_URL + "posts/" + idPost).then((response) => {
      const posts = response.data;
      posts.companyId = posts.company.idCompany;
      setData(posts);
      setInputData(posts);
      setInputData({
        ...inputData,
        date: moment(data.date).format("DD.MM.yyyy"),
      });
    });
  };

  useEffect(() => {
    getPostList(idPost);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.postTitleContainer}>
        <h1 className={classes.postTitle}> Edytuj post </h1>
        <Button className={classes.postAddButton}>
          <Link to="/dashboard/posts/addPost" className={classes.buttonLink}>
            Dodaj post
          </Link>
        </Button>
      </div>
      <div className={classes.postContainer}>
        <Paper className={classes.postDisplay} elevation={5}>
          <div className={classes.postDisplayTop}>
            <span className={classes.postDisplayHeading}>{data.title}</span>
            <span className={classes.postDisplayCompany}>
              {moment(data.date).format("DD.MM.yyyy")}
            </span>
          </div>
          <Divider />
          <div className={classes.postDisplayBottom}>
            <span className={classes.postShowTitle}>Szczegóły</span>
            <div className={classes.postShowInfo}>
              <span className={classes.postItemTitle}>Tytuł : </span>
              <span className={classes.postShowInfoTitle}>{data.title}</span>
            </div>
            <div className={classes.postShowInfo}>
              <span className={classes.postItemTitle}>Data : </span>
              <span className={classes.postShowInfoTitle}>
                {moment(data.date).format("DD.MM.yyyy")}
              </span>
            </div>
            <div className={classes.postShowInfo}>
              <span className={classes.postItemTitle}>Opis : </span>
              <span className={classes.postShowInfoTitle}>
                {data.description}
              </span>
            </div>
          </div>
        </Paper>
        <Paper className={classes.postEdit} elevation={5}>
          <span className={classes.postEditTitle}>Edycja danych</span>
          <form className={classes.postEditForm} onSubmit={handleSubmit}>
            <div className={classes.postEditLeft}>
              <div className={classes.postEditItem}>
                <label> Tytuł </label>
                <input
                  name={"title"}
                  type="text"
                  placeholder={data.title}
                  className={classes.postEditInput}
                  onChange={handleChange("title")}
                />
              </div>
              <div className={classes.postEditItem}>
                <label> Opis </label>
                <textarea
                  name={"lastName"}
                  placeholder={data.description}
                  className={classes.postEditInputArea}
                  onChange={handleChange("lastName")}
                />
              </div>
              <div className={classes.postEditItem}>
                <label> Data </label>
                <MuiPickersUtilsProvider locale={pl} utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    cancelLabel={"Anuluj"}
                    variant="dialog"
                    inputVariant="standard"
                    format="dd.MM.yyyy"
                    value={selectedDate}
                    className={classes.postEditInputDatePicker}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={(date) => handleDateChange(date)}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className={classes.postEditRight}>
              <img
                className={classes.postEditImg}
                src={process.env.PUBLIC_URL + "/assets/pic3.png"}
                alt={""}
              />
              <button type={"submit"} className={classes.postUpdateButton}>
                Aktualizuj
              </button>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
}
