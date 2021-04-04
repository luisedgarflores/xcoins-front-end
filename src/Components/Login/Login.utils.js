import { loginRequired, passwordRequired, userSignUp,
  passwordSignUp,
  email,
  nameRequired, codeRequired} from "../Validations/validations";


export const validations = {
  login: loginRequired,
  password: passwordRequired,
};

export const signUpValidations = {
  password: passwordSignUp,
  username: userSignUp,
  email,
  name: nameRequired,
};

export const otpValidations = {
  otp: codeRequired
}

export const content = {
  text: {
    loginButton: "Sign in",
    loginForm: "Sign in",
    passwordInput: "Password",
    loginInput: "Username or email",
    signUpButton: "Sign up",
    signUpForm: "Sign up",
    otpInput: 'Code',
    otpButton: 'Validate code'
  },
};
