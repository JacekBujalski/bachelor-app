import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { API_URL } from "../../../API/api";
import axios from "axios";
import { DeleteOutline, Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

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
  editLinkButton: {
    textDecoration: "none",
  },
  deleteButton: {
    color: "red",
    border: "none",
    borderRadius: "10px",
  },
}));

export default function CarTable() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const deleteCar = (idCar) => {
    axios.delete(API_URL + "car/" + idCar).then((response) => {
      if (response.data != null) {
        alert("Samochód usunięto pomyślnie.");
        getCarList();
      }
    });
  };

  const getCarList = () => {
    axios.get(API_URL + "car").then((response) => {
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
    {
      field: "company",
      headerName: "Firma",
      flex: 1,
      valueGetter: (params) => params.row.company.name,
    },
    {
      field: "actions",
      headerName: "Akcje",
      flex: 1.3,
      sortable: false,
      filterable: false,
      type: "number",
      renderCell: (params) => {
        return (
          <div className={classes.actionButtons}>
            <Link
              className={classes.editLinkButton}
              to={"/dashboard/cars/" + params.row.idCar}
            >
              <Button
                variant="contained"
                className={classes.editButton}
                startIcon={<Edit />}
              >
                Edytuj
              </Button>
            </Link>
            <Button
              variant="contained"
              className={classes.deleteButton}
              startIcon={<DeleteOutline />}
              onClick={() => deleteCar(params.row.idCar)}
            >
              Usuń
            </Button>
          </div>
        );
      },
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
      />
    </div>
  );
}
