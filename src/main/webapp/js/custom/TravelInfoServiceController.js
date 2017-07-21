(function(){
var app=angular.module("HomePageView");

var TravelInfoServiceController = function($scope,$location){
	  
    $scope.Errors=function(){
    	$location.path("/TravelInfoService");
  }
   
}
app.controller ("TravelInfoServiceController" , ["$scope" , "$location" , TravelInfoServiceController]);

}());