import { expect, test } from '../../fixtures/test';
import { signupCopy } from '../../config/copy/index';
import { SUPPORTED_LOCALES } from '../../config/locales';

for (const locale of SUPPORTED_LOCALES) {
  test.describe(`locale: ${locale}`, () => {
    test.use({ locale });

    test.beforeEach(async ({ signupPage }) => {
      await signupPage.goto();
    });

    test('All sign up fields should be visible and have the correct labels', async ({
      signupPage,
    }) => {
      await expect(signupPage.selectors.fields.firstName).toBeVisible();
      await expect(signupPage.selectors.fields.firstName).toHaveAccessibleName(
        signupCopy[locale].fieldLabels.firstName,
      );
      await expect(signupPage.selectors.fields.lastName).toBeVisible();
      await expect(signupPage.selectors.fields.lastName).toHaveAccessibleName(
        signupCopy[locale].fieldLabels.lastName,
      );
      await expect(signupPage.selectors.fields.phoneCountry).toBeVisible();
      await expect(signupPage.selectors.fields.phoneCountry).toHaveAccessibleName(
        signupCopy[locale].fieldLabels.phoneCountry,
      );
      await expect(signupPage.selectors.fields.phone).toBeVisible();
      await expect(signupPage.selectors.fields.phone).toHaveAccessibleName(
        signupCopy[locale].fieldLabels.phone,
      );
      await expect(signupPage.selectors.fields.region).toBeVisible();
      await expect(signupPage.selectors.fields.region).toHaveAccessibleName(
        signupCopy[locale].fieldLabels.region,
      );
      await expect(signupPage.selectors.fields.email).toBeVisible();
      await expect(signupPage.selectors.fields.email).toHaveAccessibleName(
        signupCopy[locale].fieldLabels.email,
      );
      await expect(signupPage.selectors.fields.password).toBeVisible();
      await expect(signupPage.selectors.fields.password).toHaveAccessibleName(
        signupCopy[locale].fieldLabels.password,
      );
      await expect(signupPage.selectors.fields.confirmPassword).toBeVisible();
      await expect(signupPage.selectors.fields.confirmPassword).toHaveAccessibleName(
        signupCopy[locale].fieldLabels.confirmPassword,
      );
      await expect(signupPage.selectors.fields.consentCheckbox).toBeVisible();
      await expect(signupPage.selectors.fields.consentCheckbox).toHaveAccessibleName(
        signupCopy[locale].fieldLabels.consentCheckbox,
      );
    });

    test('Region select dropdown has correct options', async ({ signupPage }) => {
      const options = await signupPage.selectors.fields.region.locator('option').allTextContents();

      // Check that the options contain all the expected region options for the current locale
      expect(options).toEqual(expect.arrayContaining(signupCopy[locale].regionOptions));
    });

    // Should check any country that is important to the business, but for now just check Canada and United States are present
    test('Phone Country select should have Canada and United States', async ({ signupPage }) => {
      const options = await signupPage.selectors.fields.phoneCountry
        .locator('option')
        .allTextContents();

      expect(options).toEqual(expect.arrayContaining(['Canada', 'United States']));
    });

    // This is due to Anti Spam laws
    test('Contact consent checkbox should be unselected by default', async ({ signupPage }) => {
      await expect(signupPage.selectors.fields.consentCheckbox).not.toBeChecked();
    });
  });
}
