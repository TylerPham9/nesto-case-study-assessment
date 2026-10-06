import type { SignupCopy } from './types';

export const enSignupCopy = {
  path: '/signup',
  heading: 'Create a nesto account',
  submit: 'Create your account',
  login: 'Log in',
  menuLoginButton: 'Login',
  language: 'FR',
  terms: 'Terms of Service',
  privacy: 'Privacy Policy',
  fieldLabels: {
    firstName: 'First name',
    lastName: 'Last name',
    phoneCountry: 'Phone number country',
    phone: 'Phone number',
    region: 'Province of purchase',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm password',
    consentCheckbox:
      'By checking this box, you agree to be contacted by nesto’s partners for the purposes of offering you financial products. You agree to nesto sharing your mortgage information with its partners. You can opt-out at any time.',
  },
  regionOptions: [
    'Alberta',
    'British-Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Nova Scotia',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Northwest Territories',
    'Nunavut',
    'Yukon',
  ],
  errors: {
    required: 'The field is required',
    invalidName: 'Invalid name',
    phoneInvalid: 'Invalid value',
    emailInvalid: 'Invalid email',
    passwordTooShort: 'Minimum of 12 letters required',
    passwordComplexity:
      'Password must contain at least one uppercase letter, one lowercase letter and one number',
  },
} satisfies SignupCopy;
