var swig  = require('swig');
var path = require("path");

var swig_Template = require('../template/template_swig');

var LoginService = {}

LoginService.firstPageRendering = function(req,res){
	var render = {};
	render.templateURL = './public/login.html';
	render.data = {
		msg:""
	}
   swig_Template.compileHtml(render,function(err,data){
   	if(err){
   		console.log(err)
   		return;
   	}
   	res.send(data)
   })
   
}
LoginService.login = function(req,res){
	var render = {};
	render.templateURL = './public/login.html';

	//var template = swig.compileFile('./public/login.html');
	var msg = '';
	if(req.body.username=="admin") {
		if(req.body.password=="123") {
			msg=""
		} else {
			msg="Invalid password. try again!"
		}
	} else if(req.body.username!="admin") {
		if(req.body.password=="123") {
			msg="Invalid username. Try again!"
		} else {
			msg="Invalid username and password. Try again!"
		}
	}
	render.data = {	
		msg:msg
	}

	swig_Template.compileHtml(render,function(err,data){
		if(err){
	   		console.log(err)
	   		return;
   		}
   		res.send(data)
	})   	
}

LoginService.register = function(req,res){
	var render = {};
	render.templateURL = './public/Register.html';
	render.data = {
		msg:"",
	}
	var name=req.body.username;
   swig_Template.compileHtml(render,function(err,data){
   	if(err){
   		console.log(err)
   		return;
   	}
   	res.send(data)
   })
}


LoginService.NewRegister = function(req,res){

	var obj = {
		name:req.body.username,
		password:req.body.password,
		email:req.body.email
	}
	console.log(req.body);

}

module.exports = LoginService;