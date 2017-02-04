var express = require('express')
var Blogrouter = express.Router();
var path = require("path");
var BlogService = require('../services/BlogService')

Blogrouter.use(function(req,res,next){
	if (!req.session.username){
		res.redirect('/');
		res.end();
	}
	next();
})

Blogrouter.get('/',function(req,res){
	//console.log("Inside '/' ");
	res.sendFile('blogs.html',{ root: path.join(__dirname, '../../public/views') });

});

Blogrouter.get('/fetchBlogsData',BlogService.fetchBlog)

Blogrouter.get('/fetchAllTypes',BlogService.fetchTypes)

Blogrouter.get('/getUsersName',function(req,res){
	res.send(req.session.username)
});

Blogrouter.post('/addBlogDataToServer',BlogService.uploadBlog)

Blogrouter.post('/fetchTypeBlogsData',BlogService.fetchTypeBlog)

Blogrouter.post('/fetchPendingBlogs',BlogService.fetchPendingData)

Blogrouter.post('/viewsTypeBlogsData',BlogService.blogscomments)

Blogrouter.post('/addCommentToSchema',BlogService.addblogComments)

Blogrouter.get('/logout',function(req,res)
{
	req.session.destroy(function(err){
		if(err) {
            console.log(err);
        } else {
        	res.redirect('/')
	    }
	});

})

Blogrouter.post('/deleteBlogDB',BlogService.FuncdeleteBlog)

Blogrouter.post('/updateBlogDB',BlogService.FuncUpateStatusBlog)

Blogrouter.post('/updateBlogTypeDB',BlogService.FuncUpdateBlogType)

Blogrouter.get('/getUsersDetail',BlogService.FuncGetUsersDetail)

module.exports = Blogrouter;
