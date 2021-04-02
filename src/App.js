import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";

import Navbar from "./Components/Navbar/Navbar";
import AppContext from "./Components/Context/AppContext";
import { getUserRoutes } from "./Components/Utils/utils";

function AppProvider(user) {
  this.user = user;

  this.setUser = (newUser) => {
    this.user = newUser;
  };

  this.getUser = () => {
    return user;
  };
}

function App() {
  const appProvider = new AppProvider({
    name: null,
    token: null,
    role: null,
  });

  const localUser = localStorage.getItem("xcoins-user");

  if (localUser) {
    appProvider.setUser(localUser);
  }

  const userRoutes = getUserRoutes(appProvider.user.role);

  return (
    <AppContext.Provider value={appProvider}>
      <div>
        <Navbar appProvider={appProvider} />
        <Switch>
          {userRoutes.map((route) => (
            <Route path={route.path} component={route.component} />
          ))}
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </AppContext.Provider>
  );
}

export default App;
