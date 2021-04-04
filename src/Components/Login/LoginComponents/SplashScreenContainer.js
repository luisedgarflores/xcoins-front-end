import React from "react";
import { Grid, Typography } from "@material-ui/core";
//RootComponents
import BasicButton from "../../RootComponents/BasicButton";
import bitcoin from "../../../Img/bitcoin.png";

export function SplashScreenContainer({
  classes,
  matches,
  dispatchViews,
  views,
}) {
  return (
    <Grid
      className={
        matches
          ? classes.splashScreenContainer
          : classes.splashScreenContainerSm
      }
      container
      item
      md={4}
      justify="center"
      alignItems="center"
      alignContent="center"
      m={matches ? 0 : 4}
    >
      <Grid
        className={
          matches ? classes.bitcoinContainer : classes.bitcoinContainerSm
        }
        item
        xs={12}
        container
        justify="center"
      >
        <img className={classes.bitcoin} src={bitcoin} alt="Xcoin logo" />
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.title} align="center" variant="h3">
          Xcoins
        </Typography>
      </Grid>
      <Grid item md={12}>
        <Typography variant="subtitle1" align="center">
          Buy Bitcoin and other digital currencies with a debit or credit card
          from a leading cryptocurrency exchange platform. Simply, Securely &
          without the wait.
        </Typography>
      </Grid>
      {!views.login &&  !views.signUp && !views.otpScreen && (
        <SplashScreenButton classes={classes} dispatchViews={dispatchViews} />
      )}
    </Grid>
  );
}

function SplashScreenButton({ classes, dispatchViews }) {
  return (
    <Grid
      className={classes.loginButton}
      item
      md={12}
      container
      justify="center"
    >
      <BasicButton
        fullWidth={true}
        color="secondary"
        handleClick={() =>
          dispatchViews({
            login: true,
            splashScreen: false,
            signUp: false,
            otpScreen: false,
          })
        }
      >
        Sign in
      </BasicButton>
    </Grid>
  );
}
