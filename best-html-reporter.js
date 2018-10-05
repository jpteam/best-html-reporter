/**
 * Best ever HTML reporter for Jasmine & Protractor
 * (c) 2017, C1X Inc.
 * @author Raj, Nimmi
 *
 * Configuration options:
 *   reportDir: Directory where the report has to be written (default is <current dir>/reports)
 *   screenshots: "all", "fail", "none" (default is none)
 */

var _ = require('underscore'),
   fs = require('fs-extra');

exports.init = function(config) {
  
  var results = {},
    suiteStack = [], specInfo = {};

  config.screenshots = config.screenshots || 'none';

  // create reports directory if it does not exist.
  if (!config.reportDir) {
    config.reportDir = __dirname + '/reports';
  }

  fs.mkdirs(config.reportDir);

  // create screenshots directory if needed to take screenshots.
  if (config.screenshots !== 'none') {
    fs.mkdirs(config.reportDir + '/screenshots');
  }

  function takeScreenshot(fileName) {
    if (browser && typeof browser.takeScreenshot === 'function') {  // check if the capability exists.
      browser.takeScreenshot().then(function(png) {
        var stream = fs.createWriteStream(fileName);
        stream.write(new Buffer(png, 'base64'));
        stream.end();
      });
    } else {
      console.log('Error: browser.takeScreenshot() capability not present!');
    }
  }

  return {

    jasmineStarted: function(specInfo) {
      results.reportTime = new Date().toString();
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
      specInfo[result.id] = result;
    },
    
    specDone: function(result) {
      result.endTime = process.hrtime();
      result.type = specInfo[result.id].type;
      result.startTime = specInfo[result.id].startTime;
      currentSuite.children.push(result);
      
      if (config.screenshots !== 'none') {
        if ((config.screenshots === 'fail' && result.failedExpectations.length > 0)
          || (config.screenshots !== 'fail')) {

          var screenshotFileName = config.reportDir + '/screenshots/' + result.id + '.png';
          takeScreenshot(screenshotFileName);
          result.screenshot = screenshotFileName;

        }
      }
    },
    
    suiteDone: function(result) {
      result.endTime = process.hrtime();
      suiteStack.pop();
    },
    
    jasmineDone: function() {

      function generateReportFiles() {
        results.endTime = process.hrtime();

        var fs = require('fs-extra'),
          json = JSON.stringify(results, null, 4);

        // write out the data.
        var tpl = fs.readFileSync(__dirname + '/templates/report-data.js','utf8');
        tpl = tpl.replace('{{results}}', json);
        fs.writeFileSync(config.reportDir + '/report-data.js', tpl);

        // copy over the template app.
        _.each([['report.tpl.html', 'report.html'], 'report.js', 'report.css', 'lib.js', 'time-chart.js', 'light-box.js'], function(file) {
          if (Array.isArray(file)) {
            fs.copySync(__dirname + '/templates/' + file[0], config.reportDir + '/' + file[1]);
          } else {
            fs.copySync(__dirname + '/templates/' + file, config.reportDir + '/' + file);
          }
        });
      }

      if (typeof browser != 'undefined') {
        browser.getCapabilities().then(function(caps) {
          results.browserData = {
            name: caps.get('browserName'),
            version: caps.get('version'),
            platform: caps.get('platform')
          };
          generateReportFiles();
        });
      } else {
        generateReportFiles();
      }
    }
  }
};