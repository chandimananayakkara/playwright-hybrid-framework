import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage.js";

test.describe("Homepage Page Tests", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
  });

  test("Successfully navigated to the homepage", async ({ page }) => {
    await expect(page.url()).toContain("https://automationexercise.com/");
    await expect(
      page.getByAltText("Website for automation practice"),
    ).toBeVisible();
  });

  test("Successfully clicking navbar items", async ({ page }) => {
    let navLinks = [
      "products",
      "view_cart",
      "login",
      "test_cases",
      "api_list",
      "contact_us",
    ];

    for (let i of navLinks) {
      if (i === "products") {
        await homePage.productNavigation.click();
      } else if (i === "view_cart") {
        await homePage.cartNavigation.click();
      } else if (i === "login") {
        await homePage.signUpNavigation.click();
      } else if (i === "test_cases") {
        await homePage.testCasesNavigation.click();
      } else if (i === "api_list") {
        await homePage.apiTestingNavigation.click();
      } else {
        await homePage.contactNavigation.click();
      }

      await expect(page.url()).toContain(`https://automationexercise.com/${i}`);
    }

    await homePage.videoTutorialsNavigation.click();
    await expect(page.url()).toContain(
      "https://www.youtube.com/c/AutomationExercise",
    );
    await page.goBack();
  });

  test("Hero Carousel working properly", async ({ page }) => {
    const before = await page
      .locator(".carousel-inner .item.active img")
      .first()
      .getAttribute("src");

    await expect(async () => {
      const after = await page
        .locator(".carousel-inner .item.active img")
        .first()
        .getAttribute("src");

      expect(after).not.toBe(before);
    }).toPass({
      timeout: 6000,
    });
  });

  test("Hero section image carousel working properly when clicking arrow button", async ({
    page,
  }) => {
    let leftArrow = page.locator('a[data-slide="prev"]').first();
    const current = page
      .locator(".carousel-inner .item.active img")
      .first()
      .getAttribute("src");
    await leftArrow.click();
    const before = await page
      .locator(".carousel-inner .item.active img")
      .first()
      .getAttribute("src");

    await expect(current).not.toBe(before);
  });

 
});
