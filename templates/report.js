angular.module('app', [])
  .controller('ReportController', function($scope, $locale) {
    $scope.results = results;
    $scope.jsonData = JSON.stringify(results, null, 4);
    $scope.suite = results.suites.length;

    function getTestCases(){
    $scope.count = 0;
      for (var index = 0; index < $scope.suite; index++) {
       $scope.count += results.suites[index].specs.length;
      }
      return $scope.count;
    }

    $scope.testCase = getTestCases();

    function getExpectation() {
    $scope.count = 0;
      for (var suite = 0; suite < $scope.suite; suite++) {
        for (var spec = 0; spec < $scope.testCase; spec++) {
          $scope.count += results.suites[suite].specs[spec].failedExpectations.length + results.suites[suite].specs[spec].passedExpectations.length;
        }
      }
      return $scope.count;
    }

    $scope.expectations = getExpectation();
  });