(function(){
var app=angular.module("HomePageView");

var AboutUsController = function($scope,$location){
	  
    $scope.AboutUs=function(){
    	$location.path("/AboutUs");
  }
	
}
app.controller ("AboutUsController" , ["$scope" , "$location" , AboutUsController]);

}());

