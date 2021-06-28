import AppScreen from './application';
export default class DayView extends AppScreen {
  constructor() {
    super('~DayViewContainerView');
  }

  get addButton(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string:label == "Add"');
  }

  dateOnTheScrollView(dateString: string): Promise<WebdriverIO.Element> {
    return $(`-ios predicate string:type == "XCUIElementTypeOther" AND label="${dateString}"`);
  }

  fullCurrentDateOnTheScrollView(dateWithYearString: string): Promise<WebdriverIO.Element> {
    return $(`-ios predicate string:type == "XCUIElementTypeStaticText" AND label="${dateWithYearString}"`);
  }


}