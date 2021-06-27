import AppScreen from './appScreen';
export default class EventsScreen extends AppScreen{
    constructor() {
        super('-ios predicate string:type == "XCUIElementTypeNavigationBar" AND name="New Event"');
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

    get newEventLabel(): Promise<WebdriverIO.Element> {
        return $('-ios predicate string:label="New Event"');
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

    addNewCalendarEventForTheDate(date: Date) {
        const ddValueFromTheDate = date.getDate();
        const month = date.getMonth();
    }

}