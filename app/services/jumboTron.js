var srvJumboTron = angular.module('srvJumboTron', ['ngResource']);

/*srvJumboTron.factory('SearchBooks', ['$resource',
  function($resource){
    return $resource('/api/books', {}, {
    	query: {
    		method:'GET',
			isArray:true
		}
	});
  }]);*/

srvJumboTron.factory('GetJumboTron', ['$resource',
  function($resource){
   	return $resource('/api/jumbotron/', {}, {
   		query: {
   			method:'GET',
   			isArray:true
   		}
   	});
  }]);
