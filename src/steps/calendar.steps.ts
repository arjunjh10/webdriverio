import { Given } from '@cucumber/cucumber';
import CalendarScreen from '../screens/calendar';
import { expect } from 'chai';
import EventsScreen from '../screens/events';

const calendarScreen = new CalendarScreen();
const eventsScreen = new EventsScreen();
Given(/^I have launched the calendar$/, async function () {
    await driver.launchApp();
    // await driver.dismissAlert();
    await driver.switchContext('NATIVE_APP');
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