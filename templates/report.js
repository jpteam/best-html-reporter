angular.module('app', [])
  .controller('ReportController', function($scope, $locale) {
    $scope.results = results;
    $scope.jsonData = JSON.stringify(results, null, 4);
    $scope.suite = results.suites.length;
    $scope.data = results.suites.reduce(function(suiteTot, suite) {
      var specCount = suite.specs.reduce(function(specTot, spec) {
        return {fail: specTot.fail + spec.failedExpectations.length, pass: specTot.pass + spec.passedExpectations.length};
      }, {fail:0, pass:0})

      return {specs: suite.specs.length, fail: suiteTot.fail + specCount.fail, pass: suiteTot.pass + specCount.pass};
    }, {test:0, fail:0, pass:0});
  });