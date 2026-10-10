const { test: customBase } = require("@playwright/test");

const customtest = customBase.extend({
  testDataForOrder: {
    username: "piramilango0726@gmail.com",
    password: "Rahul@0726#",
    productName: "ZARA COAT 3",
  },
});

module.exports = { customtest };
