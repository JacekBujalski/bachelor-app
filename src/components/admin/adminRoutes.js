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
import PostAdd from "./post/postAdd";
import Car from "./car/car";
import Post from "./post/post";
import Company from "./company/company";
import PlannedService from "./service/plannedService";
import PlannedServiceAdd from "./service/plannedServiceAdd";
import PlannedServicesTable from "./service/plannedServicesTable";
import ReportPage from "../../pages/ReportPage";
import FuelingReport from "../shared/fuelingReport";
import ServicesReport from "../shared/servicesReport";
import DamagesReport from "../shared/damagesReport";

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
    <Route exact path="/dashboard/cars/:id">
      <Car />
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
    <Route exact path="/dashboard/companies/:id">
      <Company />
    </Route>
    <Route exact path="/dashboard/posts">
      <PostTable />
    </Route>
    <Route exact path="/dashboard/posts/addPost">
      <PostAdd />
    </Route>
    <Route exact path="/dashboard/posts/:id">
      <Post />
    </Route>
    <Route exact path="/dashboard/posts/:id">
      <Post />
    </Route>
    <Route exact path="/dashboard/services/planned/">
      <PlannedServicesTable />
    </Route>
    <Route exact path="/dashboard/services/planned/addService">
      <PlannedServiceAdd />
    </Route>
    <Route exact path="/dashboard/services/planned/:id">
      <PlannedService />
    </Route>
    <Route exact path="/dashboard/reports">
      <ReportPage />
    </Route>
    <Route exact path="/dashboard/reports/fueling/:id">
      <FuelingReport />
    </Route>
    <Route exact path="/dashboard/reports/services/:id">
      <ServicesReport />
    </Route>
    <Route exact path="/dashboard/reports/damages/:id">
      <DamagesReport />
    </Route>
  </Switch>
);
