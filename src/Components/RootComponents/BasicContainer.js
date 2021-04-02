import React from "react";

import { Container, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 700,
    height: "100vh",
    maxHeight: "auto",
    padding: "100px 50px 100px 50px",
    backgroundColor: "#393e46",
    zIndex: "-1",
  },
  rootSm: {
    minHeight: 530,
    height: "100vh",
    maxHeight: "auto",
    padding: "15px 15px 15px 15px",
    backgroundColor: "#393e46",
    zIndex: "-1",
  },
  parent: {
    height: "100%",
    backgroundColor: "#40464F",
    minHeight: 400,
  },
}));

export function BasicContainer({ children }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const classes = useStyles();
  return (
    <Container
      disableGutters={true}
      maxWidth="xl"
      className={matches ? classes.root : classes.rootSm}
    >
      <Grid container className={classes.parent} alignContent="flex-start">
        {children}
      </Grid>
    </Container>
  );
}
