import React, { useEffect, useState, useRef, useMemo } from "react";
import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import AppContext from "./Components/Context/AppContext";
import _ from "lodash";
function AppProvider(user) {
  this.user = user;
  this.routes = [];
  this.alert = {
    severity: null,
    open: false,
    text: ''
  }

  this.setUser = (newUser) => {
    this.user = newUser;
  };

  this.getUser = () => {
    return this.user;
  };

  this.setRoutes = () => {
    return this.routes;
  };

  this.setAlert = (alert) => {
    this.alert = alert
  }
}

function App() {
  const appProvider = useMemo(
    () =>
      new AppProvider({
        name: null,
        token: null,
        role: null,
      }),
    []
  );

  const localUser = localStorage.getItem("xcoins-user");

  if (localUser) {
    appProvider.setUser(JSON.parse(localUser));
  }

  return (
    <AppContext.Provider value={appProvider}>
      <div>
        <Navbar appProvider={appProvider} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
