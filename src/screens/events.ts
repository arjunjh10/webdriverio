import AppScreen from './appScreen';
import { MERIDIANTIME } from '../support/constants';
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

    get repeatEvent(): Promise<WebdriverIO.Element> {
        return $('ios predicate string:label == "Repeat"');
    }

    async selectTime(timeValue: string, meridianValue: MERIDIANTIME) {
        const PMElement = await this.PM;
        const AMElement = await this.AM;
        const timePickerElement = await this.eventTimePicker;
        const timeTextField = await timePickerElement.$('-ios predicate string:type == "XCUIElementTypeTextField" AND name="Time"');
        await timeTextField.click();
        await timeTextField.setValue(timeValue);

        switch (meridianValue) {
            case MERIDIANTIME.AM:
                await AMElement.click();
                break;

            case MERIDIANTIME.PM:
                await PMElement.click();
                break;
        }
        const invalidTimeElement = await this.invalidTimeElement;
        await invalidTimeElement.isDisplayed()  && meridianValue == 0 ? await PMElement.click() : await AMElement.click();
    }

}