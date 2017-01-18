var express = require('express')
var app = express()
var path = require("path");
var bodyParser = require('body-parser');
var session = require('express-session')
var LoginService = require('./core/services/loginService');
var BlogService = require('./core/services/BlogService')
app.use(bodyParser.urlencoded({ extended: true })); //body parser 
app.use(express.static(__dirname + '/public'));
app.use(session({resave:true, saveUninitialized:true, secret: 'ssshhhhh'}));//initialing a session 
app.use(bodyParser.json());

app.get('/',function(req,res){
	LoginService.sessionValidation(req,res);
	//LoginService.firstPageRendering(req,res);
});


app.post('/login',function(req,res){
	LoginService.login(req,res);
})

app.get('/register',function(req,res)
{
	//res.sendFile(path.join(__dirname + '/Public/Register.html'));
	LoginService.register(req,res);
})


app.post('/register', function(req,res)
{
	LoginService.NewRegister(req,res);
})

app.get('/blogs/', function(req,res)
{
	if (req.session.username){
		res.sendFile(path.join(__dirname + '/public/views/blogs.html'));
	}
	else{
		res.redirect('/');
	}


})
app.get('/fetchBlogsData',function(req,res){
		//console.log(req.body)
		//console.log("inside fetchBlogsData")
		BlogService.fetchBlog(req,res);
})

app.get('/getUsersName', function(req,res){
	res.send(req.session.username)
})
app.post('/addBlogDataToServer',function(req,res){
	//console.log(req)
	
	BlogService.uploadBlog(req,res);
	//res.send(req.body)
})

app.post('/fetchTypeBlogsData',function(req,res){
		//console.log(req.data);
		console.log("fetchTypeBlogsData");
		//res.send("null")
		BlogService.fetchTypeBlog(req,res);
})


app.get('/logout',function(req,res)
{
	req.session.destroy(function(err){
		if(err) {
            console.log(err);
        } else {
        	res.redirect('/')
	    }
	});

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})