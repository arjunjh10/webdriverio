import AppScreen from './appScreen';
export class RepeatEvent extends AppScreen {
    constructor() {
        super('-ios predicate string:name == "Repeat" AND type == "XCUIElementTypeNavigationBar"');
    }

    get never(): Promise<WebdriverIO.Element> {
        return $('ios predicate string: label == "Never"');
    }

    get everyDay(): Promise<WebdriverIO.Element> {
        return $('ios predicate string: label == "Every Day"');
    }

    get everyWeek(): Promise<WebdriverIO.Element> {
        return $('ios predicate string: label == "Every Week"');
    }

    get everyTwoWeeks(): Promise<WebdriverIO.Element> {
        return $('ios predicate string: label == "Every 2 Weeks"');
    }

    get everyMonth(): Promise<WebdriverIO.Element> {
        return $('ios predicate string: label == "Every Month"');
    }

    get everyYear(): Promise<WebdriverIO.Element> {
        return $('ios predicate string: label == "Every Year"');
    }
}