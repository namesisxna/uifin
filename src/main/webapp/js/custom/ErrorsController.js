(function(){
var app=angular.module("HomePageView");

var ErrorController = function($scope,$location){
	  
    $scope.Error=function(){
    	$location.path("/Errors");
  }
	
}
app.controller ("ErrorController" , ["$scope" , "$location" , ErrorController]);

}());

