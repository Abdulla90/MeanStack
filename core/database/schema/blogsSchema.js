var mongoose = require('../db_connection');

var BlogsSchema =  mongoose.Schema({
	username:String,
	title:String,
	content:String,
	blogTypeID:String,
	stringDate:String,
	status:String
})
var Blogs = mongoose.model('blogs',BlogsSchema)
module.exports = Blogs;