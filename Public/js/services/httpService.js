app.service('httpService',function($http){
	this.post=function(url,data,cb){

    	var config={
    		header:{
    			'Content-Type' : 'application/json'
    		}
    	} 
        console.log(url)
      console.log(data)
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

this.postFile =function(url,fd,cb){
  var config = {
        headers : {
        'Content-Type' : undefined
       }
  }
  $http.post(url, fd, config)
 .success(function(data, status, header, config) {
    console.log(data);
    cb(null,data);
  })
 .error(function(data, status, header, config) {
  console.log(data);
  cb(data)
 });

}
});
