app.controller("adminCntrl", ['$scope','$http','$routeParams','httpService',
  function($scope,$http, $routeParamhttpService, httpService) {

    $scope.blog = {};
    $scope.blogDetail=[];
    $scope.userName = "";
    $scope.blogTypes = {};
        
  $scope.getUserName = function(){
    var url="/getUsersName"
    httpService.get(url,function(err,data){
          if(err){
            console.log("err");
            return;
          }
            $scope.userName = data;
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
   
  $scope.ArrayOfBlogTypes = function(){
      var url="/fetchAllTypes";
      httpService.get(url,function(err,data){
        if(err){
          console.log("err");
          return;
        }
        $scope.blogTypes = data;
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

    $scope.getPendingBlogs = function(val){
      var url="/fetchPendingBlogs";
      var data = {"status":val};
      httpService.post(url,data,function(err,data){
        if (err) {
          console.log("error");
          return;
        }
        $scope.blogDetail = data;
      })
    }
  
    $scope.deleteBlog = function(val){
    	var url="/deleteBlogDB";
    	var data={ "blog_id":val};
    	httpService.post(url,data,function(err,data){
        if(err){
          console.log("err");
          return;
        }
          $scope.blogDetail = data;
      });
    }


    $scope.updateStatus = function(val1,val2){      	
    	var url="/updateBlogDB";
    	var data={ "blog_id" : val2,
    			   "blog_status" : val1 };
    	
    	httpService.post(url,data,function(err,data){
        if(err){
          console.log("err");
          return;
        }
          $scope.blogDetail = data;
      });
    }


  $scope.addBlogType = function(){
    var url="/updateBlogTypeDB";
	  var data=$scope.blog
	 httpService.post(url,data,function(err,data){
    if(err){
      console.log("error");
      return;
    }
      $scope.ArrayOfBlogTypes();
   });
  }

}]);