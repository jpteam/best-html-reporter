angular.module('app', [])
  .controller('ReportController', function($scope, $locale) {
    $scope.results = results;
    $scope.jsonData = JSON.stringify(results, null, 4);

    var metrics = {
      totalSuites: results.suites.length,
      passedSuites: 0,
      totalSpecs: 0,
      passedSpecs: 0,
      totalExp: 0,
      passedExp: 0
    };

    for (var i = 0; i < results.suites.length; i++) {
      var thisSuite = results.suites[i],
        numFailedSpecs = 0, // failed specs in this suite.
        numPassedExp = 0;

      for (var j = 0; j < thisSuite.specs.length; j++) {
        var thisSpec = thisSuite.specs[j],
          failedExpectations = thisSpec.failedExpectations,
          passedExpectations = thisSpec.passedExpectations;

        if (failedExpectations.length > 0) {
          numFailedSpecs ++;
        }

        numPassedExp += passedExpectations.length;

        metrics.totalExp += (passedExpectations.length + failedExpectations.length);
        metrics.passedExp += passedExpectations.length;
      }

      metrics.totalSpecs += thisSuite.specs.length;
      metrics.passedSpecs += (thisSuite.specs.length - numFailedSpecs);

      if (numFailedSpecs == 0) {
        metrics.passedSuites ++;
      }
    }

    $scope.metrics = metrics;
  });