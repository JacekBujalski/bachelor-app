import { Route, Switch } from "react-router-dom";
import ManagerCars from "./car/managerCars";

export const managerRoutes = (
  <Switch>
    <Route exact path="/dashboard/manager">
      Hejka menago
    </Route>
    <Route exact path="/dashboard/manager/users">
      Menago userzy
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
      Menago raporty
    </Route>
  </Switch>
);
