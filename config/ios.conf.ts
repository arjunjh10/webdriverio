import { join } from "path";
import { config } from "./wdio.conf";

config.capabilities = [
    {
        // The defaults you need to have in your config
        platformName: 'iOS',
        maxInstances: 1,
        // For W3C the appium capabilities need to have an extension prefix
        // This is `appium:` for all Appium Capabilities which can be found here
        // http://appium.io/docs/en/writing-running-appium/caps/
        'appium:deviceName': 'iPhone 12',
        'appium:platformVersion': '14.5',
        'appium:orientation': 'PORTRAIT',
        'appium:automationName': 'XCUITest',
        // The path to the app
        'appium:app': join(process.cwd(), './apps/iOS-Simulator-NativeDemoApp-0.4.0.app.zip'),
        // Read the reset strategies very well, they differ per platform, see
        // http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
        'appium:noReset': true,
        'appium:newCommandTimeout': 240,
    },
];

config.services = (config.services ? config.services : []).concat([
    [
        'appium',
        {
            // This will use the globally installed version of Appium
            command: 'appium',
            args: {
                // This is needed to tell Appium that we can execute local ADB commands
                // and to automatically download the latest version of ChromeDriver
                relaxedSecurity: true,
            },
        },

    ],
]);

export default config;
