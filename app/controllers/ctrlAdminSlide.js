var myApp = angular.module('myApp');
// Has double params to ensure that when minifying the params don't break
myApp.controller('ctrlAdminSlide', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	$scope.getSlides = function(){
		$http.get('/api/slides').then(function(response){
			$scope.mdlSlides = response.data;
			//console.log($scope.mdlSlides);
		});
	}

	$scope.saveSlideRef = function() {
		var id = $routeParams.id;

		$http.post('/api/slides/saveRef/'+id, $scope.slide).then(function(response){
			$location.path('/admin/carousels');
		});
	}

	// Get jumbotron by id
	$scope.getSlideById = function(){
		var id = $routeParams.id;

		$http.get('/api/slides/'+id, $scope.slide).then(function(response){
			$scope.slide = response.data;
		});
	}

	$scope.updateSlide = function(){
		var id = $routeParams.id;

		$http.put('/api/slides/'+id, $scope.slide).then(function(response){
			$location.path('/admin/slides');
		});
	}

	/*$scope.addSlide = function(){
		$http.post('/api/slides', $scope.slide).then(function(response){
			$location.path('/admin/slides');
		});
	}*/
	$scope.addSlideRef = function(){
		$http.post('/api/slides/add', $scope.slide).then(function(response){
			$location.path('/admin/slides');
		});
	}

	$scope.removeSlide = function(id){
		$http.delete('/api/slides/'+id).then(function(response){
			console.log('/api/slides/'+id);
			$location.path('/admin/slides');
		});
	}

}]);
