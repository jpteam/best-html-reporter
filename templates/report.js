angular.module('app', [])
  .filter('time', function() {
    return function(obj) {
      return lib.diffTime(obj);
    }
  })

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
    $scope.allSpecs = lib.getSpecsWithSuite(results);

    var prevPos = 0;

    $(window).scroll(function() {
      var pos = $(window).scrollTop(),
        windowHeight = $(window).height(),
        documentHeight = $(document).height();

      console.log(pos, windowHeight, documentHeight);

      if (pos > 120) {
        $('.time-chart').addClass('float-chart');
      } else if (pos == 0){
        $('.time-chart').removeClass('float-chart');
      }

      prevPos = pos;
    });

    var prevBar = null;
    $scope.$on('barClicked', function(e, bar) {

      if ($('.time-chart.float-chart').is(":visible") == false) {
        $('html,body').animate(
          { scrollTop: $("#" + bar.id).offset().top - 290},
          'slow'
        );
      } else {
        $('html,body').animate(
          { scrollTop: $("#" + bar.id).offset().top - $('.time-chart.float-chart').outerHeight()},
          'slow'
        );
      }

      $('#' + bar.id).parent().addClass('bar-selected');
      $('#bar-' + bar.id).addClass('bar-selected');

      if (prevBar) {
        $('#' + prevBar.id).parent().removeClass('bar-selected');
        $('#bar-' + prevBar.id).removeClass('bar-selected');
      }

      prevBar = bar;
    });

    $scope.lightBox = function(image) {

      $scope.lightBoxShow = true;
      $scope.lightBoxImage = image;

    };

  });