import { expect, test } from '../../fixtures/test';
import { SUPPORTED_LOCALES } from '../../config/locales';
import { signupCopy } from '../../config/copy';
import { SignupPage } from '../../pages/signup.page';

test.skip(({ isMobile }) => !isMobile, 'These tests require a mobile device profile');

for (const locale of SUPPORTED_LOCALES) {
  test.describe(`Mobile Only: ${locale}`, () => {
    test.use({ locale });

    test.beforeEach(async ({ signupPage }) => {
      await signupPage.goto();
    });

    test('Menu should open and close mobile navigation', async ({ signupPage }) => {
      await signupPage.selectors.mobile.menuOpenButton.tap();

      await expect(signupPage.selectors.mobile.menu).toBeVisible();
      await expect(signupPage.selectors.mobile.menuCloseButton).toBeVisible();

      await signupPage.selectors.mobile.menuCloseButton.tap();
      await expect(signupPage.selectors.mobile.menu).not.toBeVisible();
    });

    test('Login button in the menu should navigate to the login page', async ({
      signupPage,
      loginPage,
    }) => {
      await signupPage.selectors.mobile.menuOpenButton.tap();
      await signupPage.selectors.mobile.loginButton.tap();

      await expect(loginPage.selectors.email).toBeVisible();
      await expect(loginPage.selectors.submitButton).toBeVisible();
    });

    test('Language button in the menu should switch the signup page to the other locale', async ({
      page,
      signupPage,
    }) => {
      const otherLocale = locale === 'en' ? 'fr' : 'en';
      const otherLanguage = locale === 'en' ? 'French' : 'Anglais';

      await signupPage.selectors.mobile.menuOpenButton.tap();
      await signupPage.selectors.mobile.languageMenuButton.tap();
      await page.getByRole('menuitemradio', { name: otherLanguage }).tap();

      const switchedPage = new SignupPage(page, otherLocale);
      await expect(switchedPage.selectors.heading).toHaveText(signupCopy[otherLocale].heading);
      await expect(switchedPage.selectors.heading).not.toHaveText(signupCopy[locale].heading);
    });
  });
}
