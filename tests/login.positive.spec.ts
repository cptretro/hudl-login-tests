import { test, expect } from "../src/fixtures";
import { env } from "../src/config/env";

test.describe("Login: positive scenarios", () => {
  test("valid credentials land on the home page @smoke", async ({
    loginPage,
    page,
  }) => {
    await loginPage.login(env.username, env.password);
    await expect(page).toHaveURL(/home/);
    await expect(loginPage.emailInput).toBeHidden();
    await expect(page.getByTestId("global-navbar")).toBeVisible();
  });

  test("session persists after page reload", async ({ loginPage, page }) => {
    await loginPage.login(env.username, env.password);
    await expect(page).toHaveURL(/home/);
    await expect(page.getByTestId("global-navbar")).toBeVisible();

    await page.reload();

    await expect(page).toHaveURL(/home/);
    await expect(page.getByTestId("global-navbar")).toBeVisible();
    await expect(loginPage.emailInput).toBeHidden();
  });

  test("pressing Enter submits the login form", async ({ loginPage, page }) => {
    await loginPage.emailInput.fill(env.username);
    await loginPage.emailInput.press("Enter");
    await expect(loginPage.passwordInput).toBeVisible();

    await loginPage.passwordInput.fill(env.password);
    await loginPage.passwordInput.press("Enter");

    await expect(page).toHaveURL(/home/);
    await expect(page.getByTestId("global-navbar")).toBeVisible();
  });

  test("user can log in after entering a wrong password", async ({
    loginPage,
    page,
  }) => {
    await loginPage.enterEmail(env.username);

    await loginPage.passwordInput.fill("definitely-wrong-password");
    await loginPage.continueButton.click();
    await expect(loginPage.invalidPassword).toBeVisible();
    await expect(loginPage.invalidPassword).toContainText(
      "Your email or password is incorrect. Try again.",
    );
    await expect(page).not.toHaveURL(/home/);

    await loginPage.passwordInput.fill(env.password);
    await loginPage.continueButton.click();

    await expect(page).toHaveURL(/home/);
    await expect(page.getByTestId("global-navbar")).toBeVisible();
  });
});
