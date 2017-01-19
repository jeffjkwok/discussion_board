var mongoose = require('mongoose');
var	Schema = mongoose.Schema;
var UserSchema = new Schema({
		name: {type: String},
		topic_count: {type: Number},
		comment_count: {type: Number},
		post_count: {type: Number},
	})
mongoose.model('User', UserSchema)