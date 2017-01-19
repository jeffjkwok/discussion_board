var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

function topicController(){
	this.getTopics = function(req, res){
		Topic.find({}).populate({path:'_messages', populate: {path: '_comments'}}).exec(function(err, topics){
			if(err){
				console.log('error returning topics')
				return res.json({topics: null})
			} else {
				return res.json({topics: topics})
			}
		})
	}
	this.getTopic = function(req,res){
		Topic.findOne({_id: req.params.id}, function(err, topic){
			if(err){
				console.log( 'getTopic Error: ', err)
				return res.json({topic: null})
			} else {
				return res.json({topic: topic})
			}
		})
	}
	this.getMessages = function(req, res){
		Message.find({_topic: req.params.id}).populate('_comments').exec(function(err, messages){
			if(err){
				return res.json({messages: null})
			} else {
				console.log('messages')
				return res.json({messages: messages})
			}
		})
	}

	this.postTopic = function(req, res){
		console.log('adding topic', req.body.topic)
		var topic = new Topic(req.body.topic);
		topic.save(function(err,data){
			User.update({_id:req.body.topic.user_id}, {$set: {topic_count: req.body.topic_count}}, function(err){
				if(err){
					console.log('topic count update error')
				}
			})
			if(err){
				console.log('Topic Error: ', err)
				return res.json({topic: null})
			}
			return res.json({topic: data})
		})
	}

	this.postMessage = function(req,res){
		Topic.findOne({_id: req.params.id}, function(err, topic){
			var message = new Message(req.body.message);
			message._topic = topic._id
			message.save(function(err){
				topic._messages.push(message)
				topic.save(function(err){
					User.update({_id:req.body.message.user_id}, {$set: {post_count: req.body.post_count}}, function(err){
						if(err){
							console.log('post count update error');
							console.log(err);
						}
						console.log(err)
						console.log(req.body.message.user_id, req.body.post_count,'update')
					})
					
				})
			})

		})
	}
	this.postComment = function(req,res){
		Message.findOne({_id: req.params.id}, function(err, message){
			var comment = new Comment(req.body.comment);
			comment._message = message._id
			comment.save(function(err){
				message._comments.push(comment)
				message.save(function(err){
					User.update({_id:req.body.comment.user_id}, {$set: {comment_count: req.body.comment_count}}, function(err){
						if(err){
							console.log('post count update error');
							console.log(err);
						}
						console.log(err)
						console.log(req.body.comment.user_id, req.body.comment_count,'update')
					})
					if(err){
						console.log('comment error: ', err)
					} else {
						console.log('comment added')
						return res.json({message: message})
					}
				})
			})
		})
	}
	this.upvote = function(req,res){
		Message.update({_id:req.params.id}, req.body, function(err){
			if(err){
				return res.json({status: false})
			}
			return res.json({status:true})
		})
	}
	this.downvote = function(req,res){
		Message.update({_id:req.params.id}, req.body, function(err){
			if(err){
				return res.json({status: false})
			}
			return res.json({status:true})
		})
	}
}
module.exports = new topicController()
