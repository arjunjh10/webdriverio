import AppScreen from './application';
import { MERIDIANTIME } from '../support/constants';
export default class NewEvents extends AppScreen {
  constructor() {
    super('-ios predicate string:type == "XCUIElementTypeNavigationBar" AND name="New Event"');
  }

  get eventTitleTextField(): Promise<WebdriverIO.Element> {
    return $('~Title');
  }


  get newEventLabel(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string:label="New Event"');
  }

  get addButton(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string:label == "Add"');
  }

  get repeatEvent(): Promise<WebdriverIO.Element> {
    return $('-ios predicate string:label == "Repeat"');
  }


}