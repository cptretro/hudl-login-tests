import { test, expect } from "../src/fixtures";
import { env } from "../src/config/env";

test.describe("Login: positive scenarios", () => {
  test("valid credentials land on the home page @smoke", async ({
    loginPage,
    page,
  }) => {
    await loginPage.login(env.username, env.password);
    await expect(page).toHaveURL(/home/);
  });

  test("session persists after page reload", async ({ loginPage, page }) => {
    await loginPage.login(env.username, env.password);
    await expect(page).toHaveURL(/home/);

    await page.reload();

    await expect(page).toHaveURL(/home/);
    await expect(loginPage.emailInput).toBeHidden();
  });

  test("pressing Enter submits the login form", async ({ loginPage, page }) => {
    await loginPage.emailInput.fill(env.username);
    await loginPage.emailInput.press("Enter");

    await loginPage.passwordInput.fill(env.password);
    await loginPage.passwordInput.press("Enter");

    await expect(page).toHaveURL(/home/);
  });

  test("can login after wrong password", async ({ loginPage, page, }) => {
    await loginPage.enterEmail(env.username);

    await loginPage.passwordInput.fill("definitely-wrong-password");
    await loginPage.continueButton.click();
    await expect(loginPage.invalidPassword).toBeVisible();

    await loginPage.passwordInput.fill(env.password);
    await loginPage.continueButton.click();

    await expect(page).toHaveURL(/home/);
  });
});
