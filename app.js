var express = require('express')
var app = express()
var path = require("path");
var bodyParser = require('body-parser');
var session = require('express-session')

/*var BlogService = require('./core/services/BlogService')*/
app.use(bodyParser.urlencoded({ extended: true })); //body parser 
app.use(express.static(__dirname + '/public'));
app.use(session({resave:true, saveUninitialized:true, secret: 'ssshhhhh'}));//initialing a session 
app.use(bodyParser.json());

// app.get('/',function(req,res){
// 	LoginService.sessionValidation(req,res);
// 	//LoginService.firstPageRendering(req,res);
// });

var router=require('./core/routes/UserRoutes.js')
/*router.use(function (req, res, next) {
 // console.log('Time:', Date.now())
  next()
})*/
app.use('/', router);


// router.get('/getPage', function(req,res){
// 	console.log('get page route called!')
// } );
// router.get('/addUser', function(req,res){
// 	console.log('add user route called!')
// } );
var blogrouter = require('./core/routes/BlogsRoutes.js')

app.use('/blogs',blogrouter);
var multer  = require('multer')
var storage = multer.diskStorage({
   destination: function(req, file, cb) {
       cb(null, './core/uploads/')
   },
   filename: function(req, file, cb) {
       cb(null, req.session.username+".jpg")
   }
})

var upload = multer({ storage: storage })
app.post('/profile/uploadImage',upload.single('file'),function(req,res){
	console.log(req.file)

})

/*app.get('/blogs/', function(req,res){
	if (!req.session.username){
		res.redirect('/');
		//res.end();
	}
	else
		//res.sendFile('blogs.html',{ root: path.join(__dirname, '../../public/views/') });
	res.sendFile(path.join(__dirname,'/public/views/blogs.html'))
})*/

/*app.get('/fetchBlogsData',function(req,res){
		//console.log(req.body)
		//console.log("inside fetchBlogsData")
		BlogService.fetchBlog(req,res);
})*/

/*app.get('/fetchAllTypes',function(req,res){
	BlogService.fetchTypes(req,res);
})*/

/*app.get('/getUsersName', function(req,res){
	res.send(req.session.username)
})*/
/*app.post('/addBlogDataToServer',function(req,res){
	//console.log(req.body);
	
	BlogService.uploadBlog(req,res);
	//res.send(req.body)
})

app.post('/fetchTypeBlogsData',function(req,res){
		//console.log(req.data);
		console.log("fetchTypeBlogsData");
		//res.send("null")
		BlogService.fetchTypeBlog(req,res);
})

app.post('/fetchPendingBlogs',function(req,res){
		//console.log(req.data);
		//console.log("fetchBlogsData");
		//res.send("null")
		BlogService.fetchPendingData(req,res);
})

app.post('/viewsTypeBlogsData', function(req,res){
	console.log(req.body);
	//BlogService.updateBlog(req,res);
	//res.send(req.body)
	BlogService.blogscomments(req,res);
})

app.post('/addCommentToSchema',function(req,res){
	//console.log(req.body);
	BlogService.addblogComments(req,res);
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


app.post('/deleteBlogDB',function(req,res)
{
	//	console.log(req.body.blog_id);
	BlogService.FuncdeleteBlog(req,res);
})
app.post('/updateBlogDB',function(req,res)
{
	//res.send(req.body)
	//	console.log(req.body.blog_id);
	BlogService.FuncUpateStatusBlog(req,res);
})

app.post('/updateBlogTypeDB',function(req,res)
{
	BlogService.FuncUpdateBlogType(req,res);
})*/

app.listen(3000, '0.0.0.0', function () {
  console.log('Example app listening on port 3000!')
})