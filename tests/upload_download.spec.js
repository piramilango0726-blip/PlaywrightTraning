const ExcelJS = require("exceljs");
const { test, expect } = require("@playwright/test");

async function writeExcelTest(searchText, replacetext, change, filepath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filepath);
  const worksheet = workbook.getWorksheet("Sheet1");
  const output = await readExcel(worksheet, searchText);

  const cell = worksheet.getCell(output.row, output.column + change.colchange);
  cell.value = replacetext;
  await workbook.xlsx.writeFile(filepath);
}

async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });
  return output;
}

test("Upload download excel validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/upload-download-test/");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  await downloadPromise;
  writeExcelTest(
    "Mango",
    "350",
    { rowchange: 0, colchange: 2 },
    "C:\\Users\\User\\Downloads\\download.xlsx",
  );
  await page.locator("#fileinput").click();
  await page
    .locator("#fileinput")
    .setInputFiles("C:\\Users\\User\\Downloads\\download.xlsx");
});

// test("Upload download excel validation", async ({ page }) => {
// const textSearch = "Mango";
// const updateValue = 350;
// await page.goto("https://rahulshettyacademy.com/upload-download-test/");
// const downloadPromise = page.waitForEvent("download");
// await page.getByRole("button", { name: "Download" }).click();
// await downloadPromise;
// await writeExcelTest(
//   textSearch,
//   updateValue,
//   {
//     rowchange: 0,
//     colchange: 2,
//   },
//   "C:\\Users\\User\\Downloads\\download.xlsx",
// );
// await page.locator("#fileinput").click();
// await page
//   .locator("#fileinput")
//   .setInputFiles("C:\\Users\\User\\Downloads\\download.xlsx");
// const textlocator = page.getByText(textSearch);
// const desiredRow = await page.getByRole("row").filter({ has: textlocator });
// await expect(desiredRow.locator("#cell-4-undefined")).toContainText(
//   String(updateValue),
// );
// });
