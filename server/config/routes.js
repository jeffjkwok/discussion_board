var session = require('../controllers/sessionController.js'),
	topic = require('../controllers/topicController.js')
module.exports = function(app){
	app.post('/login', session.login);
	app.get('/logout', session.logout);
	app.get('/checkUser', session.checkUser);
	app.get('/user/:id', session.getUser);
	app.get('/getTopics', topic.getTopics);
	app.get('/getMessages/:id', topic.getMessages);
	app.get('/topic/:id', topic.getTopic);
	app.post('/postTopic', topic.postTopic);
	app.post('/postMessage/:id', topic.postMessage);
	app.post('/postComment/:id', topic.postComment);
	app.put('/upvote/:id', topic.upvote);
	app.put('/downvote/:id', topic.downvote);
}
