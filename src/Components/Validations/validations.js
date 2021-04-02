export const email = {
  email: {
    message: "^*Debes introducir un mail válido"
  },
  presence: {
    allowEmpty: false,
    message: "^*El mail es requerido"
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
    message: "^*El usuario es requerido",
  },
};

export const userLogin = {
  ...user,
};

export const roleRequired = {
  presence: {
    allowEmpty: false,
    message: '^*El rol es requerido'
  }
}

export const phoneRequired = {
  presence: {
    allowEmpty: false,
    message: '^*El telefono es requerido'
  }
}

export const nameRequired = {
  presence: {
    allowEmpty: false,
    message: '^*El nombre es requerido'
  }
}

export const userSignUp = {
  ...user,
  length: {
    minimum: 6,
    maximum: 20,
    tooShort: "^*El nombre de usuario debe contener 6 caracteres al menos",
    tooLong: "^*El nombre de usuario no puede ser de más de 20 caracteres"
  },
};

export const passwordRequired = {
  presence: {
    allowEmpty: false,
    message: "^*Password is required",
  },
};

export const tipoDoc = {
  presence: {
    allowEmpty: false,
    message: '^*El tipo de documento es requerido'
  }
}

export const periodo = {
  presence: {
    allowEmpty: false,
    message: '^*El periodo es requerido'
  }
}

export const archivo = {
  presence: {
    allowEmpty: false,
    message: '^*El archivo es requerido'
  }
}

export const passwordSignUp = {
  length: {
    minimum: 6,
    maximum: 20,
    tooShort: "^*La contraseña debe contener al menos 6 caracteres",
    tooLong: "^*La contraseña no puede ser de más de 20 caracteres"
  }
};

export const mensajeRequired = {
  presence: {
    allowEmpty: false,
    message: '^*El mensaje es requerido'
  }
}

export const tipoUsuarioRequired = {
  presence: {
    allowEmpty: false,
    message: '^*El tipo de usuario es requerido'
  }
}

export const rfcRequired = {
  presence: {
    allowEmpty: false,
    message: '^*El RFC es requerido',
  },
  format: {
    pattern: /^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/,
    message: '^*El RFC introducido no tiene un patrón válido'
  }
}
