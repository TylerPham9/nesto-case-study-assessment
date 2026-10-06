import { expect, test } from '../../fixtures/test';
import type { Page } from '@playwright/test';
import { SUPPORTED_LOCALES } from '../../config/locales';
import { signupCopy } from '../../config/copy';
import { SignupPage, type SignupDetails } from '../../pages/signup.page';

// TODO: Move to account page object when implemented
async function expectAccountPageLinks(page: Page) {
  await expect(page.getByTestId('new-mortgage')).toBeVisible({ timeout: 10000 });
  await expect(page.getByTestId('renewal')).toBeVisible({ timeout: 10000 });
  await expect(page.getByTestId('refinance')).toBeVisible({ timeout: 10000 });
}

// TODO: Move to a Toast component object when implemented
function toastAlert(page: Page) {
  return page.getByRole('alert').and(page.locator('.Toastify__toast-body'));
}

// TODO: Utility functions to generate random signup details for testing, would use Faker in a larger project
const firstNames = ['Avery', 'Jordan', 'Morgan', 'Riley', 'Casey'];
const lastNames = ['Taylor', 'Parker', 'Reed', 'Bennett', 'Hayes'];

function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomItem<T>(items: T[]): T {
  return items[randomInteger(0, items.length)];
}

function randomToken(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
}

function createSignupDetails(locale: (typeof SUPPORTED_LOCALES)[number]): SignupDetails {
  return {
    firstName: randomItem(firstNames),
    lastName: randomItem(lastNames),
    phone: `+1416${randomInteger(2_000_000, 10_000_000)}`,
    region: randomItem(signupCopy[locale].regionOptions),
    email: `qa-${locale}-${randomToken()}@yopmail.com`,
    password: `Qa${randomToken()}1`,
  };
}

for (const locale of SUPPORTED_LOCALES) {
  test.describe(`locale: ${locale}`, () => {
    test.use({ locale });

    test.beforeEach(async ({ signupPage }) => {
      await signupPage.goto();
    });

    test('Signup form submission should create a new account', async ({ page, signupPage }) => {
      // TODO: centralize the api intercept logic
      const accountsResponsePromise = page.waitForResponse((response) => {
        const url = new URL(response.url());
        return url.pathname === '/api/accounts' && response.request().method() === 'POST';
      });

      const details = createSignupDetails(locale);
      await signupPage.fillForm(details);

      // Get the region abbreviation from the select dropdown before submitting the form
      const regionAbbr = await signupPage.getRegionValue();

      await signupPage.submit();

      const accountsResponse = await accountsResponsePromise;
      const responseBody = await accountsResponse.json();

      // TODO: Validate more of the response body
      expect(accountsResponse.status()).toBe(201);
      expect(responseBody).toMatchObject({
        account: {
          email: details.email,
          firstName: details.firstName,
          lastName: details.lastName,
          phone: details.phone,
          region: regionAbbr,
        },
        token: {
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
          tokenType: expect.any(String),
        },
      });

      // Check for the page after successful signup
      await expectAccountPageLinks(page);
    });

    // Could use an existing email instead of creating a new one, but this is a simple way to ensure the email is unique for the test
    test('Signup should return error for duplicate email', async ({
      browser,
      page,
      signupPage,
    }) => {
      const details = createSignupDetails(locale);
      await signupPage.fillForm(details);
      await signupPage.submit();

      // Check for the page after successful signup
      await expectAccountPageLinks(page);

      // Create a new browser context for fresh state
      const duplicatePage = await browser.newPage();
      const duplicateSignupPage = new SignupPage(duplicatePage, locale);
      await duplicateSignupPage.goto();
      await duplicateSignupPage.fillForm(details);

      const duplicateAccountsResponsePromise = duplicatePage.waitForResponse((response) => {
        const url = new URL(response.url());
        return url.pathname === '/api/accounts' && response.request().method() === 'POST';
      });

      await duplicateSignupPage.submit();

      const duplicateAccountsResponse = await duplicateAccountsResponsePromise;
      const responseBody = await duplicateAccountsResponse.json();

      expect(duplicateAccountsResponse.status()).toBe(400);
      expect(responseBody).toMatchObject({
        error: 'bad format',
        description: 'error creating account',
      });

      await expect(toastAlert(duplicatePage)).toBeVisible({ timeout: 10000 });
    });

    test('Signup should return error for placeholder email', async ({ page, signupPage }) => {
      const accountsResponsePromise = page.waitForResponse((response) => {
        const url = new URL(response.url());
        return url.pathname === '/api/accounts' && response.request().method() === 'POST';
      });

      const details = createSignupDetails(locale);
      details.email = 'test@example.com';

      await signupPage.fillForm(details);
      await signupPage.submit();

      const accountsResponse = await accountsResponsePromise;
      const responseBody = await accountsResponse.json();

      expect(accountsResponse.status()).toBe(422);
      expect(responseBody).toMatchObject({
        error: 'invalid parameters',
        parameters: ['placeholder email detected'],
      });

      await expect(toastAlert(page)).toBeVisible({ timeout: 10000 });
    });
  });
}
