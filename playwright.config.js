// @ts-check
const { trace } = require("console");
const fs = require("fs");

function getSystemBrowserChannel() {
  const candidates = [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate.includes("msedge") ? "msedge" : "chrome";
    }
  }

  return undefined;
}

const systemBrowserChannel = getSystemBrowserChannel();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",

  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: [
    // ["html", { outputFolder: "playwright-report" }],
    ["allure-playwright"],
  ],
  use: {
    browserName: "chromium",
    headless: false,
    channel: systemBrowserChannel || "chrome", // or 'msedge'
    // actionTimeout: 10 * 1000,
    // navigationTimeout: 30 * 1000,
    screenshot: "on",
    trace: "on",
  },
};

module.exports = config;
