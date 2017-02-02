var mongoose = require('../db_connection');

var BlogsTypeSchema =  mongoose.Schema({
	name:String
	
})
var BlogsType = mongoose.model('blogstype',BlogsTypeSchema)
module.exports = BlogsType;