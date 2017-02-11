app.controller("profileCntrl", ['$scope','$http','$routeParams','httpService',
  function($scope,$http, $routeParamhttpService, httpService) {
  	$scope.blog = {};
    $scope.UserDetail={};
    $scope.blogTypes = {};
    $scope.fileDetail = {};

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
  	  url="/blogs/getUsersDetail"  ;   
       httpService.get(url,function(err,data){
        if(err){
          console.log("error");
          return;
        }
        console.log(data)
        $scope.UserDetail = data;
      })

  }
$scope.getUserName();
$scope.UserDetail();

$scope.uploadUsersDetail = function(){
	url="/profile/uploadUsersDetailDB";
	var data = $scope.UserDetail;
  $scope.UserDetail.imageName = $scope.fileDetail.originalname;
	console.log(data)
  httpService.post(url,data,function(err,data){
    if(err){
      console.log(err);
      return;
    }
    else
      $scope.UserDetail = data;
      //console.log("success")
  })
}

$scope.onFileSelect=function(e){
	
	var url = "/profile/uploadImage"
	var fd = new FormData();
 	fd.append("file", e.files[0]);
 	console.log(fd.get("file"),e.files[0])
 	httpService.postFile(url,fd,function(err,data){
        if(err){
          console.log("error");
          return;
        }
        console.log(data)
        $scope.fileDetail=data;
    })
 }

/*$scope.image = function(imageName){

  var filename = imageName;
  $http({   
          method: 'GET', 
          url:'.././core/upload/' + filename,
       }).then(function(data){
                             $scope.imageUrl= data; // if you sure what data is you URL 
                       })

}*/


    }]);