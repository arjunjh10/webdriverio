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
                return this.never;
            case FREQUENCY.Daily:
                return this.everyDay;
            case FREQUENCY.Weekly:
                return this.everyWeek;
            case FREQUENCY.BiWeekly:
                return this.everyTwoWeeks;
            case FREQUENCY.Monthly:
                return this.everyMonth;
            case FREQUENCY.Yearly:
                return this.everyYear;
        }

    }
}