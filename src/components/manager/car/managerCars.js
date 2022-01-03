import React, { useEffect, useState } from "react";
import { DataGrid, plPL } from "@material-ui/data-grid";
import { API_URL } from "../../../API/api";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontSize: "1rem",
  },
  actionButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(1),
  },
  editButton: {
    display: "flex",
    border: "none",
    borderRadius: "10px",
    marginRight: theme.spacing(1),
  },
}));

export default function ManagerCars() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  let userData = JSON.parse(localStorage.getItem("userData"));
  let companyId = userData.company.idCompany;

  const getCarList = () => {
    axios.get(API_URL + "company/" + companyId + "/cars").then((response) => {
      const cars = response.data;
      setData(cars);
      console.log(cars);
    });
  };

  const columns = [
    {
      field: "carBrand",
      headerName: "Marka",
      flex: 1,
    },
    {
      field: "carModel",
      headerName: "Model",
      flex: 1,
    },
    {
      field: "carManufactureYear",
      headerName: "Rok produkcji",
      flex: 1,
    },
    {
      field: "carType",
      headerName: "Typ samochodu",
      flex: 1,
    },
    {
      field: "engineCapacity",
      headerName: "Pojemność silnika",
      flex: 1,
    },
    {
      field: "enginePower",
      headerName: "Moc silnika",
      flex: 1,
    },
    {
      field: "plateNumber",
      headerName: "Rejestracja",
      flex: 1,
    },
  ];

  useEffect(() => {
    getCarList();
  }, []);

  return (
    <div className={classes.root}>
      <DataGrid
        className={classes.root}
        rows={data}
        columns={columns}
        pageSize={25}
        getRowId={(r) => r.idCar}
        autoHeight
        hideFooterSelectedRowCount
        localeText={plPL.props.MuiDataGrid.localeText}
      />
    </div>
  );
}
