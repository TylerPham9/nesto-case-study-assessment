import { test } from '../../fixtures/test';
import { SUPPORTED_LOCALES } from '../../config/locales';
import { signupCopy } from '../../config/copy/index';

for (const locale of SUPPORTED_LOCALES) {
  test.describe(`locale: ${locale}`, () => {
    test.use({ locale });

    test.beforeEach(async ({ signupPage }) => {
      await signupPage.goto();
    });

    test('Empty signup form should show required field errors', async ({ signupPage }) => {
      // Submit the form without filling any fields to trigger errors
      await signupPage.submit();

      const fieldsWithErrors = [
        ['firstName', signupCopy[locale].errors.required],
        ['lastName', signupCopy[locale].errors.required],
        ['phone', signupCopy[locale].errors.phoneInvalid],
        ['email', signupCopy[locale].errors.emailInvalid],
        ['password', signupCopy[locale].errors.passwordTooShort],
      ] as const;

      for (const [fieldName, expectedMessage] of fieldsWithErrors) {
        await signupPage.expectFieldError(fieldName, expectedMessage);
      }
    });

    test('Invalid First Name should show error message', async ({ signupPage }) => {
      await signupPage.selectors.fields.firstName.fill('123');
      await signupPage.submit();

      await signupPage.expectFieldError('firstName', signupCopy[locale].errors.invalidName);
    });

    test('Invalid Last Name should show error message', async ({ signupPage }) => {
      await signupPage.selectors.fields.lastName.fill('123');
      await signupPage.submit();

      await signupPage.expectFieldError('lastName', signupCopy[locale].errors.invalidName);
    });

    // This only tests 1 invalid email format, but you can add more test cases for different invalid formats if needed.
    test('Invalid Email should show error message', async ({ signupPage }) => {
      await signupPage.selectors.fields.email.fill('invalid-email');
      await signupPage.submit();

      await signupPage.expectFieldError('email', signupCopy[locale].errors.emailInvalid);
    });

    // Password error related tests

    test('Password too short should show error message', async ({ signupPage }) => {
      const password = 'short'; // Less than 12 characters
      await signupPage.typePasswords(password, password);
      await signupPage.submit();

      await signupPage.expectFieldError('password', signupCopy[locale].errors.passwordTooShort);
    });

    test('Password that doesnt have a number should show error message', async ({ signupPage }) => {
      const password = 'PasswordWithoutNumber';
      await signupPage.typePasswords(password, password);
      await signupPage.submit();

      await signupPage.expectFieldError('password', signupCopy[locale].errors.passwordComplexity);
    });

    test('Password that doesnt have a lower case letter should show error message', async ({
      signupPage,
    }) => {
      const password = 'PASSWORDWITHOUTLOWERCASE1';
      await signupPage.typePasswords(password, password);
      await signupPage.submit();

      await signupPage.expectFieldError('password', signupCopy[locale].errors.passwordComplexity);
    });

    test('Password that doesnt have an upper case letter should show error', async ({
      signupPage,
    }) => {
      const password = 'passwordwithoutuppercase1';
      await signupPage.typePasswords(password, password);
      await signupPage.submit();

      await signupPage.expectFieldError('password', signupCopy[locale].errors.passwordComplexity);
    });

    test('Password and Confirm Password mismatch should show error message', async ({
      signupPage,
    }) => {
      await signupPage.typePasswords('validpassword123', 'differentpassword123');
      await signupPage.submit();

      await signupPage.expectFieldError('password', signupCopy[locale].errors.passwordComplexity);
    });
  });
}
