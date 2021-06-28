@test
Feature: Testing Calendar

    Demonstrate Mobile Testing capabilities through automating a scenario for IOS Calendar

    Scenario Outline: Add a new calendar event
        Given I have launched the calendar
        When I calculate and remember the next <dayOfTheWeek> from my current day and <numberOfMonths> months from that date
        Then I select the date for creating a recurring event
        When I create a new event with the following data:
            | eventName   | startTime   | endTime   | frequency   |
            | <eventName> | <startTime> | <endTime> | <frequency> |
        Then A new event should be created successfully for:
            | numberOfMonths   | dayOfTheWeek   | eventName   | startTime   | endTime   | frequency   |
            | <numberOfMonths> | <dayOfTheWeek> | <eventName> | <startTime> | <endTime> | <frequency> |
        Examples:
            | numberOfMonths | dayOfTheWeek | eventName | startTime | endTime | frequency |
            | 3              | Friday       | Workshop  | 9:30 AM   | 1:30 PM | Weekly    |
            | 3              | Monday       | Stand up  | 9:30 AM   | 9:45 AM | Weekly    |