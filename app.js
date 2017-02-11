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
router.use(function (req, res, next) {
// console.log('Time:', Date.now())
  next()
})
app.use('/', router);


// router.get('/getPage', function(req,res){
// 	console.log('get page route called!')
// } );
// router.get('/addUser', function(req,res){
// 	console.log('add user route called!')
// } );
var blogrouter = require('./core/routes/BlogsRoutes.js')

app.use('/blogs',blogrouter);







// var multer  = require('multer')
// var storage = multer.diskStorage({
//    destination: function(req, file, cb) {
//        cb(null, './core/uploads/')
//    },
//    filename: function(req, file, cb) {
//        cb(null, req.session.username+".jpg")
//    }
// })

// var upload = multer({ storage: storage })

// app.post('/profile/uploadImage',upload.single('file'),function(req,res){
// 	console.log(upload);
// 	//sconsole.log(req.file)

// })
var profilerouter =require('./core/routes/ProfileRoutes.js')


app.use('/profile', profilerouter);



app.listen(3000, '0.0.0.0', function () {
  console.log('Example app listening on port 3000!')
})