var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MessageSchema = new Schema({
	upvote: {type: Number},
	downvote: {type:Number},
	message: {type:String},
	user: {type: String},
	user_id: {type:String},
	_topic: {type:Schema.Types.ObjectId, ref: 'Topic'},
	_comments: [{type:Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true})
mongoose.model("Message", MessageSchema)