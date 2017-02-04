var express = require('express')
var swig  = require('swig');
var app = express()
var Blogs = require('../database/schema/BlogsSchema')
var viewblog = require('../database/schema/BlogsViewSchema')
var BlogsType = require('../database/schema/blogTypeSchema')
var User=require('../database/schema/userSchema')
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

BlogService.uploadBlog = function (req,res){
var status = 'pending';
var stringDate = StdTime();
//console.log(stringDate);
//console.log(req.session.username);
var obj = {
	name:req.session.username,
	title:req.body.title,
	content:req.body.comment,
	blogTypeID:req.body.blogTypeID,
	stringDate:stringDate,
	status:status
}

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

BlogService.fetchTypes = function(req,res){
	BlogsType.find(function(err,blogstype){
		if(err){
			console.log(err);
			return;
		}
		res.send(blogstype);
	})
}

BlogService.fetchTypeBlog = function(req,res){
	//console.log(req.body.blogTypeID);
	Blogs.find({blogTypeID:req.body.blogTypeID},function(err,blogs){
		if(err){
			console.log(err);
			return;
		}
		//console.log(blogs,"blogs detail");
		res.send(blogs);
	})
}

BlogService.fetchPendingData= function(req,res){
	
	Blogs.find({status:req.body.status},function(err,blogs){
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
	//console.log(req.body.blog_id);
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

BlogService.FuncUpateStatusBlog = function(req,res){
	
	Blogs.update({_id:req.body.blog_id}, {$set: {status:req.body.blog_status}},function(err, blogs){

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
	});
}

BlogService.FuncUpdateBlogType = function(req,res){
	var obj = {
	name:req.body.type
	}
	var blogstype = new BlogsType(obj);
	blogstype.save(function(err,data){
				if(err){
					//msg="Errors in Saving database"
					console.log("error in saving data");
						return;
				
				}
				console.log('data saved to db!');
				//console.log(commentBlogs)
				res.send(blogstype)	
		
			});
		

	}
	
BlogService.FuncGetUsersDetail = function(req,res){
	User.findOne({name:req.session.username},function(err,users){
		if(err){
			console.log(err);
				return;
		}
 			//console.log(users);
 			res.send(users)
	})
}

	module.exports = BlogService;

