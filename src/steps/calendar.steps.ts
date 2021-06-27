import { Given, When, Before } from '@cucumber/cucumber';
import CalendarScreen from '../screens/calendar';
import { expect } from 'chai';
import EventsScreen from '../screens/events';
import { Actions } from '../support/actions';
import { Utils } from '../support/utils';
import { DAYOFTHEWEEK, MERIDIANTIME } from '../support/constants';
import CalendarDayView from '../screens/calendarDayView';

let calendarScreen: CalendarScreen;
let eventsScreen: EventsScreen;
let calendarDayView: CalendarDayView;
let actions: Actions;
let utils: Utils;
let dayForTheNextFriday: string;

Before(async function() {
    calendarScreen = new CalendarScreen();
    eventsScreen = new EventsScreen();
    actions = new Actions();
    utils = new Utils();
    calendarDayView = new CalendarDayView();
})

Given(/^I have launched the calendar$/, async function () {
    await actions.launchApp();
    await calendarScreen.waitForIsShown(true);
});

When(/^I calculate and remember the next friday from my current day$/, async function () {
    const date = new Date();
    dayForTheNextFriday = utils.calculateTheNextDateForTheGivenDayOfTheWeek(date, DAYOFTHEWEEK.Friday); 
    console.log(dayForTheNextFriday);
});

When(/^I open the events screen$/, async function () {
    const addEventButton = await calendarScreen.addButton;
    await addEventButton.click();
    
    const newEventLabel = await eventsScreen.newEventLabel;
    await eventsScreen.waitForIsShown();
    expect(await newEventLabel.isDisplayed(), 'Locator new event not displayed').to.equal(true);
});


When(/^I select the date for creating a recurring event$/, async function () {
    const selectedDateElement = await $(`~${dayForTheNextFriday}`);
    await selectedDateElement.click();
    await calendarDayView.waitForIsShown(true);
    expect(await selectedDateElement.getText()).to.equal(dayForTheNextFriday);

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