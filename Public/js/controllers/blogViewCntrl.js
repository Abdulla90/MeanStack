app.controller("blogViewCntrl", ['$scope','$http','$routeParams','httpService',function($scope,$http, $routeParams,httpService) {
	
	$scope.getUserDetail = function(){
	 	var url="/getUsersName";
		httpService.get(url,function(err,data){
	      	if(err){
	      		console.log("err");
	      		return;
	      	}
	      	  $scope.userName = data;
	      });
    }


 	$scope.getUserDetail();
	$scope.blogDetail = {};
	$scope.blogcommentdata = {};
	$scope.getBlogsById =function(){
	 	var url="/viewsTypeBlogsData";
	    var data={id:$routeParams.id};
		httpService.post(url,data,function(err,data){
			if(err){
				console.log("err!!!!");
				return;
			}
			$scope.blogcommentdata = data;
		});
    }
	$scope.getBlogsById();

	 $scope.addcomment = function(){
	 	var url="/addCommentToSchema";
	 	var data={
	 		 id:$scope.blogcommentdata.data1._id,
	 		 comments:$scope.blogDetail.comments
	 	}
	 	httpService.post(url,data,function(err,data){
			if(err){
				console.log("err!!!!");
				return;
			}
			$scope.getBlogsById();
		});
		
	 }




}]);