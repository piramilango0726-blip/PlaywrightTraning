const { test, expect } = require("@playwright/test");

let webcontext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client/");

  await page.locator("#userEmail").fill("piramilango0726@gmail.com");
  await page.locator("#userPassword").fill("Rahul@0726#");
  await page.locator("input[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });

  //Injecting the storage state into the browser context
  webcontext = await browser.newContext({ storageState: "state.json" });
});

test("Browser context validating login", async () => {
  const productName = "Zara Coat 3";
  const email = "piramilango0726@gmail.com";
  const page = await webcontext.newPage();
  await page.goto("https://rahulshettyacademy.com/client/");

  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  const products = page.locator(".card-body");
  const count = await products.count();
  console.log(count);

  for (let i = 0; i < count; ++i) {
    //T 3<3 - F
    const name = await products.nth(i).locator("b").textContent(); //nth(1) - Zara Coat 3
    if (name && name.trim().toUpperCase() === productName.toUpperCase()) {
      // Zara Coat 3 && Zara Coat 3 = Zara Coat 3 == Zara Coat 3 - T
      await products.nth(i).locator("text=Add to Cart").click(); // Zara Coat 3
      await page.waitForLoadState("networkidle");
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  await page.waitForLoadState("networkidle");
  await expect(
    page.getByRole("heading", { name: "ZARA COAT 3" }),
  ).toBeVisible();

  const bool = await page
    .getByRole("heading", { name: "ZARA COAT 3" })
    .isVisible();

  expect(bool).toBeTruthy();

  await page.locator("text=Checkout").click();

  await page
    .locator("[placeholder*=Country]")
    .pressSequentially("ind", { delay: 150 });
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionscount = await dropdown.locator("button").count();
  for (let i = 0; i < optionscount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  await expect(page.locator(".user__name label")).toHaveText(email);

  await page.locator(".action__submit").click();

  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. ",
  );
  const orderID = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderID);

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); ++i) {
    //i=0, 0<7 - T
    const rowOrderId = await rows.nth(i).locator("th").textContent(); //rowOrderId= nth(0) = 6a997715e7cd69710fbc68d6
    if (orderID.includes(rowOrderId)) {
      //6a997715e7cd69710fbc68d6.includes(6a997715e7cd69710fbc68d6) - T
      await rows.nth(i).locator("button").first().click(); //nth(0).
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderID.includes(orderIdDetails)).toBeTruthy();
});

test("testcase2", async () => {
  const page = await webcontext.newPage();
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator(".card-body b").first().waitFor();

  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});
