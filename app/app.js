(function() {
    'use strict';

    angular.module('myApp',['ngAnimate', 'ngRoute'])
        .controller('scrollController', scrollController)
        .config(config)
        .directive('scroll', scrollDirective);

    scrollController.$inject = ['$scope', '$location'];
    function scrollController($scope, $location) {
        $scope.slide = 0;

        $scope.$watch("slide", function(newValue, oldValue) {
            if (newValue !== 0 && newValue !== "" && newValue !== 5) {
                $location.path('/scene/' + newValue);
            } else if (newValue === 5) {
                $location.path('/thank-you');
            } else {
                $location.path('/');
            };
        });
    }

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/', {
              templateUrl: 'welcome.html',
        }).when('/scene/:sceneID', {
              templateUrl: 'scene.html',
        }).when('/thank-you', {
              templateUrl: 'thank-you.html',
        }).otherwise({
            redirectTo: '/'
        });
    }

    scrollDirective.$inject = ['$window'];
    function scrollDirective($window) {
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
                            change = (windowTop - sectionTop)/(sectionHeight);

                            scope.slide = i;
                            scope.change = change;

                    };
                };
                 
                scope.$apply();
            });
        };
    };


})();



