import { Route, Switch } from "react-router-dom";
import UserTable from "./userTable";
import User from "./user";
import CarTable from "./carTable";
import CompanyTable from "./companyTable";

export const adminRoutes = (
  <Switch>
    <Route exact path="/dashboard/">
      Hejka
    </Route>
    <Route exact path="/dashboard/users">
      <UserTable />
    </Route>
    <Route exact path="/dashboard/users/:id">
      <User />
    </Route>
    <Route exact path="/dashboard/cars">
      <CarTable />
    </Route>
    <Route exact path="/dashboard/companies">
      <CompanyTable />
    </Route>
  </Switch>
);
