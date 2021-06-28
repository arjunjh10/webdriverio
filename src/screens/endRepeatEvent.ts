import AppScreen from './application';
import { DatePicker } from './datePicker';
import { Utils } from '../support/utils';
let datePicker = new DatePicker();
let utils = new Utils();
export class EndRepeatEvent extends AppScreen {
  constructor() {
    super('-ios predicate string:name == "End Repeat" AND type == "XCUIElementTypeNavigationBar"');
  }

  get never(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string: label == "Never"');
  }

  get onDate(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string: label == "On Date"');
  }

  get newEventBackButton(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string: label == "New Event"');
  }

  async endRepeatEventOnDate(date: Date) {
    const dateObject = utils.getSimulatorCalendarDateString(date);
    const dateString = `${dateObject.dayOfTheWeek}, ${dateObject.month} ${dateObject.date}`;
    const onDateButton = await this.onDate;
    const newEventBackButton = await this.newEventBackButton;
    await onDateButton.click();
    await datePicker.waitForIsShown(true);

    await datePicker.traverseThroughMonthsToGetTheCurrentMonth(date);

    // Note: Hacky, couldn't figure out the right way to refresh the DOM as the calendar wont refresh with the right month values
    await (await this.never).click();
    await onDateButton.click();
    const dateToBeClicked = await $(`-ios predicate string:label == "${dateString}"`);
    await dateToBeClicked.click();
    await newEventBackButton.click();
  }
}