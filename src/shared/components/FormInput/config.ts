
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
  firstName: {
    id: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'First Name',
    excluded: false,
  },
  lastName: {
    id: 'lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Last Name',
    excluded: false,
  },
  fullName: {
    id: 'fullName',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Full Name',
    excluded: false,
  },
  address: {
    id: 'address',
    label: 'Address',
    type: 'text',
    placeholder: 'Address',
    excluded: false,
  },
  city: {
    id: 'city',
    label: 'City',
    type: 'text',
    placeholder: 'City',
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
    label: 'Repeat Password',
    placeholder: 'Repeat Password',
    excluded: true,
  },
  bookTitle: {
    id: 'title',
    type: 'text',
    label: 'Book Title',
    placeholder: 'Book Title',
    excluded: false,
  },
  bookAuthor: {
    id: 'author',
    type: 'text',
    label: 'Author',
    placeholder: 'Author',
    excluded: false,
  },
  zip: {
    id: 'zip',
    label: 'Zip Code',
    type: 'text',
    placeholder: 'Zip Code',
    excluded: false,
  },
}