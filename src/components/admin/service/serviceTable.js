import React, { useEffect, useState } from "react";
import { DataGrid, plPL } from "@material-ui/data-grid";
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

function ServiceTable(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const getServicesList = () => {
    axios.get(API_URL + "service").then((response) => {
      const posts = response.data;
      setData(posts);
      console.log(posts);
    });
  };

  const columns = [
    {
      field: "car",
      headerName: "Samochód",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.car.carBrand} ${params.row.car.carModel}, ${params.row.car.plateNumber}`,
    },
    {
      field: "description",
      headerName: "Opis",
      flex: 3,
    },
    {
      field: "mileage",
      headerName: "Przebieg samochodu",
      flex: 1,
    },
    {
      field: "serviceCost",
      headerName: "Koszt",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Data",
      flex: 1,
    },
    {
      field: "company",
      headerName: "Firma",
      flex: 1,
      valueGetter: (params) => params.row.car.company.name,
    },
  ];

  useEffect(() => {
    getServicesList();
  }, []);

  return (
    <div className={classes.root}>
      <DataGrid
        className={classes.root}
        rows={data}
        columns={columns}
        pageSize={25}
        getRowId={(r) => r.idServices}
        autoHeight
        hideFooterSelectedRowCount
        localeText={plPL.props.MuiDataGrid.localeText}
      />
    </div>
  );
}

export default ServiceTable;
