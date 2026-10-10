const { test, expect, request } = require("@playwright/test");
const { APiUtils } = require("../utils/APiUtils");

const loginPayload = {
  userEmail: "piramilango0726@gmail.com",
  userPassword: "Rahul@0726#",
};
const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }],
};
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test(" @API Browser context validating login", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");
  const email = "piramilango0726@gmail.com";

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); ++i) {
    //i=0, 0<7 - T
    const rowOrderId = await rows.nth(i).locator("th").textContent(); //rowOrderId= nth(0) = 6a997715e7cd69710fbc68d6
    if (response.orderID.includes(rowOrderId)) {
      //6a997715e7cd69710fbc68d6.includes(6a997715e7cd69710fbc68d6) - T
      await rows.nth(i).locator("button").first().click(); //nth(0).
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(response.orderID.includes(orderIdDetails)).toBeTruthy();

  console.log("Order ID from API: " + response.orderID);
});

//verify of the order is showing in history page\
// Precondition: Create Order
