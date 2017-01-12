var express = require('express')

var app = express()
var path = require("path");
var bodyParser = require('body-parser');
var session = require('express-session')
var LoginService = require('./core/services/loginService');
app.use(bodyParser.urlencoded({ extended: true })); //body parser 
app.use(express.static(__dirname + '/public'));
app.use(session({resave:true, saveUninitialized:true, secret: 'ssshhhhh'}));//initialing a session 
var sess;
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

app.post('/NewRegister', function(req,res)
{
	LoginService.NewRegister(req,res);
})

app.get('/blogs', function(req,res)
{
	res.sendFile(path.join(__dirname + '/public/blogs.html'));

})

app.get('/logout',function(req,res)
{
	req.session.destroy(function(err){
		if(err) {
            console.log(err);
        } else {
            res.send('successfully logged out');
	    }
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})