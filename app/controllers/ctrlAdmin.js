var myApp = angular.module('myApp');
// Has double params to ensure that when minifying the params don't break
myApp.controller('ctrlAdmin', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	$scope.getAdmin = function(){
		/*var id = $routeParams.id;
		$http.put('/api/jumbotron/'+id, $scope.jt).then(function(response){
			$location = '#/';
		});*/

/*		$http.get('/api/jumbotron').then(function(response){
			$scope.mdlJumboTrons = response.data;
			console.log($scope.mdlJumboTrons);
		});*/
	}

	$scope.getJumboTrons = function(){
		$http.get('/api/jumbotron').then(function(response){
			$scope.mdlJumboTrons = response.data;
			console.log($scope.mdlJumboTrons);
		});
	}


}])
.directive("admin", function() {
    return {
    	restrict: 'A',
        scope: {
      		Admins: '=info'
    	},
        templateUrl : "./directives/admin.html"
    };
});
