export const email = {
  email: {
    message: "^*Valid mail is required"
  },
  presence: {
    allowEmpty: false,
    message: "^*Mail is required"
  }
}

export const codeRequired = {
  presence: {
    allowEmpty: false,
    message: '^The code is required'
  }
}

export const loginRequired = {
  presence: {
    allowEmpty: false, 
    message: '^*Username or email is required'
  }
}
export const user = {
  presence: {
    allowEmpty: false,
    message: "^*User is required",
  },
};

export const userLogin = {
  ...user,
};

export const roleRequired = {
  presence: {
    allowEmpty: false,
    message: '^*Role is required'
  }
}

export const nameRequired = {
  presence: {
    allowEmpty: false,
    message: '^*Name is required'
  }
}

export const userSignUp = {
  ...user,
  length: {
    minimum: 7,
    maximum: 20,
    tooShort: "^*Username length must be at least 7 characters",
    tooLong: "^*Username length cannot be longer than 20 characters"
  },
};

export const passwordRequired = {
  presence: {
    allowEmpty: false,
    message: "^*Password is required",
  },
};

export const passwordSignUp = {
  length: {
    minimum: 6,
    maximum: 20,
    tooShort: "^*Password length must be at least 7 characters",
    tooLong: "^*Password length cannot be longer than 20 characters",
  }
};

