import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Divider,
  FormControlLabel,
  Paper,
  Switch,
} from "@material-ui/core";

import axios from "axios";
import { API_URL } from "../../../API/api";
import { Link, useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  companyTitleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  companyTitle: {
    fontSize: "2rem",
  },
  addButton: {
    border: "none",
    borderRadius: "5px",
    padding: theme.spacing(1),
    fontSize: "1rem",
    backgroundColor: "#ff0000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#e80606",
    },
  },
  buttonLink: {
    textDecoration: "none",
    color: "inherit",
  },
  companyContainer: {
    display: "flex",
    marginTop: theme.spacing(1),
  },
  companyDisplay: {
    flex: 1,
    padding: theme.spacing(2),
    marginRight: theme.spacing(8),
  },
  companyEdit: {
    flex: 2,
    padding: theme.spacing(2),
  },
  companyDisplayTop: {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
  },
  companyDisplayFullName: {
    fontSize: "1.6rem",
    fontWeight: 900,
  },
  companyDisplayPlate: {
    fontSize: "1.4rem",
    fontWeight: 400,
    color: "#9b9b9b",
  },
  companyDisplayBottom: {
    marginTop: theme.spacing(2),
  },
  companyShowTitle: {
    fontSize: "1.8rem",
    fontWeight: 600,
    color: "#9b9b9b",
  },
  companyItemTitle: {
    fontSize: "1.6rem",
    flex: 1,
  },
  companyShowInfo: {
    display: "flex",

    margin: theme.spacing(4),
    alignItems: "center",
  },
  companyShowInfoTitle: {
    flex: 1,
    fontSize: "1.6rem",
    marginLeft: theme.spacing(2),
  },
  companyEditLeft: {
    flex: 2,
  },
  companyEditTitle: {
    fontSize: "1.4rem",
    fontWeight: "600",
  },
  companyEditSwitch: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  companyEditForm: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(4),
  },
  companyEditItem: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(4),
    "& label": {
      marginBottom: theme.spacing(2),
      fontSize: "1.1rem",
    },
  },
  companyEditInput: {
    border: "none",
    fontSize: "1.2rem",
    width: "15vw",
    height: 30,
    borderBottom: "1px solid gray",
  },
  companyEditImg: {
    width: 250,
    height: 250,
    marginBottom: theme.spacing(3),
  },
  companyEditRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  updateButton: {
    border: "none",
    borderRadius: "5px",
    padding: theme.spacing(1),
    fontSize: "1rem",
    backgroundColor: "#ff0000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#e80606",
    },
  },
}));

export default function Company(props) {
  const [formSwitch, setFormSwitch] = useState(false);
  const [data, setData] = useState({});
  const [inputDataCompany, setInputDataCompany] = useState({});
  const [inputDataAddress, setInputDataAddress] = useState({});
  const [idAddress, setIdAddress] = useState("");
  const params = useParams();
  const classes = useStyles();
  let history = useHistory();
  const idCompany = params.id;

  const handleChangeAddress = (prop) => (event) => {
    setInputDataAddress({
      ...inputDataAddress,
      [prop]: event.target.value,
    });
  };
  const handleChangeCompany = (prop) => (event) => {
    setInputDataCompany({ ...inputDataCompany, [prop]: event.target.value });
  };

  const handleSwitchChange = () => {
    setFormSwitch((prev) => !prev);
  };

  const handleSubmitCompany = (e) => {
    e.preventDefault();
    axios
      .put(API_URL + "company/" + idCompany, inputDataCompany)
      .then((response) => {
        if (response.data != null) {
          alert("Dane firmy zaaktualizowano pomyślnie.");
          setTimeout(() => {
            history.push("/dashboard/companies");
          }, 1000);
        }
      });
  };

  const handleSubmitAddress = (e) => {
    e.preventDefault();
    axios
      .put(API_URL + "address/" + idAddress, inputDataAddress)
      .then((response) => {
        if (response.data != null) {
          alert("Dane adresowe zaaktualizowano pomyślnie.");
          setTimeout(() => {
            history.push("/dashboard/companies");
          }, 1000);
        }
      });
  };

  const getCompanyInfo = (idCompany) => {
    axios.get(API_URL + "company/" + idCompany).then((response) => {
      const company = response.data;
      company.addressId = company.address.idAddress;
      const address = company.addressId;
      setData(company);
      setInputDataCompany(company);
      setIdAddress(address);
    });
  };

  const getAddressInfo = (idAddress) => {
    axios.get(API_URL + "address/" + idAddress).then((response) => {
      const addressData = response.data;
      setInputDataAddress(addressData);
    });
  };

  useEffect(() => {
    getCompanyInfo(idCompany);
  }, [idCompany]);

  useEffect(() => {
    getAddressInfo(idAddress);
  }, [idAddress]);

  return (
    <div className={classes.root}>
      <div className={classes.companyTitleContainer}>
        <h1 className={classes.companyTitle}> Edytuj firmę </h1>
        <Button className={classes.addButton}>
          <Link
            to="/dashboard/companies/addAddress"
            className={classes.buttonLink}
          >
            Dodaj firmę
          </Link>
        </Button>
      </div>
      <div className={classes.companyContainer}>
        <Paper className={classes.companyDisplay} elevation={5}>
          <div className={classes.companyDisplayTop}>
            <span className={classes.companyDisplayFullName}>{data.name}</span>
            <span className={classes.companyDisplayPlate}>
              {(data.address && data.address.street) +
                ", " +
                (data.address && data.address.city)}
            </span>
          </div>
          <Divider />
          <div className={classes.companyDisplayBottom}>
            <span className={classes.companyShowTitle}>Dane firmy</span>
            <div className={classes.companyShowInfo}>
              <span className={classes.companyItemTitle}>Nazwa : </span>
              <span className={classes.companyShowInfoTitle}>{data.name}</span>
            </div>
            <div className={classes.companyShowInfo}>
              <span className={classes.companyItemTitle}>Nip : </span>
              <span className={classes.companyShowInfoTitle}>{data.nip}</span>
            </div>
            <span className={classes.companyShowTitle}>Dane adresowe</span>
            <div className={classes.companyShowInfo}>
              <span className={classes.companyItemTitle}>Państwo : </span>
              <span className={classes.companyShowInfoTitle}>
                {data.address && data.address.country}
              </span>
            </div>
            <div className={classes.companyShowInfo}>
              <span className={classes.companyItemTitle}>Kod pocztowy : </span>
              <span className={classes.companyShowInfoTitle}>
                {data.address && data.address.zipCode}
              </span>
            </div>
            <div className={classes.companyShowInfo}>
              <span className={classes.companyItemTitle}>Miasto : </span>
              <span className={classes.companyShowInfoTitle}>
                {data.address && data.address.city}
              </span>
            </div>
            <div className={classes.companyShowInfo}>
              <span className={classes.companyItemTitle}>Ulica : </span>
              <span className={classes.companyShowInfoTitle}>
                {data.address && data.address.street}
              </span>
            </div>
            <div className={classes.companyShowInfo}>
              <span className={classes.companyItemTitle}>Bumer budynku : </span>
              <span className={classes.companyShowInfoTitle}>
                {data.address && data.address.buildingNumber}
              </span>
            </div>
          </div>
        </Paper>
        <Paper className={classes.companyEdit} elevation={5}>
          <div className={classes.companyEditSwitch}>
            <span className={classes.companyEditTitle}>Edycja danych</span>
            <FormControlLabel
              control={
                <Switch
                  className={classes.companyEditTitle}
                  checked={formSwitch}
                  onChange={handleSwitchChange}
                />
              }
              labelPlacement="start"
              label={formSwitch ? "Edycja danych firmy" : "Edycja adresu"}
            />
          </div>
          {formSwitch ? (
            <form
              className={classes.companyEditForm}
              onSubmit={handleSubmitCompany}
            >
              <div className={classes.companyEditLeft}>
                <div className={classes.companyEditItem}>
                  <label> Nazwa </label>
                  <input
                    name={"name"}
                    type="text"
                    placeholder={data.name}
                    className={classes.companyEditInput}
                    onChange={handleChangeCompany("name")}
                  />
                </div>
                <div className={classes.companyEditItem}>
                  <label> NIP </label>
                  <input
                    name={"nip"}
                    type="text"
                    placeholder={data.nip}
                    className={classes.companyEditInput}
                    onChange={handleChangeCompany("nip")}
                  />
                </div>
              </div>
              <div className={classes.companyEditRight}>
                <img
                  className={classes.companyEditImg}
                  src={process.env.PUBLIC_URL + "/assets/pic5.png"}
                  alt={""}
                />
                <button type={"submit"} className={classes.updateButton}>
                  Aktualizuj
                </button>
              </div>
            </form>
          ) : (
            <form
              className={classes.companyEditForm}
              onSubmit={handleSubmitAddress}
            >
              <div className={classes.companyEditLeft}>
                <div className={classes.companyEditItem}>
                  <label>Państwo</label>
                  <input
                    name={"country"}
                    type="text"
                    placeholder={data.address && data.address.country}
                    className={classes.companyEditInput}
                    onChange={handleChangeAddress("country")}
                  />
                </div>
                <div className={classes.companyEditItem}>
                  <label>Kod Pocztowy</label>
                  <input
                    name={"zipCode"}
                    type="text"
                    placeholder={data.address && data.address.zipCode}
                    className={classes.companyEditInput}
                    onChange={handleChangeAddress("zipCode")}
                  />
                </div>
                <div className={classes.companyEditItem}>
                  <label>Miasto</label>
                  <input
                    name={"city"}
                    type="text"
                    placeholder={data.address && data.address.city}
                    className={classes.companyEditInput}
                    onChange={handleChangeAddress("city")}
                  />
                </div>
                <div className={classes.companyEditItem}>
                  <label>Ulica</label>
                  <input
                    name={"street"}
                    type="text"
                    placeholder={data.address && data.address.street}
                    className={classes.companyEditInput}
                    onChange={handleChangeAddress("street")}
                  />
                </div>
                <div className={classes.companyEditItem}>
                  <label>Numer budynku</label>
                  <input
                    name={"buildingNumber"}
                    type="text"
                    placeholder={data.address && data.address.buildingNumber}
                    className={classes.companyEditInput}
                    onChange={handleChangeAddress("buildingNumber")}
                  />
                </div>
              </div>
              <div className={classes.companyEditRight}>
                <img
                  className={classes.companyEditImg}
                  src={process.env.PUBLIC_URL + "/assets/pic4.png"}
                  alt={""}
                />
                <button type={"submit"} className={classes.updateButton}>
                  Aktualizuj
                </button>
              </div>
            </form>
          )}
        </Paper>
      </div>
    </div>
  );
}
