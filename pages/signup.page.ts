import { expect, type Locator, type Page } from '@playwright/test';
import type { AppLocale } from '../config/locales';
import { signupCopy, type SignupCopy } from '../config/copy/index';

export type SignupLocale = AppLocale;

export type SignupDetails = {
  firstName: string;
  lastName: string;
  phone: string;
  region: string;
  email: string;
  password: string;
};

type SignupSelectors = {
  heading: Locator;
  submitButton: Locator;
  loginHeaderButton: Locator;
  mobile: {
    menu: Locator;
    menuOpenButton: Locator;
    menuCloseButton: Locator;
    languageMenuButton: Locator;
    loginButton: Locator;
  };
  languageToggleButton: Locator;
  loginLink: Locator;
  termsLink: Locator;
  privacyLink: Locator;
  fields: {
    firstName: Locator;
    lastName: Locator;
    phoneCountry: Locator;
    phone: Locator;
    region: Locator;
    email: Locator;
    password: Locator;
    confirmPassword: Locator;
    consentCheckbox: Locator;
  };
  errors: {
    firstName: Locator;
    lastName: Locator;
    phone: Locator;
    email: Locator;
    password: Locator;
  };
};

export class SignupPage {
  private readonly labels: SignupCopy;
  readonly selectors: SignupSelectors;

  constructor(
    private readonly page: Page,
    locale: SignupLocale,
  ) {
    this.labels = signupCopy[locale];

    this.selectors = {
      heading: page.getByRole('heading', {
        name: this.labels.heading,
      }),

      submitButton: page.getByRole('button', {
        name: this.labels.submit,
      }),

      loginHeaderButton: page.getByTestId('header-login-button'),
      mobile: {
        menu: page.getByTestId('burger-menu'),
        menuOpenButton: page.getByTestId('open-burger-menu'),
        menuCloseButton: page.getByTestId('close-burger-menu'),
        languageMenuButton: page.getByTestId('menu-button'),
        loginButton: page
          .getByTestId('burger-menu')
          .getByRole('link', { name: this.labels.menuLoginButton, exact: true }),
      },
      languageToggleButton: page.getByTestId('header-language-switch'),
      loginLink: page.getByTestId('login-link'),
      termsLink: page.getByTestId('terms-link'),
      privacyLink: page.getByRole('link', { name: this.labels.privacy }),

      fields: {
        firstName: page.getByTestId('first-name-input'),
        lastName: page.getByTestId('last-name-input'),
        phoneCountry: page.getByRole('combobox', {
          name: 'Phone number country',
        }),
        phone: page.getByTestId('phoneInput'),
        region: page.getByTestId('region-select'),
        email: page.getByTestId('email-input'),
        password: page.getByTestId('password-input'),
        confirmPassword: page.getByTestId('passwordConfirmation-input'),
        consentCheckbox: page.getByTestId('agreement-checkbox'),
      },

      errors: {
        firstName: page.getByTestId('first-name-error-message-typography'),
        lastName: page.getByTestId('last-name-error-message-typography'),
        phone: page.getByTestId('phone-error-message-typography'),
        email: page.getByTestId('email-error-message-typography'),
        password: page.getByTestId('password-error-message-typography'),
      },
    };
  }

  async fillForm(details: SignupDetails, consent?: boolean) {
    await this.selectors.fields.firstName.fill(details.firstName);
    await this.selectors.fields.lastName.fill(details.lastName);
    await this.selectors.fields.phone.fill(details.phone);

    await this.selectors.fields.region.selectOption({
      label: details.region,
    });

    await this.selectors.fields.email.fill(details.email);
    await this.typePasswords(details.password, details.password);

    if (consent !== undefined) {
      await this.selectors.fields.consentCheckbox.setChecked(consent);
    }
  }

  // Return the Region abbr value
  async getRegionValue() {
    return this.selectors.fields.region.inputValue();
  }

  async typePasswords(password: string, confirmPassword: string) {
    await this.selectors.fields.password.fill(password);
    await this.selectors.fields.confirmPassword.fill(confirmPassword);
  }

  // Expect the error message for a specific field to be visible and match the expected message
  async expectFieldError(fieldName: keyof SignupSelectors['errors'], expectedMessage: string) {
    await expect(this.selectors.errors[fieldName]).toBeVisible({ timeout: 10000 });
    await expect(this.selectors.errors[fieldName]).toHaveText(expectedMessage, { timeout: 10000 });
    await expect(this.selectors.fields[fieldName]).toHaveAttribute('aria-invalid', 'true');
  }

  async submit() {
    await this.selectors.submitButton.click();
  }

  async goto() {
    await this.page.goto(this.labels.path);

    // ensure the page is fully loaded and ready for interaction
    await this.page.waitForLoadState('networkidle');
    await expect(this.selectors.heading).toBeVisible();
    await expect(this.selectors.fields.firstName).toBeEditable();
    await expect(this.selectors.submitButton).toBeEnabled();
  }
}
