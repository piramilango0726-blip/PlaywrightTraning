
import {test as baseTest} from "@playwright/test";
interface testDataForOrder{
  username: string;
  password: string;
  productName: string;  
}



export const customtest = baseTest.extend<{
  testDataForOrder: testDataForOrder;
}>({
  testDataForOrder: {
    username: "piramilango0726@gmail.com",
    password: "Rahul@0726#",
    productName: "ZARA COAT 3",
  },
});