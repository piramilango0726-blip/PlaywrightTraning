const { expect } = require("@playwright/test");

const { customtest } = require("../utils/fixtures");

customtest(
  "test fixture demo",
  async ({ authenticatedPage, createOrder, testDataForOrder }) => {
    await authenticatedPage.goto("https://rahulshettyacademy.com/client/");

    await authenticatedPage.locator("button[routerlink*='myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(
      authenticatedPage.getByText(createOrder.orderID),
    ).toBeVisible();
    console.log(testDataForOrder.productName);
  },
);
