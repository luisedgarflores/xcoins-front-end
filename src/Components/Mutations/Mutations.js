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
        validatedUser
      }
      token {
        token
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input)
  }
`;

export const SIGN_UP = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      user {
        id
        name
        username
        role
        email
        validatedUser
      }
      token {
        token
      }
    }
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

export const VALIDATE_USER = gql`
  mutation validateUser($input: ValidateUserInput!) {
    validateUser(input: $input) {
      user {
        id
        name
        username
        email
        validatedUser
        role
      }
      token {
        token
      }
    }
  }
`;
