/**
 * Protractor based html tests.
 * BEST-HTML-REPORTER
 * (c) C1X Inc. 2017
 */

exports.config =
{
  specs: ['login.js'],
  framework: 'jasmine',
  type: "node",
  directConnect: true,
  multiCapabilities:
  [
    {'browserName': 'chrome',chromeOptions: {args: ['--no-sandbox']}, count: 1}
  ],
  onPrepare : function ()
  {
    browser.ignoreSynchronization = true;
    browser.resetUrl = 'file:///';
    browser.get('file:///home/nimmi/projects/best-html-reporter/test/best-html-reporter.html')
  }
};