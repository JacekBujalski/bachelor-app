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

export default function CompanyTable() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const deleteCompany = (idCompany) => {
    axios.delete(API_URL + "company/" + idCompany).then((response) => {
      if (response.data != null) {
        alert("Firmę usunięto pomyślnie.");
        getCompanyList();
      }
    });
  };

  const getCompanyList = () => {
    axios.get(API_URL + "company").then((response) => {
      const companies = response.data;
      setData(companies);
      console.log(companies);
    });
  };

  const columns = [
    {
      field: "name",
      headerName: "Nazwa",
      flex: 1,
    },
    {
      field: "nip",
      headerName: "Nip",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Kraj",
      flex: 1,
      valueGetter: (params) => params.row.address.country,
    },
    {
      field: "zipCode",
      headerName: "Kod Pocztowy",
      flex: 1,
      valueGetter: (params) => params.row.address.zipCode,
    },
    {
      field: "city",
      headerName: "Miasto",
      flex: 1,
      valueGetter: (params) => params.row.address.city,
    },
    {
      field: "street",
      headerName: "Ulica",
      flex: 1,
      valueGetter: (params) => params.row.address.street,
    },
    {
      field: "buildingNumber",
      headerName: "Numer Budynku",
      flex: 1,
      sortable: false,
      valueGetter: (params) => params.row.address.buildingNumber,
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
              to={"/dashboard/companies/" + params.row.idCompany}
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
              onClick={() => deleteCompany(params.row.idCompany)}
            >
              Usuń
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getCompanyList();
  }, []);

  return (
    <div className={classes.root}>
      <DataGrid
        className={classes.root}
        rows={data}
        columns={columns}
        pageSize={25}
        getRowId={(r) => r.idCompany}
        autoHeight
        hideFooterSelectedRowCount
        localeText={plPL.props.MuiDataGrid.localeText}
      />
    </div>
  );
}
