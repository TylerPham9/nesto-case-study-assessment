import { test as base, expect } from '@playwright/test';
import type { AppLocale } from '../config/locales';
import { LoginPage } from '../pages/login.page';
import { SignupPage } from '../pages/signup.page';

type TestOptions = {
  locale: AppLocale;
};

type TestFixtures = {
  loginPage: LoginPage;
  signupPage: SignupPage;
};

export const test = base.extend<TestOptions & TestFixtures>({
  locale: ['en', { option: true }],
  loginPage: async ({ page, locale }, use) => {
    await use(new LoginPage(page, locale));
  },
  signupPage: async ({ page, locale }, use) => {
    await use(new SignupPage(page, locale));
  },
});

export { expect };
