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

export default function PostTable() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const deletePost = (idPost) => {
    axios.delete(API_URL + "posts/" + idPost).then((response) => {
      if (response.data != null) {
        alert("Post usunięto pomyślnie.");
        getPostList();
      }
    });
  };

  const getPostList = () => {
    axios.get(API_URL + "posts").then((response) => {
      const posts = response.data;
      setData(posts);
      console.log(posts);
    });
  };

  const columns = [
    {
      field: "title",
      headerName: "Tytuł",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Opis",
      flex: 2,
    },
    {
      field: "date",
      headerName: "Data",
      flex: 0.5,
    },
    {
      field: "company",
      headerName: "Firma",
      flex: 0.5,
      valueGetter: (params) => params.row.company.name,
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
              to={"/dashboard/posts/" + params.row.idPost}
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
              onClick={() => deletePost(params.row.idCar)}
            >
              Usuń
            </Button>
          </div>
        );
      },
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
        getRowId={(r) => r.idPost}
        autoHeight
        hideFooterSelectedRowCount
        localeText={plPL.props.MuiDataGrid.localeText}
      />
    </div>
  );
}
