var myApp = angular.module('myApp');
// Has double params to ensure that when minifying the params don't break
myApp.controller('ctrlAdminMarket', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	$scope.getMarkets = function(){
		$http.get('/api/markets').then(function(response){
			$scope.mdlMarkets = response.data;
		});
	}

	// Get jumbotron by id
	$scope.getMarketById = function(){
		var id = $routeParams.id;

		$http.get('/api/markets/'+id, $scope.mar).then(function(response){
			$scope.mar = response.data;
		});
	}

	$scope.updateMarket = function(){
		var id = $routeParams.id;

		$http.put('/api/markets/'+id, $scope.mar).then(function(response){
			$location.path('/admin/markets');
		});

	}

	$scope.addMarket = function(){
		$http.post('/api/markets', $scope.mar).then(function(response){
			$location.path('/admin/markets');
		});

	}

	$scope.removeMarket = function(id){
		$http.delete('/api/markets/'+id).then(function(response){
			console.log('/api/markets/'+id);
			$location.path('/admin/markets');
		});
	}

}]);
