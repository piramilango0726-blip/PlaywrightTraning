const test = require("@playwright/test");
const { expect } = require("@playwright/test");
const { url } = require("node:inspector");

// test('First Playwright test', function()
// {
//     // Playwright code
//     // Step 1 Open browser
//     // Step 2 Enter username and password  2 seconds
//     // Step 3 Click on login button

// });

test("Browser context Playwright test", async ({ browser }) => {
  const context = await browser.newContext(); //Explain Proxy, plugins, Browser details will be updated in config file
  const page = await context.newPage();

  page.route("**/*.css", (route) => route.abort()); //block the css files to load
  page.route("**/*.{png,jpg,jpeg}", (route) => route.abort()); //block the image files to load

  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");

  page.on("request", (request) => console.log(request.url()));
  page.on("response", (response) =>
    console.log(response.url(), response.status()),
  );

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  // await page.locator('#username').type('rahulshetty');

  // await page.locator('#signInBtn').click();

  //    //await till the element is visible
  //    console.log(await page.locator("[style*='block']").textContent());
  //    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
  // // await expect(page.locator("[style*='block']")).toContainText('Incorrectt');

  //type - fill

  await userName.fill("rahulshettyacademy");
  await page.locator("[type='password']").type("Learning@830$3mK2");
  await signIn.click();

  console.log(await page.locator(".card-body a").first().textContent());
  console.log(await page.locator(".card-body a").nth(2).textContent());

  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles); //instead of using for loop we can use allTextContents() to get all the text contents in an array
});

test("UI Controls Playwright test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const documentLink = page.locator("[href*='documents-request']");

  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");

  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();

  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();

  await page.locator("#terms").uncheck();
  await expect(await page.locator("#terms").isChecked()).toBeFalsy();

  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test("Child window Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  // const userName = page.locator('#username');
  const documentLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);

  const text = await newPage.locator(".red").textContent();
  console.log(text);

  const arrayText = text.split("@");
  //arrayText[0]= Please email us at mentor
  //aarrayText[1]=rahulshettyacademy.com with below template to receive response
  const domain = arrayText[1].split(" ")[0];

  //rahulshettyacademy.com
  // with
  // below
  // template
  // to
  // receive
  // response
  console.log(domain);

  await page.locator("#username").fill(domain);

  console.log(await page.locator("#username").inputValue()); //textcontent work when it is attached to DOM
  await page.bringToFront();

  // await page.pause();

  //adding assertion to verify the title of the page
  // demo of pusing to git
});

// Login into  this application and grab its locators and create a test case to verify the title of the page.

// Navigate to https://rahulshettyacademy.com/loginpagePractise/");
// enter username as "rahulshettyacademy" and password as "Learning@830$3mK2",
// click on the sign-in button, and
// then verify that the title of the page is "ProtoCommerce".
