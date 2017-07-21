(function(){
var app=angular.module("HomePageView");

var FlowController = function($scope,$location){
	  
    $scope.Profile=function(){
    	$location.path("/Subscription/Flow");
  }
    $scope.changeColor=function(i){
    	$($(i.target.parentElement).find('img')[0]).attr("class","tileImage hovergallery");
    }
    
    $scope.deleteClass=function(i){
    	$($(i.target.parentElement).find('img')[0]).attr("class","tileImage");    	
    }
	
}
app.controller ("FlowController" , ["$scope" , "$location" , FlowController]);

}());

