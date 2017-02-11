app.controller("dashbordCntrl", ['$scope','$http','$routeParams','httpService',
  function($scope,$http, $routeParamhttpService, httpService) {
    $scope.blog = {};
    $scope.blogDetail=[];
    $scope.blogTypes = {};
    $scope.searchBlog = "";
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

   $scope.ArrayOfBlogTypes = function(){
      var url="/blogs/fetchAllTypes";
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
      var url="/blogs/fetchBlogsData"
      httpService.get(url,function(err,data){
        if (err){
          console.log("err");
          return;
        }
        $scope.blogDetail = data;
        console.log(data);
      });
    }


   $scope.ArrayOfBlogTypes();
    $scope.getAllBlogs();
    $scope.getUserName();
   
    $scope.addBlog=function(){
      var url="/blogs/addBlogDataToServer";
      var data=$scope.blog
      httpService.post(url,data, function(err,data){
        if(err){
          console.log("err");
          return;
        }
         $scope.blogDetail = data;
          $scope.getAllBlogs();
      });
    }

   $scope.fetchTypeBlogs = function(val){
      var url="/blogs/fetchTypeBlogsData";
      var data = {"blogTypeID":val};
      httpService.post(url,data,function(err,data){
        if(err){
          console.log("err");
        }else
        $scope.blogDetail = data;
      
      })
    }
    
$scope.funcSearchBlog = function(){
  var url = "/blogs/searchBlogByTitle"
  var data = {
    'blogsTitle' :$scope.searchBlog
  }

  console.log(data);
 httpService.post(url,data,function(err,data){
        if(err){
          console.log(err);
        }else
        $scope.blogDetail = data;
      
      })
}
}]);