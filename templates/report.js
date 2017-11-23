angular.module('app', [])
  .controller('ReportController', function($scope, $locale) {
    $scope.results = results;
    $scope.jsonData = JSON.stringify(results, null, 4);
    $scope.suite = results.suites.length;

    $scope.expectations = results.suites.reduce(function(suiteTot, suite) {

      suiteTot.totalTest += suite.specs.length;

      var specCount = suite.specs.reduce(function(specTot, spec) {

         specTot.testPass += spec.status == "passed" ? 1 : 0;

        return {testPass: specTot.testPass, fail: specTot.fail + spec.failedExpectations.length, pass: specTot.pass + spec.passedExpectations.length};
      }, {testPass:0, fail:0, pass:0})

      return {testPass: suiteTot.testPass + specCount.testPass, totalTest: suiteTot.totalTest, fail: suiteTot.fail + specCount.fail, pass: suiteTot.pass + specCount.pass};
    }, {testPass:0, totalTest:0, fail:0, pass:0});
  });