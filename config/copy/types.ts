export type SignupCopy = {
  path: string;
  heading: string;
  submit: string;
  login: string;
  menuLoginButton: string;
  language: string;
  terms: string;
  privacy: string;
  fieldLabels: {
    firstName: string;
    lastName: string;
    phoneCountry: string;
    phone: string;
    region: string;
    email: string;
    password: string;
    confirmPassword: string;
    consentCheckbox: string;
  };
  regionOptions: string[];
  errors: {
    required: string;
    invalidName: string;
    phoneInvalid: string;
    emailInvalid: string;
    passwordTooShort: string;
    passwordComplexity: string;
  };
};
