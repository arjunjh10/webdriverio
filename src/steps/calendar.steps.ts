import { Given, When, Before, World } from '@cucumber/cucumber';
import CalendarScreen from '../screens/calendar';
import { expect, util } from 'chai';
import EventsScreen from '../screens/events';
import { Actions } from '../support/actions';
import { Utils } from '../support/utils';
import { DAYOFTHEWEEK, MERIDIANTIME } from '../support/constants';
import CalendarDayView from '../screens/calendarDayView';
import { ScenarioContext } from '../support/scenarioContext';

let calendarScreen: CalendarScreen;
let eventsScreen: EventsScreen;
let calendarDayView: CalendarDayView;
let actions: Actions;
let utils: Utils;
let scenarioContext: ScenarioContext;


Before(async function(this: World) {
    calendarScreen = new CalendarScreen();
    eventsScreen = new EventsScreen();
    actions = new Actions();
    utils = new Utils();
    calendarDayView = new CalendarDayView();
    scenarioContext = new ScenarioContext(this);
})

Given(/^I have launched the calendar$/, async function () {
    await actions.launchApp();
    await calendarScreen.waitForIsShown(true);
});

When(/^I calculate and remember the next (.*) from my current day and (\d+) months from that date$/, async function (dayOfTheWeek: string, numberOfMonths: string) {
    const date = new Date();
    const dateOfTheNextFriday = utils.calculateTheNextDateForTheGivenDayOfTheWeek(date, DAYOFTHEWEEK[dayOfTheWeek]);
    
    scenarioContext.dayForTheNextFriday = utils.getSimulatorCalendarDateString(dateOfTheNextFriday); ;
    const endDate = utils.calculateTheDateXNumberOfMonthsFromTheGivenDate(dateOfTheNextFriday, +numberOfMonths);
    scenarioContext.dayForEndDate = utils.getSimulatorCalendarDateString(endDate);;
});

When(/^I open the events screen$/, async function () {
    const addEventButton = await calendarScreen.addButton;
    await addEventButton.click();
    
    const newEventLabel = await eventsScreen.newEventLabel;
    await eventsScreen.waitForIsShown();
    expect(await newEventLabel.isDisplayed(), 'Locator new event not displayed').to.equal(true);
});


When(/^I select the date for creating a recurring event$/, async function () {
    const selectedDateElement = await $(`~${scenarioContext.dayForTheNextFriday}`);
    await selectedDateElement.click();
    await calendarDayView.waitForIsShown(true);
    expect(await selectedDateElement.getText()).to.equal(scenarioContext.dayForTheNextFriday);

    const addEventButtonOnTheCalendarDayView = await calendarDayView.addButton;
    await addEventButtonOnTheCalendarDayView.click();
    await eventsScreen.waitForIsShown(true);
});

When(/^I create a new event for the selected day for 3 months$/, async function () {
    const eventTitleTextField = await eventsScreen.eventTitleTextField;
    await eventTitleTextField.click();
    await eventTitleTextField.setValue('Workshop');

    const startDatePicker = await eventsScreen.startDatePickerField;
    const endDatePicker = await eventsScreen.endsDatePickerField;

    expect(await startDatePicker.isDisplayed()).to.equal(true);
    expect(await endDatePicker.isDisplayed()).to.equal(true);

    await startDatePicker.click();

    await eventsScreen.selectTime('9:30', MERIDIANTIME.AM);

    // Close the start field
    await startDatePicker.click();

    await endDatePicker.click();
    await eventsScreen.selectTime('1:30', MERIDIANTIME.PM);

    await endDatePicker.click();
});