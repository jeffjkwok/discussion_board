var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
	user: {type: String},
	user_id: {type:String},
	comment: {type:String},
	_message: {type: Schema.Types.ObjectId, ref: 'Message'}
}, {timestamps: true})
mongoose.model('Comment', CommentSchema)