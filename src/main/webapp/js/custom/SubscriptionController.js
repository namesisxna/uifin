(function(){
var app=angular.module("HomePageView");

var SubscriptionController = function($scope,$location){
	  
    $scope.Profile=function(){
    	$location.path("/Subscription");
  }
    
    $scope.changeColor=function(i){
    	$($(i.target.parentElement).find('img')[0]).attr("class","tileImage hovergallery");
    }
    
    $scope.deleteClass=function(i){
    	$($(i.target.parentElement).find('img')[0]).attr("class","tileImage");    	
    }
	
}
app.controller ("SubscriptionController" , ["$scope" , "$location" , SubscriptionController]);

}());

