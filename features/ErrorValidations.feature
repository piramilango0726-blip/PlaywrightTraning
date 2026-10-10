Feature: Ecommerce2 validations
 @validations
 @foo

    Scenario Outline: Placing the order
      Given a login into Ecommerce2 application with "<username>" and "<password>"
       Then Verify Error message is displayed

      Examples:
      | username                        | password    |
      | piramilango0726@gmail.com       | Rahul@0726# |
      | hello@123.com                   | hello@123   |


