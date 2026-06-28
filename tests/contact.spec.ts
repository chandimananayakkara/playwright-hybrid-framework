import { test, expect } from "@playwright/test";
import { ContactPage } from "../pages/ContactPage.js";
import testData from "../data/users.json" with { type: "json" };

test.describe("Contact page tests", () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.navigateToContactPage();
  });

  test("Should create complete form with all details", async ({ page }) => {
    await contactPage.fillContactPage({
      name: testData.contactForm.name,
      email: testData.contactForm.email,
      subject: testData.contactForm.subject,
      message: testData.contactForm.message,
      file: testData.contactForm.file,
    });

    const submit = page.locator(".btn.btn-primary.pull-left.submit_form");

    await expect(submit).toBeVisible();
    await expect(submit).toBeEnabled();

    await submit.click();
  });
});
