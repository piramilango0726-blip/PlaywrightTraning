import { test, expect } from "@playwright/test";

test("@web Playwright Special locators", async ({ page }) => {
  // test.setTimeout(60000); //This will set the timeout for this test case to 60 seconds. If the test case is not completed within 60 seconds then it will fail the test case.
  const slowExpect = expect.configure({ timeout: 10000 }); //This will wait for 10 seconds to check whether it is visible or not. If it is not visible then it will fail the test case.
  page.setDefaultTimeout(90000); //This will set the default timeout for all the actions in this test case to 90 seconds. If any action is not completed within 90 seconds then it will fail the test case.
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female"); //selectOption is applicable when it has select tag
  await page.getByPlaceholder("Password").fill("abc123");
  await page.getByRole("button", { name: "Submit" }).click();
  await slowExpect(
    page.getByText("Success! The Form has been submitted successfully!"),
  ).toBeVisible(); //this give whether it is visible or not - Boolean
  await page.getByRole("link", { name: "Shop" }).click({ timeout: 15000 }); //This will wait for 1 seconds to check whether it is visible or not. If it is not visible then it will fail the test case.

  //september 4th
  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button", { name: "Add" })
    .click();

  await slowExpect(
    page.getByText("Success! The Form has been submitted successfully!"),
  ).toBeVisible(); //This will fail when this text will not be visible. It will wait for 5 seconds to check whether it is visible or not. If it is not visible then it will fail the test case.
});
