import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./components/Dashboard";

function App() {
  const { userRole, adminRole, managerRole, isLoggedIn } = useSelector(
    (state) => state.user
  );

  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
      {isLoggedIn ? (
        (userRole && <Redirect to="/user" />) ||
        (adminRole && <Redirect to="/dashboard" />) ||
        (managerRole && <Redirect to="/dashboard" />)
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}

export default App;
