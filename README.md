# Hudl Login Test

End-to-end tests for the Hudl login flow, built with Playwright and TypeScript.

## Tech Stack

- [Playwright](https://playwright.dev/) for browser automation and assertions
- TypeScript
- ESLint (with `typescript-eslint` and `eslint-plugin-playwright`) for linting
- Prettier for formatting
- Husky and lint-staged for pre-commit checks
- dotenv for environment configuration
- GitHub Actions for CI

## Prerequisites

- Node.js v26.13.1
- npm 11.20.0
- A Hudl test account (a dedicated account without 2FA is recommended)

## Setup

```bash
git clone https://github.com/cptretro/hudl-login-tests.git
cd hudl-login-tests
npm ci
npx playwright install --with-deps
cp .env.example .env
```

Open `.env` and fill in the values:

```
HUDL_USERNAME="your-test-account-email"
HUDL_PASSWORD="your-test-account-password"
BASE_URL=https://www.hudl.com
```

## Running Tests

```bash
# All tests
npm test

# Headed mode (watch the browser)
npm run test:headed

# Smoke tests only (tests tagged @smoke)
npm run test:smoke

# One file
npx playwright test tests/login/login.positive.spec.ts

# One browser
npx playwright test --project=chromium

# Interactive UI mode
npx playwright test --ui

# Open the last HTML report
npx playwright show-report
```

## Known Limitations

- **Account creation** is out of scope. Tests verify the Create Account link only.
- **Third-party sign-in** is verified up to the hand-off. The provider pages are not automated.
- **Real credentials are required** for the successful login tests. Logins from CI servers may be challenged by bot detection, which can cause failures unrelated to the code.

## Lint, Format and Type Check

```bash
# Lint
npm run lint

# Lint and auto-fix
npm run lint:fix

# Format
npm run format

# Type check
npm run typecheck
```
