/**
 * Protractor based html tests.
 * BEST-HTML-REPORTER
 * (c) C1X Inc. 2017
 */

var bestReporter = require('../best-html-reporter');

exports.config =
{
  specs: ['login.js'],
  framework: 'jasmine',
  type: "node",
  directConnect: true,
  multiCapabilities: [
    {'browserName': 'chrome',chromeOptions: {args: ['--no-sandbox']}, count: 1}
  ],
  
  onPrepare : function() {
    browser.ignoreSynchronization = true;
    browser.resetUrl = 'file:///';
    browser.get('file://' + __dirname + '/test.html');
    
    jasmine.getEnv().addReporter(bestReporter.init({
      reportDir: '/tmp/reports',
      screenshots: "fail"
    }));
  }
};