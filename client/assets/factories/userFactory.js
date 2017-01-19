app.factory('userFactory', ["$http", function($http){
	var factory = {}
	factory.login = function(user, callback){
		$http.post('/login', user).then(function(returnedData){
			callback()
		})
	}
	factory.checkUser = function(callback){
		$http.get('/checkUser').then(function(returnedData){
			callback(returnedData.data)
		})
	}
	factory.getUser = function(id, callback){
		$http.get('/user/'+id).then(function(returnedData){
			callback(returnedData.data['user'])
		})
	}
	return factory
}])
