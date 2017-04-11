var myApp = angular.module('myApp');
// Has double params to ensure that when minifying the params don't break
myApp.controller('ctrlAdminJumboTron', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	$scope.getJumboTrons = function(){
		$http.get('/api/jumbotrons').then(function(response){
			$scope.mdlJumboTrons = response.data;
			//console.log($scope.mdlJumboTrons);
		});
	}

	// Get jumbotron by id
	$scope.getJumboTronById = function(){
		var id = $routeParams.id;
		$http.get('/api/jumbotrons/'+id, $scope.jt).then(function(response){
			$scope.jt = response.data;
		});
	}

	$scope.getLatestJumboTron = function(){
		$http.get('/api/jumbotrons/filter').then(function(response){
			$scope.mdlJumboTron = response.data;
		});
	}

	$scope.getLatestJumboTronFiltered = function(){
		$http.get('/api/jumbotrons/filter').then(function(response){
			$scope.mdlJumboTron = response.data;
		});
	}	

	$scope.updateJumboTron = function(){
		var id = $routeParams.id;
		$http.put('/api/jumbotrons/'+id, $scope.jt).then(function(response){
			$location.path('/admin/jumbotrons');
		});

	}

	$scope.addJumboTron = function(){
		$http.post('/api/jumbotrons', $scope.jt).then(function(response){
			$location.path('/admin/jumbotrons');
		});

	}

	$scope.removeJumboTron = function(id){
		$http.delete('/api/jumbotrons/'+id).then(function(response){
			$location.path('/admin/jumbotrons');
		});
	}

}]);
