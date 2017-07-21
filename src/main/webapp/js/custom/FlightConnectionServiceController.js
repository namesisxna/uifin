(function(){
var app=angular.module("HomePageView");

var FlightConnectionServiceController = function($scope,$location){
	  
    $scope.Errors=function(){
    	$location.path("/FlightConnectionService");
  }
   
}
app.controller ("FlightConnectionServiceController" , ["$scope" , "$location" , FlightConnectionServiceController]);

}());