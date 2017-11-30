(function() {

  var lib = {};

  lib.diffTime = function(obj) {
    var secs = (obj.endTime[0] - obj.startTime[0]) + 1;

    function padZero(n) {
      return (n < 10) ? '0' + n : n;
    }

    return padZero(Math.floor(secs / 60)) + 'm:' + padZero(secs % 60) + 's';
  }

  lib.countKPIs = function() {
    var metrics = {
      totalSuites: 0,
      passedSuites: 0,
      totalSpecs: 0,
      passedSpecs: 0,
      totalExp: 0,
      passedExp: 0,
      timeTaken: 'N/A',
      timeMin: 0,
      timeSec: 0
    };

    function traverse(node) {
      console.log(node.type + ' - ' + node.id );

      var isPass = true;
      if (node.children) {
        for (var i = 0; i <  node.children.length; i++) {
          isPass &= traverse(node.children[i]);
        }
      }

      switch (node.type) {
        case 'suite':
          // we are counting suites at ALL levels.
          metrics.totalSuites ++;
          if (isPass) {
            metrics.passedSuites ++;
          }
          break;

        case 'spec':
          var spec = node;
          isPass = (spec.failedExpectations.length == 0);
          metrics.totalExp += (spec.failedExpectations.length + spec.passedExpectations.length);
          metrics.passedExp += spec.passedExpectations.length;

          metrics.totalSpecs ++;
          if (isPass) {
            metrics.passedSpecs ++;
          }
          break;

        default:
          break;
      }

      return isPass;
    }

    traverse(results);

    var startSec = results.startTime[0] + (results.startTime[1] * (1e-9)),
    endSec = results.endTime[0] + (results.endTime[1] * (1e-9)),
    secDiff = Math.round(endSec - startSec);

    metrics.timeMin = Math.floor(secDiff / 60);
    metrics.timeSec = Math.floor(secDiff - (metrics.timeMin * 60));

    if (metrics.timeMin < 10) { metrics.timeMin = '0' + metrics.timeMin }
    if (metrics.timeSec < 10) { metrics.timeSec = '0' + metrics.timeSec }

    metrics.timeTaken = lib.diffTime(results);

    return metrics;
  }


  // Get all the specs from the tree.
  lib.getAllSpecs = function(root) {
    var specs = [];
    function traverse(node) {
      if (node.type == 'spec') {
        specs.push(node);
      } else {
        for (var i = 0; i < node.children.length; i++) {
          traverse(node.children[i]);
        }
      }
    }

    traverse(root);
    return specs;
  }

  // Get first failure test case (spec)
  lib.getFirstFail = function(root) {

    var firstFail;
    function traverse(ancestors, node) {
      if (firstFail) return;

      if (node.type == 'spec') {
        if (node.status == 'failed') {
          var pathCopy = [];
          for (var i=1; i < ancestors.length; i++) {
            pathCopy.push(ancestors[i].description);
          }
          firstFail = [node, pathCopy.join(' > ')];
        }
      } else {
        if (node.children) {
          ancestors.push(node);
          for (var i = 0; i < node.children.length; i++) {
            traverse(ancestors, node.children[i]);
          }
          ancestors.pop();
        }

      }
    }

    traverse([], root);
    return firstFail;
  }


  // Get all specs along with the suites containing them.
  // TODO
  lib.getSpecsWithSuite = function(root) {

    var suiteSpecs = [];
    function traverse(ancestors, node) {
      //console.log(node);
      if (node.type == 'suite' || node.type == 'root') {

        var childSpecs = [];
        for (var i = 0; i < node.children.length; i++) {
          if (node.children[i].type == 'spec') {
            childSpecs.push(node.children[i]);
          }
        }

        if (node.type != 'root') {
          ancestors.push(node);
        }

        if (childSpecs.length > 0) {
          var path = ancestors.map(function(d) { return d.description }).join(' \u279F ');
          suiteSpecs.push({
            path: path,
            specs: childSpecs
          });
        }

        for (var i = 0; i < node.children.length; i++) {
          if (node.children[i].type != 'spec') {
            traverse(ancestors, node.children[i]);
          }
        }

        if (node.type != 'root') {
          ancestors.pop();
        }
      }
    }

    traverse([], root);
    return suiteSpecs;
  }

  window.lib = lib;
})();


