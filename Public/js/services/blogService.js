app.service('httpService',function($http){
	this.post=function(url,data,cb,file){

    	var config={
    		header:{
    			'Content-Type' : 'application/json'
    		}
    	}
      if(file){
        var config={
          header:{
            'Content-Type': undefined
          }
        }
      }


    	console.log(data.get("file"),config,"--------------");
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