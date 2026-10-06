# Nesto Signup Playwright Tests

Playwright and TypeScript test automation for the Nesto signup flow in the QA environment at `https://app.qa.nesto.ca`.

## Prerequisites

- Node.js (an active LTS release is recommended)
- npm

## Setup

Install the project dependencies and the Playwright browsers:

```bash
npm ci
npx playwright install
```

On Linux CI environments, install the browser system dependencies as well:

```bash
npx playwright install --with-deps
```

## Running the tests

Run all configured browser projects:

```bash
npm test
```

Run a specific group of browser projects:

```bash
npm run test:mobile
npm run test:chrome-safari
```

Other useful commands:

```bash
npm run test:list       # List discovered tests without running them
npm run test:headed     # Run with a visible browser
npm run test:ui         # Open the Playwright UI runner
npm run format          # Format files in place
npm run format:check    # Check formatting
```

The test suite targets the shared QA environment; no local application server is required. Signup tests create accounts using unique throwaway `yopmail.com` email addresses. Avoid using personal email addresses.

## Test coverage

- Signup UI: fields, accessible names, region options, phone-country options, and default consent state
- Form validation: required fields, invalid names and email, password rules, and mismatched passwords
- Signup API: successful account creation, duplicate email, and placeholder email responses
- Navigation: login links, locale switching, and terms/privacy links
- Mobile navigation: menu interactions, login navigation, and locale switching
- English and French coverage

The tests use page objects in `pages/`, shared fixtures in `fixtures/`, locale-specific content in `config/copy/`, and specs in `tests/signup/`.

## Reports

Playwright writes the HTML report to `playwright-report/` and test artifacts to `test-results/`. To open the most recent report:

```bash
npx playwright show-report
```

## Assumptions

- Tests run against Nesto’s shared QA environment, and other users signup tests may create accounts there.
- Disposable emails, such as yopmail.com are allowed. Signup tests use unique disposable emails addresses rather than personal email addresses.
- Placeholder emails such as example.com should be rejected. The current API status codes and response bodies are treated as behavior to verify, though their inconsistency is also noted in the bug report.
- A successful signup returns HTTP 201, includes the submitted account details in the response, and leaves the user on an account page.
- Assumes that the email database is regularly cleared. The duplicate email test creates an account, then retries using the same email to verify the duplicate account response.
- English and French are the supported languages for this suite, implemention would need to change if other languages are added
- Canada and the United States phone numbers are potential expected phone-country options.
- The contact-consent checkbox should be unchecked by default, due to anti-spam requirements.

## Potential Improvements

- Add accessibility tests
- Create a reusable test harness to handle the locale instead of the current repeated setup
- Improve the platform specific test selection. Currently Mobile Only tests are skipped by Desktop devices, causing the final result to display an set of skipped tests without explanation
- More thorough validation of API request and form limits
