import { Route, Switch } from "react-router-dom";
import UserTable from "./user/userTable";
import User from "./user/user";
import CarTable from "./car/carTable";
import CompanyTable from "./company/companyTable";
import UserAdd from "./user/userAdd";

export const adminRoutes = (
  <Switch>
    <Route exact path="/dashboard/">
      Hejka
    </Route>
    <Route exact path="/dashboard/users">
      <UserTable />
    </Route>
    <Route exact path="/dashboard/users/addUser">
      <UserAdd />
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
