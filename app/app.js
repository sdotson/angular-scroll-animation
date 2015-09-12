angular.module('myApp',[])

    .controller('scrollController', scrollController)

    .directive('scroll', function($window) {
        return function(scope, el, attrs) {


            // offset function borrowed from jQuery library
            function offset( options ) {
                //...

                var docElem, win, rect, doc,
                    elem = this[ 0 ];

                if ( !elem ) {
                    return;
                }

                rect = elem.getBoundingClientRect();

                // Make sure element is not hidden (display: none) or disconnected
                if ( rect.width || rect.height || elem.getClientRects().length ) {
                    doc = elem.ownerDocument;
                    win = getWindow( doc );
                    docElem = doc.documentElement;

                    return {
                        top: rect.top + win.pageYOffset - docElem.clientTop,
                        left: rect.left + win.pageXOffset - docElem.clientLeft
                    };
                }
            }




            angular.element($window).bind("scroll", function () {

                var offset = $window.pageYOffset;

                var windowTop = $window.pageYOffset,
                    windowHeight = $window.outerHeight;

                var sections = document.getElementsByClassName('timer-section');

                var scenes = document.getElementsByClassName('stage-scene');

                for (var i = 0; i < sections.length; i++) {
                   var sectionTop = angular.element(sections[i]).prop('offsetTop'),
                       sectionHeight = angular.element(sections[i]).prop('offsetTop'),
                       sectionMidpoint = sectionTop + sectionHeight/2,
                       sectionBottom = sectionTop + sectionHeight,
                       windowMidpoint = windowTop + windowHeight/2,
                       windowBottom = windowTop + windowHeight;

                     console.log();  

                   if (windowTop > sectionTop && windowTop < sectionBottom) {
                        var index = i,
                            change = (windowTop - sectionTop)/sectionHeight,
                            step = change < .5 ? 'part1-active' : 'part2-active';

                            scope.slide = i;

                        angular.element(scenes).eq(index).removeClass('part1-active part2-active').addClass(step);
                        angular.element(scenes).removeClass('active soon-to-be-active').eq(index).addClass('active');
                    };
                };
                 
                scope.$apply();
            });
        };
    });


scrollController.$inject = [];

function scrollController() {

}

