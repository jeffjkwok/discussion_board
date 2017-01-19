app.controller('sessionController', ['$scope', 'userFactory', '$location', '$routeParams', function($scope, userFactory, $location, $routeParams){
	$scope.login = function(){
		if(!$scope.user || $scope.user.name.length < 3){
			alert('Enter a name longer than 3 letters!')
		} else {
			$scope.user.topic_count = 0;
			$scope.user.post_count = 0;
			$scope.user.comment_count = 0;
		 	userFactory.login($scope.user, function(){
				$location.url('/dashboard')
			})
		}
	}
	userFactory.checkUser(function(data){
		$scope.currentUser = data.user
		if(!$scope.currentUser){
			$location.url('/')
		}
	})

	$scope.showUser = function(object){
			console.log(object)
			$location.url('/user/'+object.user_id)
		}

	if($routeParams.id) {
		userFactory.getUser($routeParams.id, function(data){
			$scope.show = data
		})
	}

}])
