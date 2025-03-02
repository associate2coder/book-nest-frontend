
// export type configKeys = 
//   | 'firstName'
//   | 'lastName'
//   | 'email'
//   | 'password'
//   | 'repeatPassword';

// interface FormInputConfig {
//   id: string;
//   type: "text" | "email" | "password";
//   placeholder: string;
//   required: boolean;
//   excluded: boolean;
// }

// export type FormInputConfigMap = Record<string, FormInputConfig>;

export const formInputConfig = {
  fullName: {
    id: 'fullName',
    label: 'Full name',
    type: 'text',
    placeholder: 'Full name',
    excluded: false,
  },
  email: {
    id: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Email',
    excluded: false,
  },
  password: {
    id: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Password',
    excluded: false,
  },
  repeatPassword: {
    id: 'repeatPassword',
    type: 'password',
    label: 'Repeat password',
    placeholder: 'Repeat password',
    excluded: true,
  },
}