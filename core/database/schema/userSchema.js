var mongoose = require('../db_connection');

var UserSchema =  mongoose.Schema({
	username:String,
	password:String,
	email:String,
	firstname:String,
	lastname:String,
	company:String,
	imagename:String

})
var User = mongoose.model('User',UserSchema)
module.exports = User;