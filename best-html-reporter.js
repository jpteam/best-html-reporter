/**
 * Best ever HTML reporter for Jasmine & Protractor
 * (c) 2017, C1X Inc.
 * @author Raj, Nimmi
 */

exports.init = function(config) {
  
  return {
    jasmineStarted: function(suiteInfo) {
      console.log('Running best html reporter..');
      console.log('Config: ', config);
    },
    
    suiteStarted: function(result) {
      //console.log(result);
    },
    
    specStarted: function(result) {
      //console.log(result);
    },
    
    specDone: function(result) {
      //console.log(result);
    },
    
    suiteDone: function(result) {
      //console.log(result);
    },
    
    jasmineDone: function() {
    
    }
  }
};