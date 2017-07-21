(function(){
var app=angular.module("HomePageView");

var FlightInfoServiceController = function($scope,$location){
	  
    $scope.Errors=function(){
    	$location.path("/FlightInfoService");
  }
   
}
app.controller ("FlightInfoServiceController" , ["$scope" , "$location" , FlightInfoServiceController]);

}());

