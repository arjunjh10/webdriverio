import { Given, When, Before } from '@cucumber/cucumber';
import CalendarScreen from '../screens/calendar';
import { expect } from 'chai';
import EventsScreen from '../screens/events';
import { Actions } from '../support/actions';
import { Utils } from '../support/utils';
import { DAYOFTHEWEEK } from '../support/constants';

let calendarScreen: CalendarScreen;
let eventsScreen: EventsScreen;
let actions: Actions;
let utils: Utils;
let dayForTheNextFriday:Date;

Before(async function() {
    calendarScreen = new CalendarScreen();
    eventsScreen = new EventsScreen();
    actions = new Actions();
    utils = new Utils();
})

Given(/^I have launched the calendar$/, async function () {
    await actions.launchApp();
    await calendarScreen.waitForIsShown(true);
    const addButton = await calendarScreen.addButton;
    await addButton.click();
    
    const newEventLabel = await calendarScreen.newEventLabel;
    expect(await newEventLabel.isDisplayed(), 'Locator new event not displayed').to.equal(true);
    const eventTitleTextField = await eventsScreen.eventTitleTextField;
    await eventTitleTextField.click();
    await eventTitleTextField.setValue('Workshop');

    const startDatePicker = await eventsScreen.startDatePickerField;

    expect(await startDatePicker.isDisplayed()).to.equal(true);

    await startDatePicker.click();

    const timePickerElement = await eventsScreen.eventTimePicker;
    const timeTextField = await timePickerElement.$('-ios predicate string:type == "XCUIElementTypeTextField" AND name="Time"');
    await timeTextField.click();
    console.log(await timeTextField.getText());
    await timeTextField.setValue('10:00');
    await (await calendarScreen.addButton).click();
    
    // const timePicketElements = await timePickerElement.findElements(timePickerElement.elementId)
    // await driver.findElement()
});

When(/^I calculate and remember the next friday from my current day$/, async function () {
    const date = new Date();
    dayForTheNextFriday = utils.calculateTheNextDateForTheGivenDayOfTheWeek(date, DAYOFTHEWEEK.Friday);
  
});