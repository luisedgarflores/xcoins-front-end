import { loginRequired, passwordRequired } from "../Validations/validations";

export const validations = {
  login: loginRequired,
  password: passwordRequired
}

export const content = {
  text: {
    loginButton: 'Sign in',
    loginForm: 'Sign in',
    passwordInput: 'Password',
    loginInput: 'Username or email',
    signUpButton: 'Sign up'
  }
}