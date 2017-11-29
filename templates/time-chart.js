/**
 * Chart that shows time taken for each test case.
 */
angular.module('app')
  .directive('timeChart', function () {

  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    link: function (scope, element) {

      var width = 1140,
        height = 120,
        specs = scope.specs;

      var chart = d3.select(element[0])
        .append('svg')
        .attr('class', 'time-chart')
        .attr('width', width)
        .attr('height', height);

      var y = d3.scale.linear()
        .range([height - 20, 0]);

      y.domain([0, d3.max(specs, function(d) { return d.endTime[0] - d.startTime[0] + 2; })]);

      var barWidth = width / specs.length;
      if (barWidth > 30) {
        barWidth = 30;
      }

      var bar = chart.selectAll("g")
        .data(specs)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

      bar.append("rect")
        .attr("y", function(d) {
          var tm = d.endTime[0] - d.startTime[0] + 2;
          return y(tm);
        })
        .attr("height", function(d) {
          var tm = d.endTime[0] - d.startTime[0] + 2;
          return height - y(tm) - 20;
        })
        .attr("width", barWidth - 1)
        .attr("class", function(d) {
          if (d.status != 'passed') {
            return 'fail';
          }
        });


    }, // link fn
    controller: ['$scope', function($scope) {
      $scope.specs = lib.getAllSpecs($scope.data);
    }]
  };
});
