import AppScreen from './appScreen';
export default class CalendarScreen extends AppScreen{
    constructor() {
        super('-ios predicate string:type == "XCUIElementTypeNavigationBar"');
    }

    get addButton(): Promise<WebdriverIO.Element> {
        return $('-ios predicate string:label == "Add"');
    }

    get newEventLabel(): Promise<WebdriverIO.Element> {
        return $('-ios predicate string:label="New Event"');
    }

    get eventTitleTextField(): Promise<WebdriverIO.Element> {
        return $('~Title');
    }

}