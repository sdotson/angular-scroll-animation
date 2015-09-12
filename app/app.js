angular.module('countriesApp',['countriesList','countryDetail','home','countries','ngAnimate'])
	.run(function($rootScope, countriesService) {
		$rootScope.$on('$routeChangeStart', function() {
      $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $rootScope.isLoading = false;
    });
	});