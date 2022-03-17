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
}));

export default function ManagerPosts() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  let userData = JSON.parse(localStorage.getItem("userData"));
  let companyId = userData.company.idCompany;

  const getPostList = () => {
    axios.get(API_URL + "company/" + companyId + "/posts").then((response) => {
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
