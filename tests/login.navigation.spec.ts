import { test, expect } from "../src/fixtures";
import { env } from "../src/config/env";

test.describe("Login: navigation", () => {
  test("create account link leads to the sign-up flow", async ({
    loginPage,
    page,
  }) => {
    await loginPage.createAccount.click();

    await expect(page).toHaveURL(/signup/i);

    await expect(
      page.getByRole("heading", { name: "When's Your Birthday?" }),
    ).toBeVisible();
  });

  test("Continue with Google starts Google sign-in", async ({
    loginPage,
    page,
  }) => {
    await page.route(/accounts\.google\.com/, (route) => route.abort());
    const googleRequest = page.waitForRequest(/accounts\.google\.com/);

    await loginPage.googleLogin.click();

    await googleRequest;
  });

  test("Continue with Facebook starts Facebook sign-in", async ({
    loginPage,
    page,
  }) => {
    await page.route(/facebook\.com/, (route) => route.abort());
    const facebookRequest = page.waitForRequest(/facebook\.com/);

    await loginPage.facebookLogin.click();

    await facebookRequest;
  });

  test("Continue with Apple starts Apple sign-in", async ({
    loginPage,
    page,
  }) => {
    await page.route(/appleid\.apple\.com/, (route) => route.abort());
    const appleRequest = page.waitForRequest(/appleid\.apple\.com/);

    await loginPage.appleLogin.click();

    await appleRequest;
  });
});

test.describe("Login: password step", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.enterEmail(env.username);
  });

  test("Edit button returns to the email step", async ({ loginPage }) => {
    await loginPage.editEmail.click();
    await expect(loginPage.passwordInput).toBeHidden();
  });

  test("eye icon shows and hides the password", async ({ loginPage }) => {
    await loginPage.passwordInput.fill("not-a-real-password");
    await expect(loginPage.passwordInput).toHaveAttribute("type", "password");

    await loginPage.passwordEye.click();
    await expect(loginPage.passwordInput).toHaveAttribute("type", "text");

    await loginPage.passwordEye.click();
    await expect(loginPage.passwordInput).toHaveAttribute("type", "password");
  });

  test("Forgot Password link opens the reset page", async ({
    loginPage,
    page,
  }) => {
    await loginPage.forgotPassword.click();
    await expect(page).toHaveURL(/reset-password/i);
  });
});
