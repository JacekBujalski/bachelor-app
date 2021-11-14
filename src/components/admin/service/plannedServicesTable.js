import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../API/api";
import { DataGrid, plPL } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";
import moment from "moment";

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

export default function PlannedServicesTable(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const deletePlannedService = (idPlannedService) => {
    axios.delete(API_URL + "planned/" + idPlannedService).then((response) => {
      if (response.data != null) {
        alert("Planowany serwis usunięto pomyślnie.");
        getServicesList();
      }
    });
  };

  const getServicesList = () => {
    axios.get(API_URL + "planned").then((response) => {
      const posts = response.data;
      setData(posts);
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
    {
      field: "company",
      headerName: "Firma",
      flex: 1,
      valueGetter: (params) => params.row.car.company.name,
    },
    {
      field: "actions",
      headerName: "Akcje",
      flex: 1.2,
      type: "number",
      renderCell: (params) => {
        return (
          <div className={classes.actionButtons}>
            <Link
              className={classes.editLinkButton}
              to={"/dashboard/services/planned/" + params.row.idPlannedService}
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
              onClick={() => deletePlannedService(params.row.idPlannedService)}
            >
              Usuń
            </Button>
          </div>
        );
      },
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
        getRowId={(r) => r.idPlannedService}
        autoHeight
        hideFooterSelectedRowCount
        localeText={plPL.props.MuiDataGrid.localeText}
      />
    </div>
  );
}
