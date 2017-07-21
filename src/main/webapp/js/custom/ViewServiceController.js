(function(){
var app=angular.module("HomePageView");

var ViewServiceController = function($scope,$location){
	  
    $scope.Errors=function(){
    	$location.path("/ViewService");
  }
   
}

app.controller ("ViewServiceController" , ["$scope" , "$location" , ViewServiceController]);

}());

