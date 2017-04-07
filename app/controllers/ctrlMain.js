var myApp = angular.module('myApp');
// Has double params to ensure that when minifying the params don't break
myApp.controller('ctrlMain', ['$scope', '$http', '$location', '$routeParams', 'GetJumboTron', function($scope, $http, $location, $routeParams, GetJumboTron){
	$scope.getJumboTrons = function(){
		$http.get('/api/jumbotron').then(function(response){
			$scope.mdlJumboTrons = response.data;
		});
	}
    //$scope.mdlJumboTrons = GetJumboTron.query();
}])
.directive("jumbotron", function() {
    return {
        restrict: 'A',
        scope: {
      		JumboTrons: '=info'
    	},
        templateUrl : "./directives/jumbotron.html"
    };
});
