@test
Feature: Testing Calendar

    Demonstrate Mobile Testing capabilities through automating a scenario for IOS Calendar

    Scenario Outline: Open Calendar
        Given I have launched the calendar
        When I calculate and remember the next <dayOfTheWeek> from my current day and <numberOfMonths> months from that date
        Then I select the date for creating a recurring event
        When I create a new event for the selected day for 3 months
        Examples:
            | numberOfMonths | dayOfTheWeek |
            | 3              | Friday       |