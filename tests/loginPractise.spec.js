const { expect, test } = require("@playwright/test");
const { POManager } = require("../pageobjects/POManager");

test("Practice login navigates to ProtoCommerce", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPractisePage = poManager.getLoginPractisePage();

  await loginPractisePage.goTo();
  await loginPractisePage.validLogin(
    "rahulshettyacademy",
    "Learning@830$3mK2",
  );

  await expect(page).toHaveTitle("ProtoCommerce");
});
