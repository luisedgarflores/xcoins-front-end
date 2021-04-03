import React, { useEffect } from "react";
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
import { useLazyQuery } from "@apollo/client";
import BasicLoading from "../RootComponents/BasicLoading";
// Queries
import { GET_EXCHANGE_RATE } from "../Queries/Queries";

const Home = ({ props }) => {
  const classes = useHomeStyles();
  const [
    executeQuery,
    { data: initialData, loading: initialLoading, error: initialError },
  ] = useLazyQuery(GET_EXCHANGE_RATE);

  if (initialError) {
    console.log(initialError);
  }

  useEffect(() => {
    executeQuery();
  }, [executeQuery]);

  return (
    <BasicContainer>
      <ExchangeContainer
        title="BTC/USD"
        subtitle='Get current exchange rate for BTS/USD. Fill "Set spread" to calculate custom spread. Exchange rate automatically updates every 60 seconds.'
      >
        {initialData?.getExchangeRate && !initialLoading && (
          <ExchangeBar initialData={initialData.getExchangeRate} />
        )}
        {initialLoading && <BasicLoading />}
      </ExchangeContainer>
    </BasicContainer>
  );
};

export default Home;
