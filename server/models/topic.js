var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TopicSchema = new Schema({
	topic: {type:String},
	description: {type:String},
	_messages: [{type: Schema.Types.Object, ref:'Message'}],
	user: {type:String},
	user_id: {type:String},
	count_messages: {type:Number},
	category: {type:String}
}, {timestamps: true})
mongoose.model('Topic', TopicSchema)