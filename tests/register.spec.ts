import { test, expect } from "@playwright/test";
import { SignUpPage } from "../pages/SignUpPage.js";
import newUser from "../data/users.json" with { type: "json" };

test.describe("Register Page Tests", () => {
  let registerPage: SignUpPage;
  let dynamicEmail: string;

  test.beforeEach(async ({ page }) => {
    registerPage = new SignUpPage(page);
    dynamicEmail = `testEmail${Date.now()}@mail.com`;
    newUser.newUser.email = dynamicEmail;
    await registerPage.navigateToRegisterPage();
  });

  test("Should properly appear sign up page", async ({ page }) => {
    await expect(registerPage.signUpPageTitle).toBeVisible();
  });

  test("Should properly appear sign up form after clicking sign up button", async ({
    page,
  }) => {
    await registerPage.fillSignUpPage(
      newUser.newUser.name,
      newUser.newUser.email,
    );
    await expect(registerPage.signUpFormTitle).toBeVisible();
  });

  test("Should be register with valid credentials", async ({ page }) => {
    await registerPage.fillSignUpPage(
      newUser.newUser.name,
      newUser.newUser.email,
    );
    await expect(registerPage.signUpFormTitle).toBeVisible();

    await registerPage.fillUserForm(newUser.newUser);

    await expect(
      page.getByRole("heading", { name: "Account Created!" }),
    ).toBeVisible();
    await expect(page.getByText(/Congratulations!/)).toBeVisible();
    await page.getByTestId("continue-button").click();
    await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Delete Account" }),
    ).toBeVisible();
  });

  test("Should not navigate without required credentials of sign up page", async ({
    page,
  }) => {
    await registerPage.fillSignUpPage(newUser.newUser.name, " ");

    expect(await registerPage.getValidationMessage()).toContain(
      "Please fill out this field",
    );
  });

  test("Should not be navigate to signUpUserForm", async ({ page }) => {
    await registerPage.fillSignUpPage(
      newUser.newUser.name,
      newUser.validUser.email,
    );
    await expect(page.getByText("Email Address already exist!")).toBeVisible();
  });
});
