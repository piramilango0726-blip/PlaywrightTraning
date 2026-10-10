const base = require("@playwright/test");
const { APiUtils } = require("./APiUtils.js");
const { request } = require("@playwright/test");

const loginPayload = {
  userEmail: "piramilango0726@gmail.com",
  userPassword: "Rahul@0726#",
};
const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }],
};

exports.customtest = base.test.extend({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator("#userEmail").fill("piramilango0726@gmail.com");
    await page.locator("#userPassword").fill("Rahul@0726#");
    await page.locator("input[value='Login']").click();
    await page.waitForLoadState("networkidle");
    await use(page);
  },

  createOrder: async ({}, use) => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    const response = await apiUtils.createOrder(orderPayload);
    await use(response);
    //tear down - teardown cleans up resources created by the fixtures: This prevents leftover browser pages, cookies, sessions, network connections, and memory from affecting later tests.
    // await context.close();
    // await apiContext.dispose();
  },

  testDataForOrder: {
    productName: "ADIDAS ORIGINAL",
  },
});
