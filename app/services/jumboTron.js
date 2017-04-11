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

srvJumboTron.factory('getJumboTron', ['$resource',
  function($resource){
   	return $resource('/api/jumbotron/', {}, {
   		query: {
   			method:'GET',
   			isArray:true
   		}
   	});
  }]);
