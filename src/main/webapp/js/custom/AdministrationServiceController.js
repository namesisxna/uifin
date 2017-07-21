(function(){
var app=angular.module("HomePageView");

var AdministrationServiceController = function($scope,$location){
	  
    $scope.Errors=function(){
    	$location.path("/AdministrationService");
  }
   
}
app.controller ("AdministrationServiceController" , ["$scope" , "$location" , AdministrationServiceController]);

}());

