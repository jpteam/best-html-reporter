/**
 * Best ever HTML reporter for Jasmine & Protractor
 * (c) 2017, C1X Inc.
 * @author Raj, Nimmi
 *
 * Configuration options:
 *   reportDir: Directory where the report has to be written (default is <current dir>/reports)
 *   screenshots: "all", "fail", "none" (default is none)
 *   screenshotCB: callback function for taking and storing the screenshots.
 */

var _ = require('underscore');

exports.init = function(config) {
  
  var results = {},
    currentSuite;
  
  config.screenshots = config.screenshots || 'none';
  
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
      
      if (config.screenshots !== 'none') {
        var screenshotFileName = config.reportDir + '/screens/' + result.id + '.png';
        if ((config.screenshots === 'fail' && result.failedExpectations.length > 0)
          || (config.screenshots !== 'fail')) {
          config.screenshotCB.call(this, screenshotFileName);
        }
      }

    },
    
    suiteDone: function(result) {
      currentSuite = null;
    },
    
    jasmineDone: function() {
      var fs = require('fs-extra'),
        json = JSON.stringify(results, null, 4);
  
      var tpl = fs.readFileSync(__dirname + '/templates/report-data.js','utf8');
      tpl = tpl.replace('{{results}}', json);
      fs.writeFileSync(config.reportDir + '/report-data.js', tpl);
  
      fs.copySync(__dirname + '/templates/report.tpl.html', config.reportDir + '/report.html');
      fs.copySync(__dirname + '/templates/report.js', config.reportDir + '/report.js');
    }
  }
};