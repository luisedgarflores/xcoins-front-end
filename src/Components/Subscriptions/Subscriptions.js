import { gql } from "@apollo/client";

export const UPDATE_EXCHANGE_RATE = gql`
  subscription exchangeRateUpdated {
    exchangeRateUpdated {
      usd
      lastUpdated
    }
  }
`;
