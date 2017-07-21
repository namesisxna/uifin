(function(){
var app=angular.module("HomePageView");

var MessageBroadcastServiceController = function($scope,$location){
	  
    $scope.Errors=function(){
    	$location.path("/MessageBroadcastService");
  }
   
}
app.controller ("MessageBroadcastServiceController" , ["$scope" , "$location" , MessageBroadcastServiceController]);

}());