import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/CartPage.js";
import { ProductPage } from "../pages/ProductPage.js";

test.describe("Cart Page Tests", () => {
  let cartPage: CartPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    productPage = new ProductPage(page);
    await cartPage.navigateToCartPage();
  });

  test("Empty Cart", async ({ page }) => {
    await expect(cartPage.welcomeMessage).toContainText("Cart is empty!");
  });

  test("Should navigate to empty cart", async ({ page }) => {
    await cartPage.navigateToCartPage;
    await expect(page.getByText("Cart is empty! Click here to buy products."));
  });

  test("Shoud view item in cart page after add item", async ({ page }) => {
    await page.getByRole("link", { name: "here" }).click();
    await expect(page.url()).toContain(
      "https://automationexercise.com/products",
    );
    await expect(
      page.getByRole("heading", { name: "All Products" }),
    ).toBeVisible();
    await productPage.getSelectedItem("Blue Top");
    await expect(page.getByText("Added!")).toBeVisible();
    await expect(
      page.getByText("Your product has been added to cart."),
    ).toBeVisible();
    await page.getByRole("link", { name: "View Cart" }).click();
    await expect(await cartPage.findCartItems).toHaveCount(1);
    await expect(
      await cartPage.findCartItems.getByText("Blue Top"),
    ).toBeVisible();
  });

  test("after adding product to the cart click continue shopping button not navigate to cart page", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "here" }).click();
    await expect(page.url()).toContain(
      "https://automationexercise.com/products",
    );
    await expect(
      page.getByRole("heading", { name: "All Products" }),
    ).toBeVisible();
    await productPage.getSelectedItem("Blue Top");
    await expect(page.getByText("Added!")).toBeVisible();
    await expect(
      page.getByText("Your product has been added to cart."),
    ).toBeVisible();
    await page.getByRole("button", { name: "Continue Shopping" }).click();
    await expect(page.url()).toContain(
      "https://automationexercise.com/products",
    );
  });

  test("Cart item must be remove after clicking cancel button", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "here" }).click();
    await expect(page.url()).toContain(
      "https://automationexercise.com/products",
    );
    await expect(
      page.getByRole("heading", { name: "All Products" }),
    ).toBeVisible();
    await productPage.getSelectedItem("Blue Top");
    await expect(page.getByText("Added!")).toBeVisible();
    await expect(
      page.getByText("Your product has been added to cart."),
    ).toBeVisible();
    await page.getByRole("link", { name: "View Cart" }).click();
    expect(await cartPage.findCartItems).toHaveCount(1);
    expect(await cartPage.findCartItems.getByText("Blue Top")).toBeVisible();
    await page.locator("a.cart_quantity_delete").click();

    await expect(page.getByRole("link", { name: "Blue Top" })).toHaveCount(0);
  });

  test("Should not be navigate to checkout page without login", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "here" }).click();
    await expect(page.url()).toContain(
      "https://automationexercise.com/products",
    );
    await expect(
      page.getByRole("heading", { name: "All Products" }),
    ).toBeVisible();
    await productPage.getSelectedItem("Blue Top");
    await expect(page.getByText("Added!")).toBeVisible();
    await expect(
      page.getByText("Your product has been added to cart."),
    ).toBeVisible();
    await page.getByRole("link", { name: "View Cart" }).click();
    expect(await cartPage.findCartItems).toHaveCount(1);
    expect(await cartPage.findCartItems.getByText("Blue Top")).toBeVisible();
    await page.getByText("Proceed To Checkout").click();
    await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
    await expect(
      page.getByText("Register / Login account to proceed on checkout."),
    ).toBeVisible();
    await page.getByRole("button", { name: "Continue On Cart" }).click();
    await expect(page.url()).toContain(
      "https://automationexercise.com/view_cart",
    );
  });

   test("Should not be navigate to checkout page without login and after clicking login link page navigate to login page", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "here" }).click();
    await expect(page.url()).toContain(
      "https://automationexercise.com/products",
    );
    await expect(
      page.getByRole("heading", { name: "All Products" }),
    ).toBeVisible();
    await productPage.getSelectedItem("Blue Top");
    await expect(page.getByText("Added!")).toBeVisible();
    await expect(
      page.getByText("Your product has been added to cart."),
    ).toBeVisible();
    await page.getByRole("link", { name: "View Cart" }).click();
    expect(await cartPage.findCartItems).toHaveCount(1);
    expect(await cartPage.findCartItems.getByText("Blue Top")).toBeVisible();
    await page.getByText("Proceed To Checkout").click();
    await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
    await expect(
      page.getByText("Register / Login account to proceed on checkout."),
    ).toBeVisible();
    await page.getByRole("link", { name: "Register / Login" }).click();
    await expect(page.url()).toContain(
      "https://automationexercise.com/login",
    );
  });
});
