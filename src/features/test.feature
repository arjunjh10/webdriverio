@test
Feature: Testing Calendar

    Demonstrate Mobile Testing capabilities through automating a scenario for IOS Calendar

    Scenario: Open Calendar
    Given I have launched the calendar
    When I calculate and remember the next friday from my current day
    # When I open the events screen
    Then I select the date for creating a recurring event
    When I create a new event for the selected day for 3 months