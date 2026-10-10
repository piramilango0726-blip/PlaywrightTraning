import { test as baseTest } from "@playwright/test";
export const customtest = baseTest.extend({
    testDataForOrder: {
        username: "piramilango0726@gmail.com",
        password: "Rahul@0726#",
        productName: "ZARA COAT 3",
    },
});
