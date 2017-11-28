/**
 * Sunburst
 */
angular.module('app')

.directive('timeChart', function () {

  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    link: function (scope, element) {

      window.console.log('*** Timechart!!');
      var width = 1200,
        height = 100,
        specs = scope.specs;

      console.log(specs);

      var chart = d3.select(element[0])
        .append('svg')
        .attr('class', 'time-chart')
        .attr('width', width)
        .attr('height', height);

      var y = d3.scale.linear()
        .range([height, 0]);

      y.domain([0, d3.max(specs, function(d) { return d.endTime[0] - d.startTime[0] + 2; })]);

      var barWidth = width / specs.length;

      var bar = chart.selectAll("g")
        .data(specs)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

      bar.append("rect")
        .attr("y", function(d) {
          console.log('d', d);
          var tm = d.endTime[0] - d.startTime[0] + 2;
          return y(tm);
        })
        .attr("height", function(d) {
          var tm = d.endTime[0] - d.startTime[0] + 2;
          return height - y(tm);
        })
        .attr("width", barWidth - 1)
        .attr("class", function(d) {
          if (d.status != 'passed') {
            return 'fail';
          }
        });


    }, // link fn
    controller: ['$scope', function($scope) {

      var specs = [];
      function filterSpecs(node) {
        if (node.type == 'spec') {
          specs.push(node);
        } else {
          for (var i = 0; i < node.children.length; i++) {
            filterSpecs(node.children[i]);
          }
        }
      }

      console.log('data', $scope.data);
      filterSpecs($scope.data);
      $scope.specs = specs;
      //$scope.data = data;
    }]
  };
});
