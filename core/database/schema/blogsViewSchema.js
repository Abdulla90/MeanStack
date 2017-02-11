var mongoose = require('../db_connection');

var commentSchema =  mongoose.Schema({
	username:String,
	blogId:String,
	comment:String,
	stringDate:String
	
})
var viewblog = mongoose.model('viewblog',commentSchema)
module.exports = viewblog;