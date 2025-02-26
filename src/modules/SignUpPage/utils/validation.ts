export interface ValidationResponse {
  validated: boolean;
  message?: string;
}

// RegExp for password validation
export const passwordValidators = {
  size: {
    regexp: /^.{8,}$/,
    message: 'be at least 8 characters',
  },
  upper: {
    regexp: /(?=.*[A-Z])/,
    message: 'have at least one uppercase character',
  },
  lower: {
    regexp: /(?=.*[a-z])/,
    message: 'have at least one lowercase character',
  },
  number: {
    regexp: /(?=.*\d)/,
    message: 'have at least one number',
  },
  special: {
    regexp: /(?=.*[!@#$%^&*()\-_+=])/,
    message: 'have at least one special character !@#$%^&*()-_+=',
  }
}

// transform validation result into response object
const prepareResponse = (validated: boolean, message?: string) => {
  return { validated, message };
}

// validating email
export const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0–9._%+-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,}$/;

  if (!regex.test(email)) {
    return prepareResponse(false, `Please enter a valid e-mail address`);
  }

  return prepareResponse(true);
}

// validating password
export const validatePassword = (password: string) => {
  const errors: string[] = [];

  // Object.values(passwordValidators).forEach(validator => {
  //   if (!validator.regexp.test(password)) {
  //     errors.push(validator.message);
  //   }
  // });

  const validator = passwordValidators.size;

  if (!validator.regexp.test(password)) {
    errors.push(validator.message);
  }

  const validated = errors.length === 0;
  const message = 'Must ' + errors.join('\n');

  return prepareResponse(validated, message);
}


// validating name
export const validateFullName = (name: string) => {
  if (name.length === 0) {
    return prepareResponse(false, `Name can't be empty`);
  }

  return prepareResponse(true);
}