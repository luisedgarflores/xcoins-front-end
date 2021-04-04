import React, { useEffect, useState } from "react";
// Basic components
import BasicContainer from "../RootComponents/BasicContainer";
import BasicLoading from "../RootComponents/BasicLoading";
import BasicAlert from '../RootComponents/BasicAlert'
// Home components
import ExchangeContainer from "./HomeComponents/ExchangeContainer";
import ExchangeBar from "./HomeComponents/ExchangeBar";
// Subscriptions
import { useLazyQuery } from "@apollo/client";
// Queries
import { GET_EXCHANGE_RATE } from "../Queries/Queries";

const Home = ({ props }) => {
  const [alert, handleAlert] = useState({
    open: false,
    text: "",
  });
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
          <ExchangeBar handleAlert={handleAlert} initialData={initialData.getExchangeRate} />
        )}
        {initialLoading && <BasicLoading />}
      </ExchangeContainer>
      <BasicAlert
        open={alert.open}
        handleAlert={handleAlert}
        severity="success"
        text={alert.text}
      />
    </BasicContainer>
  );
};

export default Home;
