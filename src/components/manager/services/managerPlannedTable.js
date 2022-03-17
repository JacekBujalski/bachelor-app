import React, { useEffect, useState } from "react";
import { DataGrid, plPL } from "@material-ui/data-grid";
import { API_URL } from "../../../API/api";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontSize: "1rem",
  },
}));

export default function ManagerPlannedTable() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const params = useParams();
  const idCar = params.id;

  const getPostList = () => {
    axios.get(API_URL + "car/" + idCar + "/planned").then((response) => {
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
      field: "date",
      headerName: "Data",
      flex: 1,
      valueGetter: (params) =>
        moment(params.row.date).format("DD.MM.yyyy hh:mm"),
    },
  ];

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <div className={classes.root}>
      <DataGrid
        className={classes.root}
        rows={data}
        columns={columns}
        pageSize={25}
        getRowId={(r) => r.idPlannedService}
        autoHeight
        hideFooterSelectedRowCount
        localeText={plPL.props.MuiDataGrid.localeText}
      />
    </div>
  );
}
