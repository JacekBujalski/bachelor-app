import React, { createRef, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../API/api";
import { useStyles } from "./reportStyles";
import { useParams } from "react-router-dom";
import moment from "moment";

import Pdf from "react-to-pdf";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

export default function DamagesReport() {
  const [data, setData] = useState({});
  const [damages, setDamages] = useState([]);
  const ref = createRef();
  const classes = useStyles();
  const params = useParams();
  const idCar = params.id;
  const startDate = localStorage.getItem("dateFrom");
  const endDate = localStorage.getItem("dateTo");
  let today = moment().format("DD MMMM yyyy[r,] kk:mm");

  const getCarInfo = (idCar) => {
    axios.get(API_URL + "car/" + idCar).then((response) => {
      const car = response.data;
      setData(car);
    });
  };

  const getDamagesInfo = (idCar, startDate, endDate) => {
    axios
      .get(
        API_URL +
          "car/" +
          idCar +
          "/damage?from_date=" +
          startDate +
          "&to_date=" +
          endDate
      )
      .then((response) => {
        const damages = response.data;
        setDamages(damages);
      });
  };

  useEffect(() => {
    getCarInfo(idCar);
  }, [idCar]);

  useEffect(() => {
    getDamagesInfo(idCar, startDate, endDate);
  }, [data, startDate, endDate]);

  const printOptions = {
    orientation: "landscape",
    scale: "0.1",
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.paper} ref={ref}>
          <h1 className={classes.title}>
            Raport serwisów dla auta :
            {" " + data.carBrand + ` ` + data.carModel + " " + data.plateNumber}{" "}
            <br />
            Od: {moment(startDate).format("DD MMMM yyyy")}
            <br />
            Do: {moment(endDate).format("DD MMMM yyyy")}
          </h1>
          <div className={classes.damages}>
            {damages.map((damage, idDamage) => (
              <div className={classes.div} key={idDamage}>
                <Card classname={classes.card}>
                  <CardMedia
                    className={classes.media}
                    component="img"
                    height="140"
                    alt="Zdjęcie uszkodzenia"
                    image={
                      process.env.PUBLIC_URL + "/assets/photodamages/image1.jpg"
                    }
                  />
                  <CardContent>
                    <Typography className={classes.damageTitle}>
                      {moment(damage.date).format("DD MMMM yyyy")}
                    </Typography>
                    <Typography>
                      Opis usterki: <br />
                      {damage.description}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <div className={classes.generated}>Wygenerowano: {today} </div>
        </div>
        <Pdf
          targetRef={ref}
          filename={
            "Raport-serwisow-" +
            data.plateNumber +
            "-" +
            startDate +
            "-" +
            endDate
          }
          options={printOptions}
        >
          {({ toPdf }) => (
            <button className={classes.pdfButton} onClick={toPdf}>
              Generuj raport
            </button>
          )}
        </Pdf>
      </div>
    </>
  );
}
