(function(){
var app=angular.module("HomePageView");

var WeatherInfoServiceController = function($scope,$location){
	  
    $scope.Errors=function(){
    	$location.path("/WeatherInfoService");
  }
   
}
app.controller ("WeatherInfoServiceController" , ["$scope" , "$location" , WeatherInfoServiceController]);

}());