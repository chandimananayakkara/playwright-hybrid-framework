import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import testData from "../data/users.json" with { type: "json" };
import type { UserLogin } from "../models/UserLogin.js";

test.describe("Login Page Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test('Should show all login fields after navigate to login page', async ({page})=>{
    await expect(page.getByRole('heading', {name:'Login to your account'})).toBeVisible()
    await expect(page.getByTestId('login-email')).toBeVisible()
    await expect(page.getByTestId('login-password')).toBeVisible()
    await expect(page.getByTestId('login-button')).toBeVisible()
  })

  test("Should login with valid credentials", async ({ page }) => {
    await loginPage.fillLoginPage(
      testData.validUser.email,
      testData.validUser.password,
    );
    await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Delete Account" }),
    ).toBeVisible();
    await expect(page.getByText(/Logged in as/)).toBeVisible();
  });

  test("Should move to next element after pressing tab key", async ({
    page,
  }) => {
    let emailInput = page.getByTestId("login-email");
    let passwordInput = page.getByTestId("login-password");
    let loginBtn = page.getByTestId("login-button");
    await emailInput.fill(testData.validUser.email);
    await emailInput.press("Tab");
    await expect(passwordInput.isEnabled());
    await passwordInput.fill(testData.validUser.password);
    await expect(loginBtn.isEnabled());
    await loginBtn.click();
  });

  test("Should not logged without all required credentials", async ({
    page,
  }) => {
    await loginPage.fillLoginPage(" ", testData.validUser.password);
    expect(await loginPage.getValidationMessasge("email")).toContain(
      "Please fill out this field",
    );
  });

  test('Should not logged in not providing both required credentials', async ({page})=>{
    await loginPage.fillLoginPage(' ', ' ')
     expect(await loginPage.getValidationMessasge("email")).toContain(
      "Please fill out this field",
    );
  })
});
