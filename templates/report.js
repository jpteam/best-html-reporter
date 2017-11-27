angular.module('app', [])
  .controller('ReportController', function($scope, $locale) {
    $scope.results = results;
    $scope.jsonData = JSON.stringify(results, null, 4);

    function countKPIs() {
      var metrics = {
        totalSuites: 0,
        passedSuites: 0,
        totalSpecs: 0,
        passedSpecs: 0,
        totalExp: 0,
        passedExp: 0,
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

      results.startTime = results.startTime[0] + (results.startTime[1] * (1e-9));
      results.endTime = results.endTime[0] + (results.endTime[1] * (1e-9));

      metrics.timeMin = Math.floor((results.endTime - results.startTime) / 60);
      metrics.timeSec = Math.floor((results.endTime - results.startTime) - (metrics.timeMin * 60));

      metrics.timeMin = metrics.timeMin < 10 ? "0" + metrics.timeMin : '';
      metrics.timeSec = metrics.timeSec < 10 ? "0" + metrics.timeSec : '';

      // determine total time.
      // TODO: nimmi, take the data in results.startTime & results.endTime, and calculate metrics.timeMin & metrics.timeSec

      return metrics;
    }

    $scope.metrics = countKPIs();


  });