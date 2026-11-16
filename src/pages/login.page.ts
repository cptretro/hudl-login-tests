import { type Locator, type Page, expect } from "@playwright/test";
import { env } from "../config/env";

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly continueButton: Locator;
  readonly invalidEmail: Locator;
  readonly createAccount: Locator;
  readonly googleLogin: Locator;
  readonly facebookLogin: Locator;
  readonly appleLogin: Locator;
  readonly invalidPassword: Locator;
  readonly forgotPassword: Locator;
  readonly editEmail: Locator;
  readonly passwordEye: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByTestId("email-input-input");
    this.passwordInput = page.getByTestId("password-input-input");
    this.continueButton = page.getByRole("button", {
      name: "Continue",
      exact: true,
    });
    this.invalidEmail = page.getByTestId("email-input-help-text");
    this.createAccount = page.getByRole("link", { name: "Create Account" });
    this.googleLogin = page.getByRole("button", {
      name: "Continue with Google",
    });
    this.facebookLogin = page.getByRole("button", {
      name: "Continue with Facebook",
    });
    this.appleLogin = page.getByRole("button", { name: "Continue with Apple" });
    this.invalidPassword = page.getByTestId("password-input-help-text");
    this.forgotPassword = page.getByTestId("forgot-password");
    this.editEmail = page.getByTestId("edit-identifier");
    this.passwordEye = page.getByTestId("toggle-password-visibility");
  }

  async goto() {
    await this.page.goto(env.baseUrl + "/login");
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
    await this.continueButton.click();
    await expect(this.passwordInput).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.continueButton.click();
    await this.passwordInput.fill(password);
    await this.continueButton.click();
  }
}
