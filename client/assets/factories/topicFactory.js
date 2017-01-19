app.factory('topicFactory', ['$http', function($http){
	var factory = {}
	factory.getTopics = function(callback){
		$http.get('/getTopics').then(function(returnedData){
			callback(returnedData.data.topics)
		})
	}
	factory.getTopic = function(id, callback){
		$http.get('/topic/'+id).then(function(returnedData){
			callback(returnedData.data['topic'])
		})
	}
	factory.getMessages = function(id, callback){
		$http.get('/getMessages/'+id).then(function(returnedData){
			callback(returnedData.data.messages)
		})
	}

	factory.postTopic = function(topic, user, callback){
		user.topic_count += 1;
		var object = {topic: topic, topic_count: user.topic_count}
		$http.post('/postTopic', object).then(function(returnedData){
			callback()
		})
	}
	factory.postMessage = function(id, message, user, callback){
		user.post_count += 1;
		console.log(user.post_count)
		var object = {message: message, post_count: user.post_count}
		$http.post('/postMessage/'+id, object).then(function(returnedData){
			callback()
		})
	}
	factory.postComment = function(id, comment, user, callback){
		user.comment_count += 1;
		var object = {comment: comment, comment_count: user.comment_count}
		$http.post('/postComment/'+id, object).then(function(returnedData){
			callback()
		})
	}

	factory.upvote = function(id, count, callback){
		$http.put('/upvote/'+id, {$set:{upvote: count}}).then(function(returnedData){
			callback()
		})
	}
	factory.downvote = function(id, count, callback){
		$http.put('/downvote/'+id, {$set:{downvote: count}}).then(function(returnedData){
			callback()
		})
	}
	return factory 
}])