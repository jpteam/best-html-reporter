angular.module('app', [])
  .controller('ReportController', function($scope, $locale) {
    $scope.results = results;
    $scope.jsonData = JSON.stringify(results, null, 4);

    var metrics = lib.countKPIs();

    $scope.allPass = false;
    if (metrics.passedSuites == metrics.totalSuites) {
      $scope.allPass = true;
    }

    $scope.metrics = metrics;
    $scope.firstFail = lib.getFirstFail(results);
  });