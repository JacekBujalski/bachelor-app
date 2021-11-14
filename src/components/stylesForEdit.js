import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
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
  container: {
    display: "flex",
    marginTop: theme.spacing(1),
  },
  dataDisplay: {
    flex: 1.5,
    padding: theme.spacing(2),
    marginRight: theme.spacing(8),
  },
  dataEdit: {
    flex: 2,
    padding: theme.spacing(2),
  },
  dataDisplayTop: {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
  },
  dataDisplayHeading: {
    fontSize: "1.4rem",
    fontWeight: 900,
  },
  dataDisplaySubHeading: {
    fontSize: "1.2rem",
    fontWeight: 400,
    color: "#9b9b9b",
  },
  dataDisplayBottom: {
    marginTop: theme.spacing(2),
  },
  dataShowTitle: {
    fontSize: "2rem",
    fontWeight: 600,
    color: "#9b9b9b",
  },
  dataShowInfo: {
    display: "flex",
    margin: theme.spacing(4),
    alignItems: "center",
  },

  dataItemTitle: {
    fontSize: "1.8rem",
    flex: 0.3,
  },

  dataShowInfoTitle: {
    flex: 1,
    fontSize: "1.8rem",
    marginLeft: theme.spacing(2),
  },
  editLeft: {
    flex: 2,
  },
  dataEditTitle: {
    fontSize: "1.4rem",
    fontWeight: "600",
  },
  editForm: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(4),
  },
  editItem: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(4),
    "& label": {
      marginBottom: theme.spacing(2),
      fontSize: "1.1rem",
    },
  },
  editInput: {
    border: "none",
    fontSize: "1.2rem",
    minWidth: "15vw",
    maxWidth: "15vw",
    height: 30,
    borderBottom: "1px solid gray",
  },
  editInputArea: {
    border: "none",
    fontSize: "1.2rem",
    minWidth: "15vw",
    maxWidth: "15vw",
    minHeight: 90,
    borderBottom: "1px solid gray",
  },
  editInputDatePicker: {
    border: "none",
    fontSize: "1.2rem",
    width: "15vw",
    height: 90,
  },
  editImg: {
    width: 250,
    height: 250,
  },
  editRight: {
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
