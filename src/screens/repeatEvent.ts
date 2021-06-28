import { FREQUENCY } from '../support/constants';
import AppScreen from './appScreen';
export class RepeatEvent extends AppScreen {
  constructor() {
    super('-ios predicate string:name == "Repeat" AND type == "XCUIElementTypeNavigationBar"');
  }

  get never(): Promise<WebdriverIO.Element> {
    return $('ios predicate string: label == "Never"');
  }

  get everyDay(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string: label == "Every Day"');
  }

  get everyWeek(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string: label == "Every Week"');
  }

  get everyTwoWeeks(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string: label == "Every 2 Weeks"');
  }

  get everyMonth(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string: label == "Every Month"');
  }

  get everyYear(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string: label == "Every Year"');
  }

  async getRepeatFrequencyElement(frequency: FREQUENCY): Promise<WebdriverIO.Element> {
    switch (frequency) {
      case FREQUENCY.Never:
        return await this.never;
      case FREQUENCY.Daily:
        return await this.everyDay;
      case FREQUENCY.Weekly:
        return await this.everyWeek;
      case FREQUENCY.BiWeekly:
        return await this.everyTwoWeeks;
      case FREQUENCY.Monthly:
        return await this.everyMonth;
      case FREQUENCY.Yearly:
        return await this.everyYear;
    }
  }
}