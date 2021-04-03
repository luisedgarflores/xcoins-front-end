import UpsertUser from "../Users/UpsertUser";
import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) {
      user {
        id
        name
        username
        role
        email
      }
      token {
        token
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation signUp {
    signUp {
      token
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input)
  }
`;

export const UPSERT_USER = gql`
  mutation upsertUser($input: UpsertUserInput!) {
    upsertUser(input: $input) {
      id
      name
      email
      username
      role
    }
  }
`;
