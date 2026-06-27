import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import testData from "../data/users.json" with { type: "json" };

test.describe("Login Page Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    
  });

  test('Should show all login fields after navigate to login page', async ({page})=>{
    await expect(loginPage.loginTitle).toBeVisible()
    await expect(loginPage.emailInputField).toBeVisible()
    await expect(loginPage.passwordInputField).toBeVisible()
    await expect(loginPage.loginButton).toBeVisible()
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
    await loginPage.emailInputField.fill(testData.validUser.email);
    await loginPage.emailInputField.press("Tab");
    await expect(loginPage.passwordInputField).toBeFocused();
    await loginPage.passwordInputField.fill(testData.validUser.password);
    await loginPage.loginButton.click();
  });

  test("Should not logged without all required credentials", async ({
    page,
  }) => {
    await loginPage.fillLoginPage(" ", testData.validUser.password);
    expect(await loginPage.getValidationMessage("email")).toContain(
      "Please fill out this field",
    );
  });

  test('Should not logged in not providing both required credentials', async ({page})=>{
    await loginPage.fillLoginPage(' ', ' ')
     expect(await loginPage.getValidationMessage("email")).toContain(
      "Please fill out this field",
    );
  })
});
