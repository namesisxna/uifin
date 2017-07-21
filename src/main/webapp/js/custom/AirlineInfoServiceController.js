(function(){
var app=angular.module("HomePageView");

var AirlineInfoServiceController = function($scope,$location){
	  
    $scope.Errors=function(){
    	$location.path("/AirlineInfoService");
  }
   
}
app.controller ("AirlineInfoServiceController" , ["$scope" , "$location" , AirlineInfoServiceController]);

}());
