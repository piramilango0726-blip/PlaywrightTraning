const { test, expect } = require("@playwright/test");

test("Network test", async ({ page }) => {
  // Login and reach Orders page
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("#userEmail").fill("piramilango0726@gmail.com");
  await page.locator("#userPassword").fill("Rahul@0726#");
  await page.locator("input[value='Login']").click();
  await page.waitForLoadState("networkidle");

  await page.locator(".card-body b").first().waitFor();
  await page.locator("button[routerlink*='myorders']").click();

  //api response --> reponse --> browser --> UI
  //intercepting the request and modifying the response

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6aa93c0752cfef03ed0b93d7",
      }),
  );
  await page.locator("button:has-text('View')").first().click();
  await page.pause();
  await expect(page.locator("p").last()).toHaveText(
    "You are not authorize to view this order",
  );
});
