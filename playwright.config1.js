// @ts-check
const { devices } = require("@playwright/test");
const { trace } = require("console");
const fs = require("fs");
const { permission } = require("process");

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
  retries: 1,
  // workers: 3,

  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: "html",

  projects: [
    {
      name: "Edge",
      use: {
        browserName: "chromium",
        channel: "msedge",
        headless: false,
        screenshot: "on",
        trace: "on",
      },
    },

    {
      name: "Chrome",
      use: {
        browserName: "chromium",
        headless: false,
        channel: systemBrowserChannel || "chrome", // or 'msedge'
        // actionTimeout: 10 * 1000,
        // navigationTimeout: 30 * 1000,
        screenshot: "on",
        video: "on",
        trace: "on",
        visualViewport: { width: 720, height: 720 },
        // viewport: { width: 720, height: 720 },
        // ...devices["iPhone 11"],
        ignoreHttpsErrors: true,
        permission: ["geolocation"],
      },
    },
  ],
};

module.exports = config;
