/**
 * Jasmine test case's without browser.
 * BEST-HTML-REPORTER
 * (c) C1X Inc. 2017
 */

var bestReporter = require('../best-html-reporter');

describe('data', function() {

  jasmine.getEnv().addReporter(bestReporter.init({
    reportDir: '/tmp/reports',
    screenshots: "none"
  }));

  it('adding 2 numbers', function() {
    var a = 1, b = 2;
    expect(a + b).toBe(3);
  });

});