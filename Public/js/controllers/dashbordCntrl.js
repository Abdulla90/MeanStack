app.controller("dashbordCntrl", ['$scope','$http','$routeParams','httpService',
  function($scope,$http, $routeParamhttpService, httpService) {
    $scope.blog = {};
    $scope.blogDetail=[];
    $scope.blogTypes = {};

    $scope.userName = "";

     $scope.getUserName = function(){
      url="/getUsersName";
      httpService.get(url,function(err,data){
        if(err){
          console.log("error");
          return;
        }
        $scope.userName = data;
      })
    }

   $scope.ArrayOfBlogTypes = function(){
      var url="/fetchAllTypes";
      httpService.get(url,function(err,data){
        if(err){
          console.log("err");
          return;
        }
        $scope.blogTypes = data;
        console.log($scope.blogTypes);
    });
  }

     $scope.getAllBlogs=function(){
      var url="/fetchBlogsData"
      httpService.get(url,function(err,data){
        if (err){
          console.log("err");
          return;
        }
        $scope.blogDetail = data;
      });
    }


   $scope.ArrayOfBlogTypes();
    $scope.getAllBlogs();
    $scope.getUserName();
   
    $scope.addBlog=function(){
      var url="/addBlogDataToServer";
      var data=$scope.blog
      httpService.post(url,data, function(err,data){
        if(err){
          console.log("err");
          return;
        }
         $scope.blogDetail = data;
      });
    }

   $scope.foodBlogs = function(val){
      var url="/fetchTypeBlogsData";
      var data = {"type":val};
      $http.post(url,data,function(err,data){
        if(err){
          console.log("err");
        }
        $scope.blogDetail = data;
      })
    }
    

}]);