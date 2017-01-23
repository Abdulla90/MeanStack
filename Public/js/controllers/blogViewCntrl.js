app.controller("blogViewCntrl", ['$scope','$http','$routeParams',function($scope,$http, $routeParams) {

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
 		 $scope.getSessionName();
	console.log($routeParams.id);
	$scope.blogDetail = {};
	$scope.blogcommentdata = {};
	 $scope.viewBlogs =function(){
	 	var url="/viewsTypeBlogsData";
    	var data={id:$routeParams.id};
    	var config={
    		header:{
    			'Content-Type' : 'application/json'
    		}
    	}
    	console.log(data);
       $http.post(url,data,config)
       .success(function (data , status, header, config ){
        $scope.blogcommentdata = data;
        
       	console.log(data);
       })
       .error(function(data , status, header,config){
       	console.log(data);
       })
   }
	 $scope.viewBlogs();

	 $scope.addcomment = function(){
	 	var url="/addCommentToSchema";

	 	console.log($scope.blogDetail);
	 	var data={
	 		 id:$scope.blogcommentdata.data1._id,
	 		 comments:$scope.blogDetail.comments
	 	}
			var config={
	 		header:{
	 			'Content-Type' : 'application/json'
			}
	 	}
	 	
	 	$http.post(url,data,config)
	 	.success(function(data,status,header,config){
	 		$scope.viewBlogs();
	 		console.log(data);
	 	})
	 	.error(function(data , status, header,config){
       	console.log(data);
       })
	 }




}]);