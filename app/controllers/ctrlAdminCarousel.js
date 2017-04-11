var myApp = angular.module('myApp');
// Has double params to ensure that when minifying the params don't break
myApp.controller('ctrlAdminCarousel', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	$scope.getCarousels = function(){
		$http.get('/api/carousels').then(function(response){
			$scope.mdlCarousels = response.data;
		});
	}

	$scope.getCarouselPopulateSlides = function(){
		$http.get('/api/carousels').then(function(response){
			$scope.mdlCarouselSlides = response.data;
			//console.log("slides " + $scope.mdlCarouselSlides);
		});
	}

	$scope.getCarouselById = function(){
		var id = $routeParams.id;
		$http.get('/api/carousels/'+id, $scope.caro).then(function(response){
			$scope.caro = response.data;
		});
	}

	$scope.getCarouselsByFilter = function(){
		$http.get('/api/carousels/filter').then(function(response){
			$scope.mdlCarousels = response.data;
		});
	}	

	$scope.getLatestCarouselsByFilter = function(){
		$http.get('/api/carousels/filter').then(function(response){
			$scope.mdlCarousels = response.data;
		});
	}	

	$scope.updateCarousel = function(){
		var id = $routeParams.id;
		$http.put('/api/carousels/'+id, $scope.caro).then(function(response){
			$location.path('/admin/carousels');
		});

	}

	$scope.addSlideRef = function() {
		var id = $routeParams.id;
		$http.put('/api/carousels/saveRef/'+id, $scope.slide).then(function(response){
			console.log("saveSlide");
			$location.path('/admin/carousels');
		});
	}

	$scope.addCarousel = function(){
		$http.post('/api/carousels', $scope.caro).then(function(response){
			$location.path('/admin/carousels');
		});

	}

	$scope.removeCarousel = function(id){
		$http.delete('/api/carousels/'+id).then(function(response){
			$location.path('/admin/carousels');
		});
	}

	$scope.removeCarouselsByName = function(name){
		$http.delete('/api/carousels/'+name).then(function(response){
			$location.path('/admin/carousels');
		});
	}

}]);
