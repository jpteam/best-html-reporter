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

var _ = require('underscore'),
   fs = require('fs-extra');

exports.init = function(config) {
  
  var results = {},
    suiteStack = [];

  config.screenshots = config.screenshots || 'none';

  if (!config.reportDir) {
    config.reportDir = __dirname + '/reports';
  }

  fs.mkdirs(config.reportDir);

  return {

    jasmineStarted: function(suiteInfo) {
      results.config = config;
      results.suiteInfo = suiteInfo;
      results.children = [];
      results.type = 'root';
      results.startTime = process.hrtime();

      suiteStack.push(results);
    },
    
    suiteStarted: function(result) {
      var parent = suiteStack[suiteStack.length-1];
      parent.children.push(result);

      result.type = 'suite';
      suiteStack.push(result);

      currentSuite = result;
      currentSuite.startTime = process.hrtime();
      currentSuite.children = [];
    },
    
    specStarted: function(result) {
      result.type = 'spec';
      result.startTime = process.hrtime();
    },
    
    specDone: function(result) {
      result.endTime = process.hrtime();
      currentSuite.children.push(result);
      
      if (config.screenshots !== 'none') {
        var screenshotFileName = config.reportDir + '/screens/' + result.id + '.png';
        if ((config.screenshots === 'fail' && result.failedExpectations.length > 0)
          || (config.screenshots !== 'fail')) {
          config.screenshotCB.call(this, screenshotFileName);
        }
      }
    },
    
    suiteDone: function(result) {
      result.endTime = process.hrtime();
      suiteStack.pop();
    },
    
    jasmineDone: function() {
      results.endTime = process.hrtime();

      var fs = require('fs-extra'),
        json = JSON.stringify(results, null, 4);
  
      var tpl = fs.readFileSync(__dirname + '/templates/report-data.js','utf8');
      tpl = tpl.replace('{{results}}', json);
      fs.writeFileSync(config.reportDir + '/report-data.js', tpl);
  
      fs.copySync(__dirname + '/templates/report.tpl.html', config.reportDir + '/report.html');
      fs.copySync(__dirname + '/templates/report.js', config.reportDir + '/report.js');
      fs.copySync(__dirname + '/templates/report.css', config.reportDir + '/report.css');
    }
  }
};