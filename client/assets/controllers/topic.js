app.controller('topicController', ['$scope', 'topicFactory', 'userFactory', '$location', '$routeParams', function($scope, topicFactory, userFactory, $location, $routeParams){

	$scope.postTopic = function(){
		if(!$scope.topic || !$scope.topic.topic || !$scope.topic.description || !$scope.topic.category){
			alert('Topic fields can not be empty!')
		} 
		else {
			$scope.topic.user = $scope.currentUser.name
			$scope.topic.user_id = $scope.currentUser._id
			topicFactory.postTopic($scope.topic, $scope.currentUser,function(){
				$scope.topic = {}
				getTopics()
			})
		}
	}

	$scope.postMessage = function(id, message){
		if(message == undefined){
			alert('post can not be empty!')
		} else {
			message.upvote = 0;
			message.downvote = 0;
			message.user = $scope.currentUser.name
			message.user_id = $scope.currentUser._id
			topicFactory.postMessage(id, message, $scope.currentUser, function(){
				getTopic()
				$scope.message = {}
			})
		}
	}

	$scope.postComment = function(id, comment){
		console.log(comment)
		if(comment == undefined){
			alert('Comment can not be empty!')
		} else {
			comment.user = $scope.currentUser.name
			comment.user_id = $scope.currentUser._id
			topicFactory.postComment(id, comment, $scope.currentUser, function(){
				getTopic()
			})
		}
	}

	$scope.upvote = function(id, count){
		count += 1;
		topicFactory.upvote(id, count, getTopic)
	}

	$scope.downvote = function(id, count){
		count -= 1;
		topicFactory.downvote(id, count, getTopic)
	}


// topics are recieved
	function getTopics(){
		topicFactory.getTopics(function(returnedData){
			$scope.topics = returnedData
		})
	}
	getTopics()
 // 

	$scope.showTopic = function(topic){
		$location.url('/topic/'+topic._id)
	}
	function getTopic(){
		if($routeParams.id){
			topicFactory.getTopic($routeParams.id, function(data){
				$scope.display = data
			})
			topicFactory.getMessages($routeParams.id, function(data){
				$scope.display._messages = data
			})
		}
	}
	getTopic()
}])