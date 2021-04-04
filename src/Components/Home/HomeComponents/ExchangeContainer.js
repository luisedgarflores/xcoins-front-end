import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useExchangeContainerStyles } from "./ExchangeContainer.styles";

const ExchangeContainer = ({ children, title, subtitle }) => {
  const classes = useExchangeContainerStyles();
  return (
    <Grid
      item
      xs={12}
      container
      justify="center"
      alignContent="space-around"
      className={classes.container}
    >
      <Grid item xs={12}>
        <Typography align="center" variant="h2">
          {title}
        </Typography>
        <Typography align="center" variant="subtitle1">
          {subtitle}
        </Typography>
      </Grid>
      {children}
    </Grid>
  );
};

export default ExchangeContainer;
