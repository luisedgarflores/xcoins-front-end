import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import React, { useState, useContext, useEffect, useRef } from "react";
import { withRouter } from "react-router";
import BasicButton from "../RootComponents/BasicButton";
import { Switch, Route } from "react-router-dom";
import { getUserRoutes } from "../Utils/utils";
import AppContext from "../Context/AppContext";
import Login from "../Login/Login";
import BasicAlert from "../RootComponents/BasicAlert";
import _ from 'lodash'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "0px 8px 0px 8px",
  },
  dialog: {
    paper: {
      backgroundColor: "#393e46",
    },
  },
  noticeRow: {
    marginBottom: 16,
  },
}));

const Navbar = ({ history, _providerInstance }) => {
  const classes = useStyles();
  const appProvider = useContext(AppContext);
  const [alert, handleAlert] = useState({
    open: false,
    text: "",
  });

  const handleLogout = () => {
    appProvider.setUser({});
    appProvider.setRoutes([]);
    localStorage.clear();
    history.replace("/");
  }

  const [currentRoute, setCurrentRoute] = useState("/home");
  const handleRouteChange = (newRoute) => {
    setCurrentRoute((prevRoute) => {
      history.replace(newRoute);
      return newRoute;
    });
  };

  const userRoutes = getUserRoutes(appProvider.user.role);

  const buttonRoutes = userRoutes.filter((route) => route.shouldAppear);

  return (
    <>
      {appProvider.user.role && (
        <AppBar position="fixed" color="secondary">
          <Toolbar variant="dense">
            {buttonRoutes.map((route) => (
              <BasicButton
                className={classes.button}
                disableElevation={true}
                handleClick={() => handleRouteChange(route.path)}
                color={currentRoute === route.path ? "primary" : "secondary"}
              >
                {route.name}
              </BasicButton>
            ))}
            <BasicButton
              color="secondary"
              className={classes.button}
              handleClick={handleLogout}
            >
              Cerrar sesión
            </BasicButton>
          </Toolbar>
        </AppBar>
      )}
      <Switch>
        {userRoutes.map((route) => (
          <Route path={route.path} component={route.component} />
        ))}
        <Route path="/" component={Login} />
      </Switch>
      <BasicAlert
        open={alert.open}
        handleAlert={handleAlert}
        text={alert.text}
        severity={alert.severity}
      />
    </>
  );
};

export default withRouter(Navbar);
