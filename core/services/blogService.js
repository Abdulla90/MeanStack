var express = require('express')
var swig  = require('swig');
var app = express()
var Blogs = require('../database/schema/BlogsSchema')
var viewblog = require('../database/schema/BlogsViewSchema')
var swig_Template = require('../template/template_swig');

var BlogService = {}
var BlogCommentArray = {};

global.StdTime = function(req,res){
var monthNames = ["January", "February", "March","April", "May", "June", "July","August", "September", "October",  "November", "December"];
var date = new Date();
var day = date.getDate();
var monthIndex = date.getMonth();
var year = date.getFullYear();
var hours= date.getHours();
var min= date.getMinutes();
var fullDate = monthNames[monthIndex]+" "+day+" "+year+" "+hours+":"+min+"IST";
var stringDate = fullDate.toString();
return stringDate;
}

// global.callOfCommentsBlog = function(req,res){
// 	viewblog.findOne({_id:req.body.id},function(err, commentBlogs){
// 		if(err){
// 			console.log(err);
// 			return;
// 		}
// 		console.log( commentBlogs);
// 	})
// }
 
BlogService.uploadBlog = function (req,res){
var status = 'pending';
var stringDate = StdTime();
//console.log(stringDate);
console.log(req.session.username);
var obj = {
	name:req.session.username,
	title:req.body.title,
	content:req.body.comment,
	type:req.body.type,
	stringDate:stringDate,
	status:status
}
//res.send(obj);
//console.log(obj);
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
	//var time = StdTime();
	//console.log(time);
	Blogs.find(function(err,blogs){
				if(err){
					console.log(err);
					return;
				}
				res.send(blogs);

			})

}

BlogService.fetchTypeBlog = function(req,res){
	
	Blogs.find({type:req.body.type},function(err,blogs){
		if(err){
			console.log(err);
			return;
		}
		res.send(blogs);
	})
}

BlogService.blogscomments = function(req, res){


	Blogs.findOne({_id:req.body.id},function(err,blogs){
		if(err){
			console.log(err);
				return;
		}
 		console.log(req.body.id);

		viewblog.find({blogId:req.body.id},function(err, commentBlogs){
 		if(err){
 			console.log(err);
 			return;
 		}

 		/*console.log("-------")
 		console.log(req.body.id);
 		console.log(commentBlogs);*/
 		//BlogCommentArray = commentBlogs;
 		//res.send(commentBlogs);
 		BlogCommentArray = {
			data1:blogs,
			data2:commentBlogs
		}


	res.send(BlogCommentArray)
 	})
		
	})
	
}


BlogService.addblogComments = function(req,res){
	var stringDate = StdTime();
	var obj2 = {
	name:req.session.username,
	blogId:req.body.id,
	comment:req.body.comments,
	stringDate:stringDate
}
var commentBlogs = new viewblog(obj2);
commentBlogs.save(function(err,data){
			if(err){
				//msg="Errors in Saving database"
				console.log("error in saving data");
					return;
			
			}
			console.log('data saved to db!');
			//console.log(commentBlogs)
			res.send(commentBlogs);	
	
		});


}

BlogService.FuncdeleteBlog = function(req,res){
	//var db = req.db;
	console.log(req.body.blog_id);
	Blogs.remove({ _id:req.body.blog_id},function(err, blogs){
		//Blogs.findOne({_id:req.body.id},function(err,blogs){
		if(err){
			console.log(err);
			return;
		}
	Blogs.find(function(err,blogs){
				if(err){
					console.log(err);
					return;
				}
				res.send(blogs);

			})
	})


}



module.exports = BlogService;