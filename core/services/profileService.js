var express = require('express')
var app = express()
var User = require('../database/schema/userSchema')
var ProfileService = {}

var multer  = require('multer');



	var storage = multer.diskStorage({
   destination: function(req, file, cb) {
       cb(null, './public/img/')
   },filename: function(req, file, cb) {
       cb(null, file.originalname)}
       /*rename:function(fieldname,filename,cb){
        cb(null,fieldname);*/

      /* }*/
})
	

var upload = multer({ storage: storage }).single('file');
	 
ProfileService.uploadImage = function(req, res) {
        upload(req,res,function(err) {
        	if(err){

               console.log(err);
        	}else{
        		console.log(req.file);
        		res.send(req.file);
        	}

                
       });
        	
  };

ProfileService.uploadUsersDetail = function(req,res){
  console.log(req.body,"--------------------req body");
      User.update({username:req.body.username}, 
            {$set: {
                      username:req.body.username,
                      email:req.body.email,
                      firstname:req.body.firstname,
                      lastname:req.body.lastname,
                      company:req.body.company,
                      imagename:req.body.imageName
                   }},function(err, user){

            if(err){
              console.log(err);
              return;
            }
            res.send(user)
          });    
}



module.exports = ProfileService;

