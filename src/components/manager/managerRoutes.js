import { Route, Switch } from "react-router-dom";
import ManagerCars from "./car/managerCars";
import ManagerUser from "./user/managerUsers";
import ManagerReports from "./reports/managerReports";
import ManagerFuelingReport from "./reports/managerFuelingReport";
import ManagerServicesReport from "./reports/managerServicesReport";
import ManagerDamagesReport from "./reports/managerDamagesReport";

export const managerRoutes = (
  <Switch>
    <Route exact path="/dashboard/manager">
      Hejka menago
    </Route>
    <Route exact path="/dashboard/manager/users">
      <ManagerUser />
    </Route>
    <Route exact path="/dashboard/manager/cars">
      <ManagerCars />
    </Route>
    <Route exact path="/dashboard/manager/posts">
      Menago posty firmowe
    </Route>
    <Route exact path="/dashboard/manager/services/planned">
      Menago planowane serwisy
    </Route>
    <Route exact path="/dashboard/manager/services/planned/addService">
      Menago dodaj planowane serwisy
    </Route>
    <Route exact path="/dashboard/manager/reports">
      <ManagerReports />
    </Route>
    <Route exact path="/dashboard/manager/reports/fueling/:id">
      <ManagerFuelingReport />
    </Route>
    <Route exact path="/dashboard/manager/reports/services/:id">
      <ManagerServicesReport />
    </Route>
    <Route exact path="/dashboard/manager/reports/damages/:id">
      <ManagerDamagesReport />
    </Route>
  </Switch>
);
