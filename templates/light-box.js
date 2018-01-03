/**
 * Lightbox effect shown for image on click.
 */
angular.module('app')

  .directive('lightBox', function () {

      return {
        restrict: 'E',
        scope: {
          image: '='
        },
        template: '<img src="{{image}}">',
        link: function (scope, element) {
          $('#content').on("click",function(){
            scope.$parent.$parent.lightBoxShow = false;
            scope.$parent.$parent.$apply();
          });

          $(document).keydown(function(e) {
            if (e.keyCode == 27) {
              scope.$parent.$parent.lightBoxShow = false;
              scope.$parent.$parent.$apply();
            }
          });
        }
      };
});
