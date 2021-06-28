interface XY {
    x:number;
    y:number;
}
export default class AppScreen {
    private selector: string;

    constructor (selector: string) {
        this.selector = selector;
    }

    async waitForIsShown (isShown = true): Promise<boolean | void> {
        return (await $(this.selector)).waitForDisplayed({
            reverse: !isShown,
        });
    }

    async navigateBack(): Promise<void> {
        return await driver.back();
    }

    async swipe (from: XY, to: XY) {
        await driver.touchPerform([
            // Press the 'finger' on the first location
            {
                action: 'press',
                options: from,
            },
            // This will be the swipe time
            {
                action: 'wait',
                options: { ms: 1000 },
            },
            // Move the finger to the second position where we want to release it
            {
                action: 'moveTo',
                options: to,
            },
            // Release it
            {
                action: 'release',
            },
        ]);
        // Add a pause, just to make sure the swipe is done
        await driver.pause(1000);
    }
}