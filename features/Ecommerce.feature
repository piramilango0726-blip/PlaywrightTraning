Feature: Ecommerce validations
    @Regression
    Scenario: Placing the order
        Given a login into Ecommerce application with "piramilango0726@gmail.com" and "Rahul@0726#"
        When Add "ZARA COAT 3" to cart
        Then Verify "ZARA COAT 3" is displayed in the cart
        When Enter valid details and place the order
        Then Verify order in present in the OrderHistory

    Scenario Outline: Placing the order
        Given a login into Ecommerce2 application with "piramilango0726@gmail.com" and "Rahul@0726"
        Then Verify Error message is displayed

