(function(){
var app=angular.module("HomePageView");

var TransportInfoServiceController = function($scope,$location){
	  
    $scope.Errors=function(){
    	$location.path("/TransportInfoService");
  }
   
}
app.controller ("TransportInfoServiceController" , ["$scope" , "$location" , TransportInfoServiceController]);

}());