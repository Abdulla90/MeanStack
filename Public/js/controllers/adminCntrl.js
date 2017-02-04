app.controller("adminCntrl", ['$scope','$http','$routeParams','httpService',
  function($scope,$http, $routeParamhttpService, httpService) {

    $scope.blog = {};
    $scope.blogDetail=[];
    $scope.userName = "";
    $scope.blogTypes = {};
        
  $scope.getUserName = function(){
    var url="/blogs/getUsersName"
    httpService.get(url,function(err,data){
          if(err){
            console.log("err");
            return;
          }
            $scope.userName = data;
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
      });
    }
   
  $scope.ArrayOfBlogTypes = function(){
      var url="/blogs/fetchAllTypes";
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
    	var url="/blogs/addBlogDataToServer";
    	var data=$scope.blog
    	httpService.post(url,data, function(err,data){
        if(err){
          console.log("err");
          return;
        }
         $scope.blogDetail = data;
      });
    }

    $scope.fetchTypeBlogs = function(val){
      var url="/blogs/fetchTypeBlogsData";
      var data = {"type":val};
      httpService.post(url,data,function(err,data){
        if(err){
          console.log("err");
        }
        $scope.blogDetail = data;
      })
    }

    $scope.getPendingBlogs = function(val){
      var url="/blogs/fetchPendingBlogs";
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
    	var url="/blogs/deleteBlogDB";
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
    	var url="/blogs/updateBlogDB";
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
    var url="/blogs/updateBlogTypeDB";
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