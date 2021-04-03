import {
  userSignUp,
  passwordSignUp,
  roleRequired,
  email,
  nameRequired,
} from "../Validations/validations";

export const validations = {
  password: passwordSignUp,
  username: userSignUp,
  email,
  name: nameRequired,
  role: roleRequired,
}

export const roleOptions = [
  {
    id: "ADMIN",
    name: "Administrator",
  },
  {
    id: "CLIENT",
    name: "Client",
  },
];