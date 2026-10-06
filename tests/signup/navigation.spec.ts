import { expect, test } from '../../fixtures/test';
import { SUPPORTED_LOCALES, type AppLocale } from '../../config/locales';
import { signupCopy } from '../../config/copy/index';
import { SignupPage } from '../../pages/signup.page';

const expectedLinks: Record<
  AppLocale,
  {
    login: string;
    language: string;
    terms: string;
    privacy: string;
  }
> = {
  en: {
    login: '/',
    language: '/fr/signup',
    terms: 'https://www.nesto.ca/terms-of-services/',
    privacy: 'https://www.nesto.ca/privacy-policy/',
  },
  fr: {
    login: '/fr',
    language: '/signup',
    terms: 'https://www.nesto.ca/fr/conditions-d-utilisation/',
    privacy: 'https://www.nesto.ca/fr/politique-de-confidentialite/',
  },
} as const;

for (const locale of SUPPORTED_LOCALES) {
  test.describe(`locale: ${locale}`, () => {
    test.use({ locale });
    test.beforeEach(async ({ signupPage }) => {
      await signupPage.goto();
    });

    test.describe('Desktop Header Controls', () => {
      test.skip(({ isMobile }) => isMobile, 'These header controls are not available on mobile');

      test('Login button should navigate to Login Page', async ({ signupPage, loginPage }) => {
        await signupPage.selectors.loginHeaderButton.click();

        await expect(loginPage.selectors.email).toBeVisible();
        await expect(loginPage.selectors.submitButton).toBeVisible();
      });

      // Implementation would need to change if locales are added
      test('Language link toggles the signup page to the other locale', async ({
        page,
        signupPage,
        locale,
      }) => {
        await signupPage.goto();

        const otherLocale = locale === 'en' ? 'fr' : 'en';
        const currentHeading = signupCopy[locale].heading;
        const otherHeading = signupCopy[otherLocale].heading;

        await expect(signupPage.selectors.heading).toHaveText(currentHeading);

        await signupPage.selectors.languageToggleButton.click();

        const switchedPage = new SignupPage(page, otherLocale);
        await expect(switchedPage.selectors.heading).toHaveText(otherHeading);
        await expect(switchedPage.selectors.heading).not.toHaveText(currentHeading);
      });
    });

    test('Login link should navigate to Login Page', async ({ signupPage, loginPage }) => {
      await signupPage.selectors.loginLink.click();

      await expect(loginPage.selectors.email).toBeVisible();
      await expect(loginPage.selectors.submitButton).toBeVisible();
    });

    test('Terms of Service link should open the correct external page', async ({
      page,
      signupPage,
    }) => {
      await signupPage.selectors.termsLink.click();

      const popup = await page.waitForEvent('popup');
      await popup.waitForLoadState('domcontentloaded');
      await expect(popup).toHaveURL(expectedLinks[locale].terms);
      await popup.close();
    });

    test('Privacy Policy link should open the correct external page', async ({
      page,
      signupPage,
    }) => {
      await signupPage.selectors.privacyLink.click();

      const popup = await page.waitForEvent('popup');
      await popup.waitForLoadState('domcontentloaded');
      await expect(popup).toHaveURL(expectedLinks[locale].privacy);
      await popup.close();
    });
  });
}
