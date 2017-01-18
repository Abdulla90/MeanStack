var mongoose = require('../db_connection');

var BlogsSchema =  mongoose.Schema({
	name:String,
	title:String,
	content:String,
	type:String,
	stringDate:String,
	status:String
})
var Blogs = mongoose.model('blogs',BlogsSchema)
module.exports = Blogs;