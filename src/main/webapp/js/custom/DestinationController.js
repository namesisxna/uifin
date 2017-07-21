(function(){
var app=angular.module("HomePageView");

var DestinationController = function($scope,$location){
	  
    $scope.Profile=function(){
    	$location.path("/Subscription/Destination");
  }
    $scope.changeColor=function(i){
    	$($(i.target.parentElement).find('img')[0]).attr("class","tileImage hovergallery");
    }
    
    $scope.deleteClass=function(i){
    	$($(i.target.parentElement).find('img')[0]).attr("class","tileImage");    	
    }
	
}
app.controller ("DestinationController" , ["$scope" , "$location" , DestinationController]);

}());

