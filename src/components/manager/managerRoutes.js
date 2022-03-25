import { Route, Switch } from "react-router-dom";
import ManagerCars from "./car/managerCars";
import ManagerUser from "./user/managerUsers";
import ManagerReports from "./reports/managerReports";
import FuelingReport from "../shared/fuelingReport";
import ServicesReport from "../shared/servicesReport";
import DamagesReport from "../shared/damagesReport";
import ManagerPosts from "./posts/managerPosts";
import ManagerPlannedTable from "./services/managerPlannedTable";
import ManagerPlannedServiceAdd from "./services/managerAddPlannedService";

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
      <ManagerPosts />
    </Route>
    <Route exact path="/dashboard/manager/services/planned/addService">
      <ManagerPlannedServiceAdd />
    </Route>
    <Route exact path="/dashboard/manager/services/planned/:id">
      <ManagerPlannedTable />
    </Route>
    <Route exact path="/dashboard/manager/reports">
      <ManagerReports />
    </Route>
    <Route exact path="/dashboard/manager/reports/fueling/:id">
      <FuelingReport />
    </Route>
    <Route exact path="/dashboard/manager/reports/services/:id">
      <ServicesReport />
    </Route>
    <Route exact path="/dashboard/manager/reports/damages/:id">
      <DamagesReport />
    </Route>
  </Switch>
);
