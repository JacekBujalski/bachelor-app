import React, { createRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../API/api";
import { makeStyles } from "@material-ui/core/styles";
import Pdf from "react-to-pdf";
import { DataGrid, plPL } from "@material-ui/data-grid";
import moment from "moment";
import { useStyles } from "./reportStyles";
import "moment/locale/pl";
moment.locale("pl");

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
    field: "fuelQuantity",
    headerName: "Ilość",
    flex: 1,
  },
  {
    field: "fuelCost",
    headerName: "Koszt",
    flex: 0.6,
  },
];

export default function ManagerFuelingReport() {
  const [data, setData] = useState({});
  const [fuelings, setFuelings] = useState([]);
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

  const getFuelingInfo = (idCar, startDate, endDate) => {
    axios
      .get(
        API_URL +
          "car/" +
          idCar +
          "/refueling?from_date=" +
          startDate +
          "&to_date=" +
          endDate
      )
      .then((response) => {
        const fuel = response.data;
        setFuelings(fuel);
      });
  };

  useEffect(() => {
    getCarInfo(idCar);
  }, [idCar]);

  useEffect(() => {
    getFuelingInfo(idCar, startDate, endDate);
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
            Raport tankowań dla auta :{" "}
            {" " + data.carBrand + ` ` + data.carModel + " " + data.plateNumber}{" "}
            <br />
            Od: {moment(startDate).format("DD MMMM yyyy")}
            <br />
            Do: {moment(endDate).format("DD MMMM yyyy")}
          </h1>
          <DataGrid
            className={classes.dataGrid}
            rows={fuelings}
            columns={columns}
            hideFooter={true}
            getRowId={(r) => r.idRefueling}
            autoHeight
            hideFooterSelectedRowCount
            localeText={plPL.props.MuiDataGrid.localeText}
          />
          <div className={classes.generated}>Wygenerowano: {today} </div>
        </div>
        <Pdf
          targetRef={ref}
          filename={
            "Raport-tankowanie-" +
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
