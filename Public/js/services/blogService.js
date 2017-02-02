app.service('httpService',function($http){
	this.post=function(url,data,cb){
    	var config={
    		header:{
    			'Content-Type' : 'application/json'
    		}
    	}
    	console.log(data);
       $http.post(url,data,config)
       .success(function (data , status, header, config ){
        cb(null,data);
       })
       .error(function(data , status, header,config){
       	cb("server error");
       })
	}

	this.get = function(url,cb){
		$http.get(url)
		.success(function(data,status,header,config){
			cb(null,data);
		})
		.error(function(data,status,header,config){
			cb("server error");
		})
	}


})