//login #2
import React, { useEffect, useContext, useState } from "react";
import { Container, Grid } from "@material-ui/core";

import { useLoginStyles } from "./Login.styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppContext from "../Context/AppContext";
import useMutationHelper from "../Mutations/UseMutationHelper";
import { SIGN_IN, SIGN_UP, VALIDATE_USER } from "../Mutations/Mutations";
import { SplashScreenContainer } from "./LoginComponents/SplashScreenContainer";
import { LoginContainer } from "./LoginComponents/LoginContainer";
import { SignUpContainer } from "./LoginComponents/SignUpContainer";
import { OTPScreen } from "./LoginComponents/OTPScreen";
import useFormReducer from "../Utils/UseFormReducer";
import { validations, signUpValidations, otpValidations } from "./Login.utils";
import BasicAlert from "../RootComponents/BasicAlert";
import { getUserRoutes } from "../Utils/utils";
import { useLazyQuery } from "@apollo/client";
import { REQUEST_OTP } from "../Queries/Queries";

const Login = ({ history }) => {
  // clears local storage when login renders

  const [requestOTP] = useLazyQuery(REQUEST_OTP, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    localStorage.clear();
  }, []);
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
  const [views, dispatchViews] = useState({
    login: true,
    splashScreen: true,
    signUp: false,
    otpScreen: false,
  });

  // In case login request is performed with no errors
  const handleSuccess = (data) => {
    resetForm()
    if (data.signIn.user.validatedUser) {
      const userRoutes = getUserRoutes(data.signIn.user.role);
      localStorage.setItem("token", data.signIn.token.token);
      localStorage.setItem("xcoins-user", JSON.stringify(data.signIn.user));
      appProvider.setUser(data.signIn.user);
      appProvider.setRoutes(userRoutes);
      history.replace("/home");
    } else {
      localStorage.setItem("token", data.signIn.token.token);
      dispatchViews({
        otpScreen: true,
        splashScreen: matches,
        login: false,
        signUp: false,
      });
    }
  };

  const handleSuccessOTP = (data) => {
    resetValidateUserForm()
    if (data.validateUser.user.validatedUser) {
      const userRoutes = getUserRoutes(data.validateUser.user.role);
      console.log(userRoutes);
      localStorage.setItem("token", data.validateUser.token.token);
      localStorage.setItem(
        "xcoins-user",
        JSON.stringify(data.validateUser.user)
      );
      appProvider.setUser(data.validateUser.user);
      appProvider.setRoutes(userRoutes);
      history.replace("/home");
    } else {
      console.log(
        "\x1b[32m%s\x1b[0m",
        "================================================="
      );
      console.log("Oh");
      console.log(
        "\x1b[32m%s\x1b[0m",
        "================================================="
      );
      localStorage.setItem("token", data.validateUser.token.token);
      dispatchViews({
        otpScreen: true,
        splashScreen: matches,
        login: false,
        signUp: false,
      });
    }
  };

  const handleSignUpSuccess = (data) => {
    resetSignUpForm()
    localStorage.setItem("token", data.signUp.token.token);
    dispatchViews((prevState) => ({
      otpScreen: true,
      splashScreen: matches,
      login: false,
      signUp: false,
    }));
  };

  const handleError = (error) => {
    handleAlert({
      open: true,
      text: error.message,
      severity: "error",
    });
  };

  // Uses apollo client custom hook to handle sign in mutation
  const { executeMutation } = useMutationHelper(SIGN_IN, {
    onCompletedFn: handleSuccess,
    onErrorFn: handleError,
  });

  // Uses apollo client custom hook to handle sign up mutation
  const { executeMutation: executeSignUpMutation } = useMutationHelper(
    SIGN_UP,
    {
      onCompletedFn: handleSignUpSuccess,
      onErrorFn: handleError,
    }
  );

  // Uses apollo client custom hook to handle user validation
  const { executeMutation: validateUser } = useMutationHelper(VALIDATE_USER, {
    onCompletedFn: handleSuccessOTP,
    onErrorFn: handleError,
  });

  // Uses react custom hook to handle form state
  const [
    form,
    _dispatchForm,
    { updateForm, validateForm, resetForm },
  ] = useFormReducer({
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

  // Handles OTP form
  const [
    validateUserForm,
    _dispatchValidateUserForm,
    {
      updateForm: updateValidateUserForm,
      validateForm: validateValidateUserForm,
      resetForm: resetValidateUserForm
    },
  ] = useFormReducer({
    initialState: [
      {
        otp: {
          value: "",
          error: null,
          valid: false,
        },
      },
    ],
    validations: otpValidations,
  });

  const [
    signUpForm,
    _dispatchSignUpForm,
    {
      updateForm: updateSignUpForm,
      validateForm: validateSignUpForm,
      resetForm: resetSignUpForm,
    },
  ] = useFormReducer({
    initialState: [
      {
        name: {
          value: "",
          valid: false,
          error: null,
        },
        email: {
          value: "",
          valid: false,
          error: null,
        },
        username: {
          value: "",
          valid: false,
          error: null,
        },
        password: {
          value: "",
          valid: false,
          error: null,
        },
      },
    ],
    validations: signUpValidations,
  });

  useEffect(() => {
    if (matches) {
      dispatchViews({
        login: true,
        splashScreen: true,
        signUp: false,
      });
    } else {
      dispatchViews({
        login: false,
        splashScreen: true,
        signUp: false,
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

  // Validates signup form and performs mutation
  const nextSignUp = () => {
    const validForm = validateSignUpForm();
    if (validForm) {
      executeSignUpMutation({
        variables: {
          input: {
            username: signUpForm[0].username.value,
            password: signUpForm[0].password.value,
            name: signUpForm[0].name.value,
            email: signUpForm[0].email.value,
          },
        },
      });
    }
  };

  const nextOTPForm = () => {
    const validForm = validateValidateUserForm();
    if (validForm) {
      validateUser({
        variables: {
          input: {
            otp: validateUserForm[0].otp.value,
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
        {views.signUp && (
          <SignUpContainer
            matches={matches}
            classes={classes}
            form={signUpForm}
            views={views}
            dispatchViews={dispatchViews}
            next={nextSignUp}
            updateForm={updateSignUpForm}
          />
        )}
        {views.otpScreen && (
          <OTPScreen
            matches={matches}
            classes={classes}
            form={validateUserForm}
            views={views}
            dispatchViews={dispatchViews}
            next={nextOTPForm}
            updateForm={updateValidateUserForm}
            requestOTP={requestOTP}
          />
        )}
      </Grid>
      <BasicAlert
        open={alert.open}
        handleAlert={handleAlert}
        severity={alert.severity}
        text={alert.text}
      />
    </Container>
  );
};

export default Login;
