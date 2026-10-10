const playwright = require("@playwright/test");
const { POManager } = require("../../pageobjects/POManager");
const {
  Before,
  After,
  Beforestep,
  AfterStep,
  Status,
  BeforeStep,
} = require("@cucumber/cucumber");

Before(async function () {
  const browser = await playwright.chromium.launch({
    channel: "chrome",
    headless: false,
  });
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.poManager = new POManager(this.page);
});

BeforeStep(function () {
  // Your hook code
});

AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: "screenshot1.png" });
  }
});

After(async function () {
  console.log("Closing the browser");
});
