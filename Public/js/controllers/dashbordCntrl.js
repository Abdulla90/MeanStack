app.controller("dashbordCntrl", function($scope,$http) {
    $scope.blog = {};
    $scope.blogDetail=[];
    $scope.getAllBlogs=function(){
      $http.get('/fetchBlogsData')
      .success(function (data , status, header, config ){
        $scope.blogDetail = data;
        console.log(data);
       })
       .error(function(data , status, header,config){
        console.log(data);
       })

    }
    $scope.getAllBlogs();
    $scope.addBlog=function(){
    	console.log($scope.blog);
    	// use $.param jQuery function to serialize data from JSON 
    	var url="/addBlogDataToServer";
    	var data=$scope.blog
    	var config={
    		header:{
    			'Content-Type' : 'application/json'
    		}
    	}
       $http.post(url,data,config)
       .success(function (data , status, header, config ){
        $scope.blogDetail = data;
       	console.log(data);
       })
       .error(function(data , status, header,config){
       	console.log(data);
       })

    }

});