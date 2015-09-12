angular.module('myApp',[])

    .controller('scrollController', scrollController)

    .directive('scroll', function($window) {
        return function(scope, el, attrs) {

            angular.element($window).bind("scroll", function () {
                var offset = $window.pageYOffset;
                 if (offset >= 50) {
                     scope.boolChangeClass = true;
                     console.log('scrolling');
                 } else {
                     scope.boolChangeClass = false;
                 }
                scope.$apply();
            });
        };
    });


scrollController.$inject = [];

function scrollController() {

}

