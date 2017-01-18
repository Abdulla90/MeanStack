var express = require('express')
var swig  = require('swig');
var app = express()
var Blogs = require('../database/schema/BlogsSchema')
var swig_Template = require('../template/template_swig');

var BlogService = {}

BlogService.uploadBlog = function (req,res){
var monthNames = ["January", "February", "March","April", "May", "June", "July","August", "September", "October",  "November", "December"];
var date = new Date();
var day = date.getDate();
var monthIndex = date.getMonth();
var year = date.getFullYear();
var status = 'pending';
console.log(day, monthNames[monthIndex], year);
console.log(req.session.username);
var obj = {
	name:req.session.username,
	title:req.body.title,
	content:req.body.comment,
	type:req.body.type,
	day:day,
	month:monthNames[monthIndex],
	year:year,
	status:status
}
//res.send(obj);
console.log(obj);
var blogs = new Blogs(obj);
			blogs.save(function(err,data){
			if(err){
				//msg="Errors in Saving database"
				console.log("error in saving data");
					return;
			
			}
			console.log('data saved to db!');
			Blogs.find(function(err,blogs){
				if(err){
					console.log(err);
					return;
				}
				//console.log(blogs)
				res.send(blogs);

			})
	
		});
			

}

BlogService.fetchBlog = function(req,res){
	Blogs.find(function(err,blogs){
				if(err){
					console.log(err);
					return;
				}
				//console.log(blogs)
				res.send(blogs);

			})

}

module.exports = BlogService;