import { When, Before, DataTable, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { Utils } from '../support/utils';
import { DAYOFTHEWEEK, FREQUENCY, MERIDIANTIME } from '../support/constants';
import { ScenarioContext } from '../support/scenarioContext';
import { RepeatEvent } from '../screens/repeatEvent';
import { EndRepeatEvent } from '../screens/endRepeatEvent';
import { DatePicker } from '../screens/datePicker';
import { TestExampleTable, EventAssertionTable } from '../support/cucumberTables';
import DayView from '../screens/dayView';
import NewEvents from '../screens/newEvents';

let eventsScreen: NewEvents;
let dayView: DayView;
let repeatEvent: RepeatEvent;
let endRepeatEvent: EndRepeatEvent;
let datePicker: DatePicker;
let utils: Utils;
let scenarioContext: ScenarioContext;

Before(function () {
  eventsScreen = new NewEvents();
  utils = new Utils();
  dayView = new DayView();
  repeatEvent = new RepeatEvent();
  endRepeatEvent = new EndRepeatEvent();
  datePicker = new DatePicker();
  scenarioContext = ScenarioContext.getInstance();
});

When(/^I create a new event with the following data:$/, async function (data: DataTable) {
  const hashes = data.hashes();
  const myData = hashes as TestExampleTable[];
  const startTime = myData[0].startTime.split(' ');
  const endTime = myData[0].endTime.split(' ');
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
  await dayView.waitForIsShown(true);
});

Then(/^A new event should be created successfully for:$/, async function (data: DataTable) {
  const hashes = data.hashes();
  const myData = hashes as EventAssertionTable[];
  const label = `${myData[0].eventName}, from ${myData[0].startTime} to ${myData[0].endTime}`;
  const eventElement = await $(`-ios predicate string:label == "${label}"`);
  expect(await eventElement.isDisplayed()).to.equal(true);

  const startDate: Date = new Date(`${scenarioContext.startDateText} ${scenarioContext.nextFridayInfo.year}`);
  const endDate: Date = new Date(`${scenarioContext.endDateText} ${scenarioContext.endDateInfo.year}`);

  let allDatesToBeCheckedForTheEvent: string[] = utils.getDateForTheDayOfTheWeekBetweenTwoDates(startDate, endDate, DAYOFTHEWEEK[myData[0].dayOfTheWeek]);

  for (let j = 0; j < allDatesToBeCheckedForTheEvent.length; j++) {
    const dateLabelElement = await $(`~${allDatesToBeCheckedForTheEvent[j]}`);
    expect(await dateLabelElement.isDisplayed()).to.equal(true);
    expect(await eventElement.isDisplayed()).to.equal(true);
    await dayView.swipe({ x: 354, y: 132 }, { x: 39, y: 132 });
  }
});