	var express = require('express')
var swig  = require('swig');
var app = express()
var User = require('../database/schema/userSchema')
var swig_Template = require('../template/template_swig');
var LoginService = {}

LoginService.sessionValidation = function(req,res){
	//console.log("Initial value of Session" + req.session.username);
	User.findOne({name:req.session.username},function (err,user){
		if(err){
		console.log(err);
		return;
		}
	
	if(user){
		//console.log("key value of user.name :" + user.name)
		res.redirect('/blogs/');
	}
	else{

		var render = {};
		render.templateURL = './public/views/login.html';//this code is used to stay on the same page 
		render.data = {
			msg:""
		};
   		swig_Template.pageRendering(render,res)
	}
	})

}

//When user submit its useranme and password it will call this function  
LoginService.login = function(req,res){
var render = {};
User.findOne({name:req.body.username, password:req.body.password}, function(err, user) {
	if(err){
		console.log(err);
		return;
	}
	if (!user)	{
		render.templateURL = './public/views/login.html'; 
		var msg = "Invalid Username and password";
		render.data = {	
		msg:msg
		}
		swig_Template.pageRendering(render,res) 
	} else {
		//console.log( "After validation of user and printing his name: " + user.name);
		req.session.username = user.name;
		if (req.session.username == "admin" ){
		res.redirect('/blogs/#/admin');

		}else
		 res.redirect('/blogs/');
		//req.session.password = user.password;
		//console.log("stored value in req.session.username ="+ req.session.username);
		
	}
})
	
}

LoginService.register = function(req,res,next){
	var render = {};
	render.templateURL = './public/views/Register.html';
	render.data = {
		msg:"",
	}
 	swig_Template.pageRendering(render,res)

	}


LoginService.NewRegister = function(req,res){

  	var render = {};
	render.templateURL = './public/views/Register.html';
	var isValid = false;
	var msg = '';
	var obj = {
		name:req.body.username,
		password:req.body.password,
		email:req.body.email
	}
		//console.log(obj.name);
	if (obj.name == "" || obj.password == "" || obj.email== "" ){
		//isValid = true;
		msg = "All fields are mandatory"
		render.data = {
				msg:msg
			}
				swig_Template.pageRendering(render,res)
			
	} else{
			var user = new User(obj);
			user.save(function(err,data){
			if(err){
				msg="Errors in Saving database"
				console.log("error in saving data");
					return;
			
			}
			console.log('data saved to db!',data);
			msg = "successfully created"
			console.log(msg);
			render.data = {
				msg:msg
			}
				swig_Template.pageRendering(render,res)
					
			});
		
	}


}

module.exports = LoginService;