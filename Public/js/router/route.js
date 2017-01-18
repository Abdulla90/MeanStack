app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "../../templates/dashbord.html",
        controller:"dashbordCntrl"
    })
    .when("/profile", {
        templateUrl : "../../templates/profile.html"	
        //controller:"dashbordCntrl"
        //template:'profile psgr'
    })

    .when("/contact",{
    	templateUrl : "../../templates/contact.html"
    })

    .when("/food",{
        templateUrl : "../../templates/food.html",
        controller:"foodCntrl"
    })
});