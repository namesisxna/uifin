(function(){
var app=angular.module("HomePageView");

var AirportInfoServiceController = function($scope,$location){
	  
    $scope.Errors=function(){
    	$location.path("/AirportInfoService");
  }
   
}
app.controller ("AirportInfoServiceController" , ["$scope" , "$location" , AirportInfoServiceController]);

}());