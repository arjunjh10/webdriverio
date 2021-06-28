/* eslint-disable @typescript-eslint/naming-convention */
import AppScreen from './appScreen';
import { DAYOFTHEWEEK, MERIDIANTIME, MONTH } from '../support/constants';
export class DatePicker extends AppScreen {
  constructor() {
    super('-ios predicate string:type == "XCUIElementTypeCell"');
  }

  get datePickerNextMonthArrow(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string:label == "Next Month"');
  }

  get datePickerPreviousMonthArrow(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string:label == "Previous Month"');
  }

  get datePickerShowYear(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string:label == "Show year picker"');
  }

  get startDatePickerField(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string:type == "XCUIElementTypeCell" AND label BEGINSWITH[c] "Starts"');
  }

  get endsDatePickerField(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string:type == "XCUIElementTypeCell" AND label BEGINSWITH[c] \'Ends\'');
  }
  get invalidTimeElement(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string:label CONTAINS "Invalid because the end date must be after the start date"');
  }

  get AM(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string:label == "AM"');
  }

  get PM(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string:label == "PM"');
  }


  get endRepeatEvent(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string:label == "End Repeat"');
  }

  get eventTimePicker(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string:label == "Time Picker"');
  }


  async selectTime(element: WebdriverIO.Element, timeValue: string, meridianValue: MERIDIANTIME) {
    // Open the timepicker
    await element.click();
    const pmElement = await this.PM;
    const amElement = await this.AM;
    const timePickerElement = await this.eventTimePicker;
    const timeTextField = await timePickerElement.$('-ios predicate string:type == "XCUIElementTypeTextField" AND name="Time"');
    await timeTextField.click();
    await timeTextField.setValue(timeValue);

    switch (meridianValue) {
      case MERIDIANTIME.AM:
        await amElement.click();
        break;

      case MERIDIANTIME.PM:
        await pmElement.click();
        break;
    }
    const invalidTimeElement = await this.invalidTimeElement;
    if (await invalidTimeElement.isDisplayed()) {
      meridianValue == 0 ? await pmElement.click() : await amElement.click();
    }
    // Close the picker once operation is done
    await element.click();
  }

  async traverseThroughMonthsToGetTheCurrentMonth(date: Date) {
    const dateMonth = date.getMonth();
    const showYearElementOnDatePicker = await this.datePickerShowYear;
    let textValueForTheYearElement = await showYearElementOnDatePicker.getText();
    let monthComponent = textValueForTheYearElement.split(' ')[0];
    const nextMonth = await this.datePickerNextMonthArrow;
    const previousMonth = await this.datePickerPreviousMonthArrow;
    while (dateMonth !== MONTH[monthComponent]) {
      // Check if current month of the picker is not the same as the desired month
      (dateMonth > MONTH[monthComponent]) ? await nextMonth.click() : await previousMonth.click();
      textValueForTheYearElement = await showYearElementOnDatePicker.getText();
      monthComponent = textValueForTheYearElement.split(' ')[0];
    }
  }
}