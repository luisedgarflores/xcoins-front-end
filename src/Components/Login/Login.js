//login #2
import React, { useReducer, useEffect, useContext, useState } from "react";
import { Container, Grid } from "@material-ui/core";

import { useLoginStyles } from "./login.styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppContext from "../Context/AppContext";
import useMutationHelper from "../Mutations/UseMutationHelper";
import { SIGN_IN } from "../Mutations/Mutations";
import { SplashScreenContainer } from "./LoginComponents/SplashScreenContainer";
import { LoginContainer } from "./LoginComponents/LoginContainer";
import useFormReducer from "../Utils/UseFormReducer";
import { validations } from "./login.utils";
import BasicAlert from "../RootComponents/BasicAlert";
const viewReducer = (prevState, action) => {
  switch (action.type) {
    case "handleViews":
      return action.value;
    default:
      return prevState;
  }
};

const Login = ({ history }) => {
  // Handles alert
  const [alert, handleAlert] = useState({
    open: false,
    text: "",
  });

  // Use custom theme
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const appProvider = useContext(AppContext);
  const classes = useLoginStyles();

  // Reducer used to handle the elements to display in login
  const [views, dispatchViews] = useReducer(viewReducer, {
    login: true,
    splashScreen: true,
    signUp: false,
  });

  // In case request is performed with no errors
  const handleSuccess = (data) => {;
    localStorage.clear();
    localStorage.setItem("token", data.signIn.token.token);
    localStorage.setItem("xcoins-user", data.signIn.user);

    appProvider.setUser(data.signIn);
    history.replace("/home");
  };

  const handleError = (error) => {
    console.log(Object.keys(error))
    handleAlert({
      open: true,
      text: error.message,
    });
  };
  // Uses apollo client custom hook to handle mutations
  const { executeMutation } = useMutationHelper(SIGN_IN, {
    onCompletedFn: handleSuccess,
    onErrorFn: handleError,
  });

  // Uses react custom hook to handle form state
  const [form, _dispatchForm, { updateForm, validateForm }] = useFormReducer({
    initialState: [
      {
        login: {
          value: "",
          error: null,
          valid: false,
        },
        password: {
          value: "",
          error: null,
          valid: false,
        },
      },
    ],
    validations,
  });

  useEffect(() => {
    if (matches) {
      dispatchViews({
        type: "handleViews",
        value: {
          login: true,
          splashScreen: true,
          signUp: false,
        },
      });
    } else {
      dispatchViews({
        type: "handleViews",
        value: {
          login: false,
          splashScreen: true,
          signUp: false,
        },
      });
    }
  }, [matches]);

  // Validates form and performs mutation if all fields are valid
  const next = () => {
    const validForm = validateForm();
    if (validForm) {
      executeMutation({
        variables: {
          input: {
            login: form[0].login.value,
            password: form[0].password.value,
          },
        },
      });
    }
  };
  return (
    <Container
      disableGutters={true}
      maxWidth="xl"
      className={matches ? classes.root : classes.rootSm}
    >
      <Grid
        container
        alignContent="center"
        alignItems="center"
        className={matches ? classes.container : classes.containerSm}
      >
        {views.splashScreen && (
          <SplashScreenContainer
            classes={classes}
            matches={matches}
            dispatchViews={dispatchViews}
            views={views}
          />
        )}
        {views.login && (
          <LoginContainer
            next={next}
            matches={matches}
            classes={classes}
            form={form}
            updateForm={updateForm}
            views={views}
            dispatchViews={dispatchViews}
          />
        )}
      </Grid>
      <BasicAlert
        open={alert.open}
        handleAlert={handleAlert}
        severity="error"
        text={alert.text}
      />
    </Container>
  );
};

export default Login;
