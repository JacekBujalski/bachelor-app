import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Divider,
  FormControlLabel,
  Paper,
  Switch,
} from "@material-ui/core";
import { Business, CreditCard, DriveEta, Phone } from "@material-ui/icons";
import axios from "axios";
import { API_URL } from "../../../API/api";
import { Link, useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  carTitleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  carTitle: {
    fontSize: "2rem",
  },
  carAddButton: {
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
  carContainer: {
    display: "flex",
    marginTop: theme.spacing(1),
  },
  carDisplay: {
    flex: 1,
    padding: theme.spacing(2),
    marginRight: theme.spacing(8),
  },
  carEdit: {
    flex: 2,
    padding: theme.spacing(2),
  },
  carDisplayTop: {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
  },
  carDisplayFullName: {
    fontSize: "1.6rem",
    fontWeight: 900,
  },
  carDisplayPlate: {
    fontSize: "1.4rem",
    fontWeight: 400,
    color: "#9b9b9b",
  },
  carDisplayBottom: {
    marginTop: theme.spacing(2),
  },
  carShowTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#9b9b9b",
  },
  carShowInfo: {
    display: "flex",
    margin: theme.spacing(4),
    alignItems: "center",
  },

  carShowIcon: {
    fontSize: "2.5rem",
  },

  carShowInfoTitle: {
    marginLeft: theme.spacing(2),
    fontSize: "1.2rem",
  },
  carEditLeft: {
    flex: 2,
  },
  carEditTitle: {
    fontSize: "1.4rem",
    fontWeight: "600",
  },
  carEditSwitch: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  carEditForm: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(4),
  },
  carEditItem: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(4),
    "& label": {
      marginBottom: theme.spacing(2),
      fontSize: "1.1rem",
    },
  },
  carEditInput: {
    border: "none",
    fontSize: "1.2rem",
    width: "15vw",
    height: 30,
    borderBottom: "1px solid gray",
  },
  carEditImg: {
    width: 250,
    height: 250,
    marginBottom: theme.spacing(3),
  },
  carEditRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  carUpdateButton: {
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

export default function Car(props) {
  const [formSwitch, setFormSwitch] = useState(false);
  const [data, setData] = useState({});
  const [companies, setCompanies] = useState([]);
  const [inputDataCar, setInputDataCar] = useState({});
  const [inputDataInsurance, setInputDataInsurance] = useState({});
  const [idInsurance, setIdInsurance] = useState("");

  const classes = useStyles();
  let history = useHistory();

  const handleChangeInsurance = (prop) => (event) => {
    setInputDataInsurance({
      ...inputDataInsurance,
      [prop]: event.target.value,
    });
  };
  const handleChangeCar = (prop) => (event) => {
    setInputDataCar({ ...inputDataCar, [prop]: event.target.value });
  };

  const handleSwitchChange = () => {
    setFormSwitch((prev) => !prev);
  };

  const handleSubmitCar = (e) => {
    e.preventDefault();
    axios.put(API_URL + "car/" + idCar, inputDataCar).then((response) => {
      if (response.data != null) {
        alert("Dane auta zaaktualizowano pomyślnie.");
        setTimeout(() => {
          history.push("/dashboard/cars");
        }, 1000);
      }
    });
  };

  const handleSubmitInsurance = (e) => {
    e.preventDefault();
    axios
      .put(API_URL + "insurance/" + idInsurance, inputDataInsurance)
      .then((response) => {
        if (response.data != null) {
          alert("Dane ubezpieczenia zaaktualizowano pomyślnie.");
          setTimeout(() => {
            history.push("/dashboard/cars");
          }, 1000);
        }
      });
  };

  const params = useParams();
  const idCar = params.id;

  const getCarInfo = (idCar) => {
    axios.get(API_URL + "car/" + idCar).then((response) => {
      const car = response.data;
      car.insuranceId = car.insurance.idInsurance;
      car.companyId = car.company.idCompany;
      const insurance = car.insuranceId;
      setData(car);
      setInputDataCar(car);
      setIdInsurance(insurance);
    });
  };

  const getInsuranceInfo = (idInsurance) => {
    axios.get(API_URL + "insurance/" + idInsurance).then((response) => {
      const insuranceData = response.data;
      setInputDataInsurance(insuranceData);
    });
  };

  const getCompaniesList = () => {
    axios.get(API_URL + "company/").then((response) => {
      const data = response.data;
      setCompanies(data);
    });
  };

  useEffect(() => {
    getCarInfo(idCar);
    getCompaniesList();
  }, [idCar]);

  useEffect(() => {
    getInsuranceInfo(idInsurance);
  }, [idInsurance]);

  return (
    <div className={classes.root}>
      <div className={classes.carTitleContainer}>
        <h1 className={classes.carTitle}> Edytuj samochód </h1>
        <Button className={classes.carAddButton}>
          <Link
            to="/dashboard/cars/addInsurance"
            className={classes.buttonLink}
          >
            Dodaj samochód
          </Link>
        </Button>
      </div>
      <div className={classes.carContainer}>
        <Paper className={classes.carDisplay} elevation={5}>
          <div className={classes.carDisplayTop}>
            <span className={classes.carDisplayFullName}>
              {data.carBrand + ` ` + data.carModel}
            </span>
            <span className={classes.carDisplayPlate}>{data.plateNumber}</span>
          </div>
          <Divider />
          <div className={classes.carDisplayBottom}>
            <span className={classes.carShowTitle}>Dane ubezpieczeniowe</span>
            <div className={classes.carShowInfo}>
              <CreditCard className={classes.carShowIcon} />
              <span className={classes.carShowInfoTitle}>
                {data.insurance && data.insurance.policyNumber}
              </span>
            </div>
            <div className={classes.carShowInfo}>
              <Phone className={classes.carShowIcon} />
              <span className={classes.carShowInfoTitle}>
                {data.insurance && data.insurance.assistanceNumber}
              </span>
            </div>
            <span className={classes.carShowTitle}>Dane Auta</span>
            <div className={classes.carShowInfo}>
              <DriveEta className={classes.carShowIcon} />
              <span className={classes.carShowInfoTitle}>{data.carBrand}</span>
            </div>
            <div className={classes.carShowInfo}>
              <DriveEta className={classes.carShowIcon} />
              <span className={classes.carShowInfoTitle}>{data.carModel}</span>
            </div>
            <div className={classes.carShowInfo}>
              <DriveEta className={classes.carShowIcon} />
              <span className={classes.carShowInfoTitle}>
                {data.carManufactureYear}
              </span>
            </div>
            <div className={classes.carShowInfo}>
              <DriveEta className={classes.carShowIcon} />
              <span className={classes.carShowInfoTitle}>{data.carType}</span>
            </div>
            <div className={classes.carShowInfo}>
              <DriveEta className={classes.carShowIcon} />
              <span className={classes.carShowInfoTitle}>
                {data.engineCapacity}
              </span>
            </div>
            <div className={classes.carShowInfo}>
              <DriveEta className={classes.carShowIcon} />
              <span className={classes.carShowInfoTitle}>
                {data.enginePower} KM
              </span>
            </div>
            <div className={classes.carShowInfo}>
              <DriveEta className={classes.carShowIcon} />
              <span className={classes.carShowInfoTitle}>
                {data.plateNumber}
              </span>
            </div>
            <div className={classes.carShowInfo}>
              <Business className={classes.carShowIcon} />
              <span className={classes.carShowInfoTitle}>
                {data.company && data.company.name}
              </span>
            </div>
          </div>
        </Paper>
        <Paper className={classes.carEdit} elevation={5}>
          <div className={classes.carEditSwitch}>
            <span className={classes.carEditTitle}>Edycja danych</span>
            <FormControlLabel
              control={
                <Switch
                  className={classes.carEditTitle}
                  checked={formSwitch}
                  onChange={handleSwitchChange}
                />
              }
              labelPlacement="start"
              label={formSwitch ? "Edycja auta" : "Edycja ubezpieczenia"}
            />
          </div>
          {formSwitch ? (
            <form className={classes.carEditForm} onSubmit={handleSubmitCar}>
              <div className={classes.carEditLeft}>
                <div className={classes.carEditItem}>
                  <label> Marka auta </label>
                  <input
                    name={"carBrand"}
                    type="text"
                    placeholder={data.carBrand}
                    className={classes.carEditInput}
                    onChange={handleChangeCar("carBrand")}
                  />
                </div>
                <div className={classes.carEditItem}>
                  <label> Model auta </label>
                  <input
                    name={"carModel"}
                    type="text"
                    placeholder={data.carModel}
                    className={classes.carEditInput}
                    onChange={handleChangeCar("carModel")}
                  />
                </div>
                <div className={classes.carEditItem}>
                  <label> Rok produkcji auta </label>
                  <input
                    name={"carManufactureYear"}
                    type="text"
                    placeholder={data.carManufactureYear}
                    className={classes.carEditInput}
                    onChange={handleChangeCar("carManufactureYear")}
                  />
                </div>
                <div className={classes.carEditItem}>
                  <label> Typ auta </label>
                  <input
                    name={"carType"}
                    type="text"
                    placeholder={data.carType}
                    className={classes.carEditInput}
                    onChange={handleChangeCar("carType")}
                  />
                </div>
                <div className={classes.carEditItem}>
                  <label> Pojemność silnika </label>
                  <input
                    name={"engineCapacity"}
                    type="text"
                    placeholder={data.engineCapacity}
                    className={classes.carEditInput}
                    onChange={handleChangeCar("engineCapacity")}
                  />
                </div>
                <div className={classes.carEditItem}>
                  <label> Moc silnika </label>
                  <input
                    name={"enginePower"}
                    type="text"
                    placeholder={data.enginePower + " KM"}
                    className={classes.carEditInput}
                    onChange={handleChangeCar("enginePower")}
                  />
                </div>
                <div className={classes.carEditItem}>
                  <label> Rejestracja </label>
                  <input
                    name={"plateNumber"}
                    type="text"
                    placeholder={data.plateNumber}
                    className={classes.carEditInput}
                    onChange={handleChangeCar("plateNumber")}
                  />
                </div>
                <div className={classes.carEditItem}>
                  <label> Firma </label>
                  <select
                    className={classes.carEditInput}
                    onChange={handleChangeCar("companyId")}
                  >
                    <option> Wybierz firmę</option>
                    {companies.map((company) => (
                      <option key={company.idCompany} value={company.idCompany}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={classes.carEditRight}>
                <img
                  className={classes.carEditImg}
                  src={process.env.PUBLIC_URL + "/assets/pic1.png"}
                  alt={""}
                />
                <button type={"submit"} className={classes.carUpdateButton}>
                  Aktualizuj
                </button>
              </div>
            </form>
          ) : (
            <form
              className={classes.carEditForm}
              onSubmit={handleSubmitInsurance}
            >
              <div className={classes.carEditLeft}>
                <div className={classes.carEditItem}>
                  <label> Numer ubezpieczenia </label>
                  <input
                    name={"policyNumber"}
                    type="text"
                    placeholder={data.insurance && data.insurance.policyNumber}
                    className={classes.carEditInput}
                    onChange={handleChangeInsurance("policyNumber")}
                  />
                </div>
                <div className={classes.carEditItem}>
                  <label> Numer telefonu assistance </label>
                  <input
                    name={"assistanceNumber"}
                    type="text"
                    placeholder={
                      data.insurance && data.insurance.assistanceNumber
                    }
                    className={classes.carEditInput}
                    onChange={handleChangeInsurance("assistanceNumber")}
                  />
                </div>
              </div>
              <div className={classes.carEditRight}>
                <img
                  className={classes.carEditImg}
                  src={process.env.PUBLIC_URL + "/assets/pic2.png"}
                  alt={""}
                />
                <button type={"submit"} className={classes.carUpdateButton}>
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
