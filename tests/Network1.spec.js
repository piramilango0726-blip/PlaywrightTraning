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
const fakepayload = { data: [], message: "No Orders" };

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test("Browser context validating login", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");
  //funtion(a,b)
  page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a928d5221054ba465fb77df",
    (route) => {
      //intercepting the request and modifying the response
      const response = page.request.fetch(route.request());
      let body = JSON.stringify(fakepayload);
      route.fulfill({
        response,
        body,
      });
    },
  );

  const email = "piramilango0726@gmail.com";

  await page.locator("button[routerlink*='myorders']").click();
  await page.pause();
  // console.log(await page.locator*('.mt-4').textContent());
});

//verify of the order is showing in history page\
// Precondition: Create Order
