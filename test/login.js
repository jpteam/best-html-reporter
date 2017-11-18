describe('Login', function(){
    it('1. click and check the button navigation', function() {
      element(By.css('#start input')).click().then(function() {
        expect(browser.getCurrentURL().toMatch('http://www.protractortest.org/?#/'));
      });
    });
  });