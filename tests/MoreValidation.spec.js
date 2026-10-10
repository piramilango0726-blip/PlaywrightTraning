const { test, expect } = require("@playwright/test");

test.describe.configure({ mode: "parallel" });
// test.describe.configure({ mode: "serial" }); - Fail if any depency test get fails
test("More Validation Playwright test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  // await page.goto('https://www.google.com');
  // await page.goBack();
  // await page.goForward();

  await expect(page.locator("#displayed-text")).toBeVisible();
  await expect(page.locator("#hide-textbox")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();

  await page.locator("#confirmbtn").click();

  // //whereever you want to handle the dialog, you can use the following code
  page.on("dialog", (dialog) => dialog.accept());
  page.on("dialog", (dialog) => dialog.dismiss());

  await page.locator("#mousehover").hover();

  const framesPage = page.frameLocator("#courses-iframe");
  framesPage.locator("li a[href*='lifetime-access']:visible").click();
  const text = await framesPage.locator(".text h2").textContent(); //Join 13,522 Happy Subscibers!
  console.log(text.split(" ")[1]);
  //Join 0
  // 13,522 1
  // Happy 2
  // Subscibers! 3
});

test("Screenshot Validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  await expect(page.locator("#displayed-text")).toBeVisible();

  await expect(page.locator("#hide-textbox")).toBeVisible();

  await page
    .locator("#displayed-text")
    .screenshot({ path: "Partialscreenshot.png" });

  await page.locator("#hide-textbox").click();

  await page.screenshot({ path: "screenshot.png" });

  await expect(page.locator("#displayed-text")).toBeHidden();
});

test("Visual testing", async ({ page }) => {
  await page.goto("https://www.flightaware.com/live/airport/CYTZ");

  expect(await page.screenshot()).toMatchSnapshot("landing.png");
});
