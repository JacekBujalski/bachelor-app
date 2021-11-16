// import React, { useState } from "react";
// import { makeStyles, Paper } from "@material-ui/core";
// import axios from "axios";
// import { API_URL } from "../API/api";
//
// const useStyles = makeStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//     display: "flex",
//     alignItems: "start",
//     justifyContent: "space-between",
//   },
//   selectContainer: {
//     flex: 0.5,
//     padding: theme.spacing(2),
//     marginRight: theme.spacing(8),
//   },
//   contentContainer: {
//     flex: 2,
//     padding: theme.spacing(2),
//   },
//   item: {
//     display: "flex",
//     flex: 1,
//     flexDirection: "column",
//     marginTop: theme.spacing(2),
//     marginRight: theme.spacing(2),
//     "& label": {
//       marginBottom: theme.spacing(2),
//       fontSize: "1.4rem",
//       fontWeight: 600,
//       color: "#9b9b9b",
//     },
//     "& input": {
//       paddingTop: theme.spacing(2),
//       paddingBottom: theme.spacing(2),
//       padding: theme.spacing(1),
//       fontSize: "1.1rem",
//       border: "1px solid gray",
//       borderRadius: "5px",
//       color: "#9b9b9b",
//     },
//   },
//   itemSelect: {
//     fontSize: "1.1rem",
//     borderRadius: "5px",
//     color: "#9b9b9b",
//     padding: theme.spacing(1),
//     paddingTop: theme.spacing(2),
//     paddingBottom: theme.spacing(2),
//   },
// }));
//
// export default function ReportPage(props) {
//   const classes = useStyles();
//   const [companies, setCompanies] = useState([]);
//
//   const getCompaniesList = () => {
//     axios.get(API_URL + "company/").then((response) => {
//       const data = response.data;
//       setCompanies(data);
//     });
//   };
//
//   const handleChange = (prop) => (event) => {
//     setValues({ ...values, [prop]: event.target.value });
//   };
//
//   return (
//     <Paper elevation={3} className={classes.root}>
//       <Paper elevation={3} className={classes.selectContainer}>
//         <div className={classes.item}>
//           <label>Wybierz firmę</label>
//           <select
//             className={classes.itemSelect}
//             onChange={handleChange("companyId")}
//           >
//             <option> Wybierz firmę</option>
//             {companies.map((company) => (
//               <option key={company.idCompany} value={company.idCompany}>
//                 {company.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </Paper>
//       <Paper elevation={3} className={classes.contentContainer}>
//         tu bedzie content <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//       </Paper>
//     </Paper>
//   );
// }
