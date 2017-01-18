app.controller("dashbordCntrl", function($scope,$http) {
    $scope.blog = {};
    $scope.blogDetail=[];
    $scope.userObj = {};
    $scope.userName = "";
    $scope.getAllBlogs=function(){
      $http.get('/fetchBlogsData')
      .success(function (data , status, header, config ){
        $scope.blogDetail = data;
        /*$scope.userObj = $scope.blogDetail[0];
        $scope.userName= $scope.userObj.name;
        console.log($scope.userObj);
         console.log($scope.userName);*/
        console.log(data);
       })
       .error(function(data , status, header,config){
        console.log(data);
       })

    }
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

      console.log(val);
      var type =  val
       console.log(type);
      var url="/fetchTypeBlogsData";
      var data = { type };
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

});