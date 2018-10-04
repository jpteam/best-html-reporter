/**
 * Test case for Login page.
 * BEST-HTML-REPORTER
 * (c) C1X Inc. 2017
 */

describe('TEST', function(){

  it('1. Check the page header', function() {
    expect(element(By.css('h1')).getText()).toMatch('BEST HTML REPORTER');
  });

  it('2. Check the Logo is displayed', function() {
    expect(element(By.id('image')).isPresent()).toBe(false);
  });

  it('3. Click on the start button', function() {
    element(By.id('start')).all(By.tagName('a')).get(0).click().then(function() {
      expect(browser.getCurrentUrl()).toMatch('http://wdxww.psrotractortest.org/#/');
    });
  });

  it('4. Click on the Quit button', function() {
    browser.navigate().back().then(function() {
      element(By.id('start')).all(By.tagName('a')).get(1).click().then(function() {
        expect(browser.getCurrentUrl()).toMatch('sfvbjdfv');
        expect(browser.getCurrentUrl()).toMatch('sdjvhskv');
      });
    });
  });

});

describe('Extra valid suite', function() {

  it('browser refresh', function() {
    browser.refresh()
    expect(browser.getCurrentUrl()).toContain('https://www.google.co.in/');
  });

});