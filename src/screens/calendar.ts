import AppScreen from './application';
export default class CalendarScreen extends AppScreen {
  constructor() {
    super('~MonthViewContainerView');
  }

  get addButton(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string:label == "Add"');
  }

  get eventTitleTextField(): Promise<WebdriverIO.Element> {
    return $('~Title');
  }

}