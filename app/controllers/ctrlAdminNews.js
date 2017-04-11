var myApp = angular.module('myApp');
// Has double params to ensure that when minifying the params don't break
myApp.controller('ctrlAdminNews', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	$scope.getNews = function(){
		$http.get('/api/news').then(function(response){
			$scope.mdlNews = response.data;
			//$scope.displayDate = mdlNews.createdDate.toLocaleString();
			//console.log($scope.mdlnews);
		});
	}

	// Get jumbotron by id
	$scope.getNewsById = function(){
		var id = $routeParams.id;

		$http.get('/api/news/'+id, $scope.n).then(function(response){
			$scope.n = response.data;

			/*var formateDate = new Date(n.createdDate);
			$scope.displayDate = formateDate.toLocaleString();*/
		});
	}

	$scope.updateNews = function(){
		var id = $routeParams.id;

		$http.put('/api/news/'+id, $scope.n).then(function(response){
			$location.path('/admin/news');
		});

	}

	$scope.addNews = function(){
		$http.post('/api/news', $scope.n).then(function(response){
			$location.path('/admin/news');
		});

	}

	$scope.removeNews = function(id){
		$http.delete('/api/news/'+id).then(function(response){
			console.log('/api/news/'+id);
			$location.path('/admin/news');
		});
	}

	$scope.removeNewsByName = function(name){
		$http.delete('/api/news/'+name).then(function(response){
			$location.path('/admin/news');
		});
	}

}]);
