/**
 * Best ever HTML reporter for Jasmine & Protractor
 * (c) 2017, C1X Inc.
 * @author Raj, Nimmi
 */

exports.init = function(config) {
  
  var results = {},
    currentSuite;
  
  return {
    jasmineStarted: function(suiteInfo) {
      results.config = config;
      results.suiteInfo = suiteInfo;
      results.suites = [];
    },
    
    suiteStarted: function(result) {
      currentSuite = result;
      currentSuite.specs = [];
      results.suites.push(currentSuite);
    },
    
    specStarted: function(result) {
    },
    
    specDone: function(result) {
      currentSuite.specs.push(result);
    },
    
    suiteDone: function(result) {
      currentSuite = null;
    },
    
    jasmineDone: function() {
      console.log(JSON.stringify(results, null, 4));
    }
  }
};