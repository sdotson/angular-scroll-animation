angular.module('myApp',[])

    .controller('scrollController', scrollController)

    .directive('scroll', function($window) {
        return function(scope, el, attrs) {

            var sections = el.find('div');

            angular.element($window).bind("scroll", function () {

                var offset = $window.pageYOffset,
                    windowTop = $window.pageYOffset,
                    windowHeight = $window.outerHeight;

                for (var i = 0, sectionsLength = sections.length; i < sectionsLength; i++) {
                   var sectionTop = angular.element(sections[i]).prop('offsetTop'),
                       sectionHeight = angular.element(sections[i]).prop('offsetHeight'),
                       sectionMidpoint = sectionTop + sectionHeight/2,
                       sectionBottom = sectionTop + sectionHeight,
                       windowMidpoint = windowTop + windowHeight/2,
                       windowBottom = windowTop + windowHeight;

                   if (windowTop > sectionTop && windowTop < sectionBottom) {
                        var index = i,
                            change = (windowTop - sectionTop)/sectionHeight;

                            scope.slide = i;
                            scope.change = change;

                    };
                };
                 
                scope.$apply();
            });
        };
    });


scrollController.$inject = [];

function scrollController() {

}

