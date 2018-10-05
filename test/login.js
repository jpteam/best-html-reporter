/**
 * Test case for Login page.
 * BEST-HTML-REPORTER
 * (c) C1X Inc. 2017
 */

describe('TEST', () => {

  var header = ['BEST HTML REPORTER', 'BEST HTML REPORTERS'],
    successUrl = ['http://www.protractortest.org/#/', 'http://wdxww.psrotractortest.org/#/'],
    quitUrl = ['https://www.google.co.in/', 'https://www.google.com.in/'],
    landingUrl = ['best-html-reporter/test', 'best-html-reporter/test data']

  var spec = function() {
    it('Check the page header', () => {
      expect(element(By.css('h1')).getText()).toMatch(header[Math.round(Math.random())]);
    });

    it('Check the Logo is displayed', () => {
      expect(element(By.id('image')).isPresent()).toBe(Math.round(Math.random()) == 0);
    });

    it('Click on the start button', () => {
      element(By.id('start')).all(By.tagName('a')).get(0).click().then(() => {
        expect(browser.getCurrentUrl()).toMatch(successUrl[Math.round(Math.random())]);
      });
    });

    it('Click on the Quit button', () => {
      browser.navigate().back().then(() => {
        element(By.id('start')).all(By.tagName('a')).get(1).click().then(() => {
          expect(browser.getCurrentUrl()).toMatch(quitUrl[Math.round(Math.random())]);
        });
      });
    });

    it('Browser refresh', () => {
      browser.refresh()
      expect(browser.getCurrentUrl()).toContain(quitUrl[Math.round(Math.random())]);
    });

    it('Go back to landing page', () => {
      browser.navigate().back();
      expect(browser.getCurrentUrl()).toContain(landingUrl[Math.round(Math.random())]);
    });
  }

  let testRun = 0;
  while (testRun < 10) {
    spec(); testRun++;
  }
});