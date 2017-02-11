var express = require('express')
var profilerouter = express.Router();
var path = require('path');
var ProfileService = require('../services/profileService');


function hello(req,res,next){ // use of middleware function 
	console.log("hi");
	next();

}

profilerouter.use(function(req,res,next){
	if (!req.session.username){
		res.redirect('/');
		res.end();
	}
	next();
})

profilerouter.post('/uploadImage',hello, ProfileService.uploadImage )
  
profilerouter.post('/uploadUsersDetailDB', ProfileService.uploadUsersDetail)


module.exports = profilerouter;