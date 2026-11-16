import { test, expect } from "../src/fixtures";
import { env } from "../src/config/env";

test.describe("Login: negative scenarios", () => {
  test("invalid email format shows a validation message", async ({
    loginPage,
  }) => {
    await loginPage.emailInput.fill("not-an-email");
    await loginPage.continueButton.click();

    await expect(loginPage.invalidEmail).toBeVisible();
  });

  test("empty email shows a validation message", async ({ loginPage }) => {
    await loginPage.continueButton.click();

    await expect(loginPage.invalidEmail).toBeVisible();
  });

  test("incorrect password shows an error message", async ({
    loginPage,
    page,
  }) => {
    await loginPage.enterEmail(env.username);
    await loginPage.passwordInput.fill("definitely-wrong-password");
    await loginPage.continueButton.click();

    await expect(loginPage.invalidPassword).toBeVisible();
    await expect(page).not.toHaveURL(/home/);
  });

  test("empty password shows a validation message", async ({ loginPage }) => {
    await loginPage.enterEmail(env.username);
    await loginPage.continueButton.click();

    await expect(loginPage.invalidPassword).toBeVisible();
  });
});
