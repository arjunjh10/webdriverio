import { Given, When, Before } from '@cucumber/cucumber';
import CalendarScreen from '../screens/calendar';
import { expect } from 'chai';
import { Actions } from '../support/actions';
import { Utils, DateInfoSimulator } from '../support/utils';
import { DAYOFTHEWEEK } from '../support/constants';
import { ScenarioContext } from '../support/scenarioContext';
import { RepeatEvent } from '../screens/repeatEvent';
import { EndRepeatEvent } from '../screens/endRepeatEvent';
import { DatePicker } from '../screens/datePicker';
import DayView from '../screens/dayView';
import NewEvents from '../screens/newEvents';

let calendarScreen: CalendarScreen;
let eventsScreen: NewEvents;
let dayView: DayView;
let repeatEvent: RepeatEvent;
let endRepeatEvent: EndRepeatEvent;
let datePicker: DatePicker;
let actions: Actions;
let utils: Utils;
let scenarioContext: ScenarioContext;

Before(function () {
  calendarScreen = new CalendarScreen();
  eventsScreen = new NewEvents();
  actions = new Actions();
  utils = new Utils();
  dayView = new DayView();
  repeatEvent = new RepeatEvent();
  endRepeatEvent = new EndRepeatEvent();
  datePicker = new DatePicker();
  scenarioContext = ScenarioContext.getInstance();
});

Given(/^I have launched the calendar$/, async function () {
  await actions.launchApp();
  await calendarScreen.waitForIsShown(true);
});

When(/^I calculate and remember the next (.*) from my current day and (\d+) months from that date$/, function (dayOfTheWeek: string, numberOfMonths: string) {
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
  await dayView.waitForIsShown(true);
  expect(await selectedDateElement.getText()).to.equal(dateText);

  const addEventButtonOnTheCalendarDayView = await dayView.addButton;
  await addEventButtonOnTheCalendarDayView.click();
  await eventsScreen.waitForIsShown(true);
});