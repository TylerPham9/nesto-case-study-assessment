import { expect, type Locator, type Page } from '@playwright/test';
import { signupCopy } from '../config/copy'; // TODO: Create copy for login pagegit
import type { AppLocale } from '../config/locales';

type LoginSelectors = {
  email: Locator;
  submitButton: Locator;
};

const loginPaths: Record<AppLocale, string> = {
  en: '/',
  fr: '/fr',
};

export class LoginPage {
  readonly selectors: LoginSelectors;

  constructor(
    private readonly page: Page,
    private readonly locale: AppLocale,
  ) {
    this.selectors = {
      email: page.getByRole('textbox', { name: 'Email' }),
      submitButton: page.getByRole('button', { name: signupCopy[locale].login }),
    };
  }

  async goto() {
    await this.page.goto(loginPaths[this.locale]);
    await expect(this.selectors.email).toBeVisible();
    await expect(this.selectors.submitButton).toBeVisible();
  }
}
