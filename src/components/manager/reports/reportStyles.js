import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: "50%",
    margin: "auto",
  },
  paper: {
    margin: "auto",
    padding: theme.spacing(2),
  },
  dataGrid: {
    marginTop: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(2),
    fontSize: "1.4rem",
    fontWeight: 600,
    color: "#9b9b9b",
  },
  generated: {
    textAlign: "right",
  },
  pdfButton: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
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
  damages: {
    display: "flex",
  },
  div: {
    marginRight: "10px",
  },
  card: {
    flex: 1,
    marginLeft: theme.spacing(1),
  },
  media: {
    width: 345,
    height: 180,
  },
  damageTitle: {
    marginBottom: theme.spacing(2),
    fontSize: "1.1rem",
    fontWeight: 600,
  },
}));
