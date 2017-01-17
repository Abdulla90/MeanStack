app.controller("dashbordCntrl", function($scope,$http) {
    $scope.blog = {};
    $scope.addBlog=function(){
    	console.log($scope.blog);
    	// use $.param jQuery function to serialize data from JSON 
    	var url="/addBlogDataToServer";
    	var data=$scope.blog
    	var config={
    		header:{
    			'Content-Type' : 'appliaction/json'
    		}
    	}
       $http.post(url,data,config)
       .success(function (data , status, header, config ){
       	console.log(data);
       })
       .error(function(data , status, header,config){
       	console.log(data);
       })

    }
});