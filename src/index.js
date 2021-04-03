import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import {
  deepBlue,
  lightPurple,
  white,
  deepPurple,
} from "./Components/Utils/colors";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

import { WebSocketLink } from "@apollo/client/link/ws";

const wsLink = new WebSocketLink({
  uri: "ws://localhost:8000/graphql",
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql",
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // returnthe headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: lightPurple,
    },
    primary: {
      light: deepBlue,
      main: deepBlue,
      dark: deepBlue,
      contrastText: white,
    },
    secondary: {
      main: deepPurple,
      dark: deepPurple,
      contrastText: white,
    },
    error: {
      main: "#ff0000",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: ["Titillium Web", "sans-serif"].join(","),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <App />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();
