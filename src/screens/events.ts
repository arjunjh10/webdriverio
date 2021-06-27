import AppScreen from './appScreen';
export default class EventsScreen extends AppScreen{
    constructor() {
        super('-ios predicate string:type == "XCUIElementTypeNavigationBar"');
    }

    get eventTitleTextField(): Promise<WebdriverIO.Element> {
        return $('~Title');
    }

    get startDatePickerField(): Promise<WebdriverIO.Element> {
        return $('-ios predicate string:type == "XCUIElementTypeCell" AND label BEGINSWITH[c] "Starts"');
    }

    get endsDatePickerField(): Promise<WebdriverIO.Element> {
        return $('-ios predicate string:type == "XCUIElementTypeCell" AND label BEGINSWITH[c] \'Ends\'');
    }

    get eventTimePicker(): Promise<WebdriverIO.Element> {
        return $('-ios predicate string:label == "Time Picker"');
    }

}