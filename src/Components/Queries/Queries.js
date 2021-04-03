import { gql } from "@apollo/client";

export const GET_EXCHANGE_RATE = gql`
  query getExchangeRate {
    getExchangeRate {
      usd
      lastUpdated
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      name
      role
      email
      username
    }
  }
`;
