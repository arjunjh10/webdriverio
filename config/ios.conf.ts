import { config as wdioConfig } from './wdio.conf';
import type { messages } from '@cucumber/messages';
import type { Frameworks } from '@wdio/types';
const { addAttachment } = require('@wdio/allure-reporter').default;

wdioConfig.capabilities = [
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
    'appium:app': 'com.apple.mobilecal',
    // Read the reset strategies very well, they differ per platform, see
    // http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
    'appium:noReset': true,
    'appium:newCommandTimeout': 240,
  },
];

wdioConfig.services = (wdioConfig.services ? wdioConfig.services : []).concat([
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

wdioConfig.afterStep = async function (step: messages.Pickle.IPickleStep, scenario: messages.IPickle, result: Frameworks.PickleResult) {
  const date = new Date();
  await driver.takeScreenshot();
};

wdioConfig.afterScenario = async function() {
  await driver.closeApp();
}

export const config = wdioConfig;
