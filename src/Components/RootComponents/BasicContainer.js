import React from "react";

import { Container, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { deepPurple } from "../Utils/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 700,
    height: "100vh",
    maxHeight: "auto",
    padding: "100px 50px 100px 50px",
    zIndex: "-1",
  },
  rootSm: {
    minHeight: 530,
    height: "100vh",
    maxHeight: "auto",
    padding: "15px 15px 15px 15px",
    zIndex: "-1",
  },
  parent: {
    height: "100%",
    backgroundColor: deepPurple,
    minHeight: 400,
  },
}));

const BasicContainer = ({ children }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const classes = useStyles();
  return (
    <Container
      disableGutters={true}
      maxWidth="xl"
      className={matches ? classes.root : classes.rootSm}
    >
      {children}
    </Container>
  );
};

export default BasicContainer;
