app.controller("profileCntrl", ['$scope','$http','$routeParams','httpService',
  function($scope,$http, $routeParamhttpService, httpService) {
  	$scope.blog = {};
    $scope.UserDetail={};
    $scope.blogTypes = {};

    $scope.userName = "";
 $scope.getUserName = function(){
      url="/blogs/getUsersName";
      httpService.get(url,function(err,data){
        if(err){
          console.log("error");
          return;
        }
        $scope.userName = data;
      })
    }


  $scope.UserDetail = function(){
  	  url="/blogs/getUsersDetail";
      httpService.get(url,function(err,data){
        if(err){
          console.log("error");
          return;
        }
        $scope.UserDetail = data;
      })

  }
$scope.getUserName();
$scope.UserDetail();

$scope.uploadUsersDetail = function(){
	url="/blogs/uploadUsersDetailDB";
	var data = $scope.UserDetail;
	console.log(data)
}

$scope.onFileSelect=function(e){
	
	var url = "/profile/uploadImage"
	var fd = new FormData();
 	fd.append("file", e.files[0]);
 	console.log(fd.get("file"),e.files[0])
 	// httpService.post(url,fd,function(err,data){
  //       if(err){
  //         console.log("error");
  //         return;
  //       }
  //       console.log(data)
  //   },true)



  	$http.post(url, fd, {
		   headers : {
		    'Content-Type' : undefined
		   }

 	})
 .success(function(data, status, header, config) {
  	console.log(data);
 	})
 .error(function(data, status, header, config) {
  console.log(data);
 });

}


    }]);