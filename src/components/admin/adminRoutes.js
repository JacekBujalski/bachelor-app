import { Route, Switch } from "react-router-dom";
import UserTable from "./user/userTable";
import User from "./user/user";
import CarTable from "./car/carTable";
import CompanyTable from "./company/companyTable";
import UserAdd from "./user/userAdd";
import CompanyAdd from "./company/companyAdd";
import UserAddInfo from "./user/userAddInfo";
import PostTable from "./post/postTable";
import AddressAdd from "./company/addressAdd";
import InsuranceAdd from "./car/insuranceAdd";
import CarAdd from "./car/carAdd";

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
    <Route exact path="/dashboard/users/addUserInfo">
      <UserAddInfo />
    </Route>
    <Route exact path="/dashboard/users/:id">
      <User />
    </Route>
    <Route exact path="/dashboard/cars">
      <CarTable />
    </Route>
    <Route exact path="/dashboard/cars/addInsurance">
      <InsuranceAdd />
    </Route>
    <Route exact path="/dashboard/cars/addCar">
      <CarAdd />
    </Route>
    <Route exact path="/dashboard/companies">
      <CompanyTable />
    </Route>
    <Route exact path="/dashboard/companies/addAddress">
      <AddressAdd />
    </Route>
    <Route exact path="/dashboard/companies/addCompany">
      <CompanyAdd />
    </Route>
    <Route exact path="/dashboard/posts">
      <PostTable />
    </Route>
  </Switch>
);
