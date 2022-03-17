import React, { createRef, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../API/api";
import { useStyles } from "./reportStyles";
import { useParams } from "react-router-dom";
import moment from "moment";

import Pdf from "react-to-pdf";
import { DataGrid, plPL } from "@material-ui/data-grid";

const columns = [
  {
    field: "date",
    headerName: "Data tankowania",
    flex: 1,
  },
  {
    field: "mileage",
    headerName: "Przebieg",
    flex: 1,
  },
  {
    field: "description",
    headerName: "Opis usterki",
    flex: 1,
  },
];

export default function ManagerServicesReport() {
  const [data, setData] = useState({});
  const [services, setServices] = useState([]);
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

  const getServicesInfo = (idCar, startDate, endDate) => {
    axios
      .get(
        API_URL +
          "car/" +
          idCar +
          "/service?from_date=" +
          startDate +
          "&to_date=" +
          endDate
      )
      .then((response) => {
        const service = response.data;
        setServices(service);
      });
  };

  useEffect(() => {
    getCarInfo(idCar);
  }, [idCar]);

  useEffect(() => {
    getServicesInfo(idCar, startDate, endDate);
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
          <DataGrid
            className={classes.dataGrid}
            rows={services}
            columns={columns}
            hideFooter={true}
            getRowId={(r) => r.idServices}
            autoHeight
            hideFooterSelectedRowCount
            localeText={plPL.props.MuiDataGrid.localeText}
          />
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
