var myApp = angular.module('myApp');
// Has double params to ensure that when minifying the params don't break
myApp.controller('ctrlMain', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	$scope.getJumboTronsByFilter = function() {
		$http.get('/api/jumbotrons/filter').then(function(response) {
			$scope.mdlJumboTrons = response.data;
		});
	}

    $scope.getCarouselsByFilter = function() {
        $http.get('/api/carousels/filter').then(function(response) {
            $scope.mdlCarousels = response.data;
        });
    }

    $scope.getMarketsByFilter = function() {
        $http.get('/api/markets/filter').then(function(response) {
            $scope.mdlMarketing = response.data;
        });
    }

    $scope.getNewsByFilter = function() {
        $http.get('/api/news/filter').then(function(response) {
            $scope.mdlNews = response.data;
        });
    }
}])
.directive("section", function() {
    return {
        restrict: 'A',
        scope: {
      		mainModel: '=info'
    	},
        templateUrl : function(elem, attr) {
            return "./directives/" + attr.type + ".html"
        }
    };
});
