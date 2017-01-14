var swig  = require('swig');
var path = require("path");

var swig_Template = {}

swig_Template.compileHtml = function(obj,cb){
	var template = swig.compileFile(obj.templateURL);
  	var output = template({
	    msg:obj.data.msg
	});
	if(!output){
		var err = new Error('Template compiling error!');
		return cb(err)
	}
	return cb(null,output);
	
}

swig_Template.pageRendering = function(obj,res){
	swig_Template.compileHtml(obj,function(err,data){
   	if(err){
   		console.log(err)
   		return;
   	}
   	res.send(data)
   })
}

module.exports = swig_Template;

