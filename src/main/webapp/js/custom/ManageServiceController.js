(function(){
var app=angular.module("HomePageView");

var ManageServiceController = function($scope,$location){
	  
    $scope.Profile=function(){
    	$location.path("/Profile");
  }
	
}
app.controller ("ManageServiceController" , ["$scope" , "$location" , ManageServiceController]);

}());

