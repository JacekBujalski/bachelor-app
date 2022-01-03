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
  editLinkButton: {
    textDecoration: "none",
  },
  deleteButton: {
    color: "red",
    border: "none",
    borderRadius: "10px",
  },
}));

export default function ManagerUser() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  let userData = JSON.parse(localStorage.getItem("userData"));
  let companyId = userData.company.idCompany;

  const getUserList = () => {
    axios
      .get(API_URL + "company/" + companyId + "/employees")
      .then((response) => {
        const users = response.data;
        setData(users);
        console.log(users);
      });
  };

  const columns = [
    {
      field: "firstName",
      headerName: "Imie",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Nazwisko",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Numer Telefonu",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      valueGetter: (params) => params.row.user.email,
    },
    {
      field: "role",
      headerName: "Rola użytkownika",
      flex: 1,
      valueGetter: (params) => params.row.user.role,
    },
  ];

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className={classes.root}>
      <DataGrid
        className={classes.root}
        rows={data}
        columns={columns}
        pageSize={25}
        getRowId={(r) => r.idUserData}
        autoHeight
        hideFooterSelectedRowCount
        localeText={plPL.props.MuiDataGrid.localeText}
      />
    </div>
  );
}
