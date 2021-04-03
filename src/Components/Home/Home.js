import React from "react";
// Basic components
import BasicContainer from "../RootComponents/BasicContainer";
// Home components
import ExchangeContainer from "./HomeComponents/ExchangeContainer";
import ExchangeBar from "./HomeComponents/ExchangeBar";
// Material-ui components
import Grid from "@material-ui/core/Grid";
// Styles
import { useHomeStyles } from "./Home.styles";
// Subscriptions
import { useSubscription } from "@apollo/client";
import { UPDATE_EXCHANGE_RATE } from "../Subscriptions/Subscriptions";

const Home = ({ props }) => {
  const classes = useHomeStyles();
  const { data, loading, error } = useSubscription(UPDATE_EXCHANGE_RATE);
  if (data) {
    console.log(data);
  }

  if (error) {
    console.log(error);
  }

  if (loading) {
    console.log("loading");
  }
  return (
    <BasicContainer>
      <Grid
        container
        alignContent="center"
        justify="center"
        className={classes.root}
      >
        <ExchangeContainer
          title="BTC/USD"
          subtitle='Get current exchange rate for BTS/USD. Fill "Set spread" to calculate custom spread'
        >
          {data && !loading && <ExchangeBar data={data.exchangeRateUpdated}/>}
        </ExchangeContainer>
      </Grid>
    </BasicContainer>
  );
};

export default Home;
