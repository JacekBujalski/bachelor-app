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

export default function UserTable() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const deleteUser = (idUserData) => {
    axios.delete(API_URL + "usersData/" + idUserData).then((response) => {
      if (response.data != null) {
        alert("Użytkownika usunięto pomyślnie.");
        getUserList();
      }
    });
  };

  const getUserList = () => {
    axios.get(API_URL + "usersData").then((response) => {
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
      renderCell: (params) => {
        return <div>{params.row.user.email}</div>;
      },
    },
    {
      field: "role",
      headerName: "Rola użytkownika",
      flex: 1,
      renderCell: (params) => {
        return <div className="rowitem">{params.row.user.role}</div>;
      },
    },
    {
      field: "company",
      headerName: "Firma",
      flex: 1,
      renderCell: (params) => {
        return <div>{params.row.company.name}</div>;
      },
    },
    {
      field: "actions",
      headerName: "Akcje",
      flex: 1,
      type: "number",
      renderCell: (params) => {
        return (
          <div className={classes.actionButtons}>
            <Link
              className={classes.editLinkButton}
              to={"/dashboard/users/" + params.row.idUserData}
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
              onClick={() => deleteUser(params.row.idUserData)}
            >
              Usuń
            </Button>
          </div>
        );
      },
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
      />
    </div>
  );
}
