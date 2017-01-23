app.controller("adminCntrl", ['$scope','$http','$routeParams',function($scope,$http, $routeParams) {

 $scope.blog = {};
    $scope.blogDetail=[];
    $scope.userObj = {};
    $scope.userName = "";
     $scope.getSessionName = function(){
      $http.get('/getUsersName')
      .success(function(data, status, header, config){
        $scope.userName = data;
        console.log(data);
      })
      .error(function(data, status,header,config){
        console.log(data);
      })
    }
    $scope.getAllBlogs=function(){
      $http.get('/fetchBlogsData')
      .success(function (data , status, header, config ){
       $scope.blogDetail = data;
        console.log("$scope.blogDetail" , $scope.blogDetail);
       })
       .error(function(data , status, header,config){
        console.log(data);
       })

    }
   
    $scope.getAllBlogs();
    $scope.getSessionName();
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

    $scope.foodBlogs = function(val){
      var url="/fetchTypeBlogsData";
      var data = {"type":val};
      var config={
        header:{
          'Content-Type' : 'application/json'
        }
      }
      console.log(data);
      $http.post(url,data,config)
      .success(function (data , status, header, config ){
        $scope.blogDetail = data;
        console.log(data);
       })
       .error(function(data , status, header, config){
        console.log(data);
       })
    }
    $scope.deleteBlog = function(val){
    	var url="/deleteBlogDB";
    	var data={ "blog_id":val};
    	var config={
    		header:{
    			'Content-Type' : 'application/json'
    		}
    	}
    	$http.post(url,data,config)
    	.success(function(data,status,header,config){
    		console.log(data);
    		$scope.blogDetail = data;
    		//$scope.getAllBlogs();
    		//console.log(data);
		})
    	.error(function(data,status,header,config){
    		console.log
    	})
    }


}]);