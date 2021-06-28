import { Given, When, Before, World, DataTable, Then } from '@cucumber/cucumber';
import CalendarScreen from '../screens/calendar';
import { expect, util } from 'chai';
import EventsScreen from '../screens/events';
import { Actions } from '../support/actions';
import { Utils, DateInfoSimulator } from '../support/utils';
import { DAYOFTHEWEEK, FREQUENCY, MERIDIANTIME } from '../support/constants';
import CalendarDayView from '../screens/calendarDayView';
import { ScenarioContext } from '../support/scenarioContext';
import { RepeatEvent } from '../screens/repeatEvent';
import { EndRepeatEvent } from '../screens/endRepeatEvent';
import { DatePicker } from '../screens/datePicker';
import { TestExampleTable, EventAssertionTable } from '../support/cucumberTables';
import AppScreen from '../screens/appScreen';

let calendarScreen: CalendarScreen;
let eventsScreen: EventsScreen;
let calendarDayView: CalendarDayView;
let repeatEvent: RepeatEvent;
let endRepeatEvent: EndRepeatEvent;
let datePicker: DatePicker;
let actions: Actions;
let utils: Utils;
let scenarioContext: ScenarioContext;


Before(async function(this: World) {
    calendarScreen = new CalendarScreen();
    eventsScreen = new EventsScreen();
    actions = new Actions();
    utils = new Utils();
    calendarDayView = new CalendarDayView();
    repeatEvent = new RepeatEvent();
    endRepeatEvent = new EndRepeatEvent();
    datePicker = new DatePicker();
    scenarioContext = new ScenarioContext(this);
})

Given(/^I have launched the calendar$/, async function () {
    await actions.launchApp();
    await calendarScreen.waitForIsShown(true);
});

When(/^I calculate and remember the next (.*) from my current day and (\d+) months from that date$/, async function (dayOfTheWeek: string, numberOfMonths: string) {
    const date = new Date();
    const dateOfTheNextFriday = utils.calculateTheNextDateForTheGivenDayOfTheWeek(date, DAYOFTHEWEEK[dayOfTheWeek]);
    const endDate = utils.calculateTheDateXNumberOfMonthsFromTheGivenDate(dateOfTheNextFriday, +numberOfMonths);
    
    const simulatorDateInfoForTheNextFriday = utils.getSimulatorCalendarDateString(dateOfTheNextFriday);
    const simulatorEndDateInfo = utils.getSimulatorCalendarDateString(endDate);
    scenarioContext.nextFridayInfo = simulatorDateInfoForTheNextFriday;
    scenarioContext.endDateInfo = simulatorEndDateInfo;

    const startDateInfo: DateInfoSimulator = scenarioContext.nextFridayInfo;
    const endDateInfo: DateInfoSimulator = scenarioContext.endDateInfo;
    scenarioContext.startDateText = utils.getCalendarDateString(startDateInfo);
    scenarioContext.endDateText = utils.getCalendarDateString(endDateInfo);
});

When(/^I select the date for creating a recurring event$/, async function () {
    const nextFridayInfo = scenarioContext.nextFridayInfo as DateInfoSimulator;
    const dateText = utils.getCalendarDateString(nextFridayInfo);
    const selectedDateElement = await $(`~${dateText}`);
    await selectedDateElement.click();
    await calendarDayView.waitForIsShown(true);
    expect(await selectedDateElement.getText()).to.equal(dateText);

    const addEventButtonOnTheCalendarDayView = await calendarDayView.addButton;
    await addEventButtonOnTheCalendarDayView.click();
    await eventsScreen.waitForIsShown(true);
});

When(/^I create a new event with the following data:$/, async function (data: DataTable) {
   const hashes = data.hashes();
   const myData = hashes as TestExampleTable[];
   const startTime = myData[0].startTime.split(" ");
   const endTime = myData[0].endTime.split(" ");
   const frequency = myData[0].frequency;
   const eventTitleTextField = await eventsScreen.eventTitleTextField;
   await eventTitleTextField.click();
   await eventTitleTextField.setValue(myData[0].eventName);

   const startDatePicker = await datePicker.startDatePickerField;
   const endDatePicker = await datePicker.endsDatePickerField;
   expect(await startDatePicker.isDisplayed()).to.equal(true);
   expect(await endDatePicker.isDisplayed()).to.equal(true);

   await datePicker.selectTime(startDatePicker,startTime[0], MERIDIANTIME[startTime[1]]);
   await datePicker.selectTime(endDatePicker , endTime[0], MERIDIANTIME[endTime[1]]);


   const repeatEventButton = await eventsScreen.repeatEvent;
   await repeatEventButton.click();
   await repeatEvent.waitForIsShown(true);

   const repeatFrquencyElement = await repeatEvent.getRepeatFrequencyElement(FREQUENCY[frequency]);
   await repeatFrquencyElement.click();
   await eventsScreen.waitForIsShown(true);
   const weeklyStatusElementOnEvent = await $(`~${frequency}`);
   expect(await weeklyStatusElementOnEvent.isDisplayed()).to.equal(true);

   const endDate: Date = new Date(`${scenarioContext.endDateText} ${scenarioContext.endDateInfo.year}`);
   const endRepeatEventButton = await datePicker.endRepeatEvent;
   await endRepeatEventButton.click();
   await endRepeatEvent.waitForIsShown(true);
   
   await endRepeatEvent.endRepeatEventOnDate(endDate);
   const addEventButton = await eventsScreen.addButton;
   await addEventButton.click();
   await calendarDayView.waitForIsShown(true);
});

Then(/^A new event should be created successfully for:$/, async function (data: DataTable) {
    const hashes = data.hashes();
    const myData = hashes as TestExampleTable[];
    const label = `${myData[0].eventName}, from ${myData[0].startTime} to ${myData[0].endTime}`;
    const eventElement = await $(`-ios predicate string:label == "${label}"`);
    expect(await eventElement.isDisplayed()).to.equal(true);

    await calendarDayView.navigateBack();

    const startDate: Date = new Date(`${scenarioContext.startDateText} ${scenarioContext.nextFridayInfo.year}`);
    const endDate: Date = new Date(`${scenarioContext.endDateText} ${scenarioContext.endDateInfo.year}`);

    let allFriDayDatesToBeCheckedForTheEvent = [];
    for(let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
        if(i.getDay() == DAYOFTHEWEEK.Friday) {
            const values = utils.getSimulatorCalendarDateString(i);
            allFriDayDatesToBeCheckedForTheEvent.push(utils.getCalendarDateString(values));
        }
    }

 });