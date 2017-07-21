(function(){
var app=angular.module("HomePageView");

var ServiceController = function($scope,$location){
	  
    $scope.Profile=function(){
    	$location.path("/Subscription/Service");
  }
    $scope.changeColor=function(i){
    	$($(i.target.parentElement).find('img')[0]).attr("class","tileImage hovergallery");
    }
    
    $scope.deleteClass=function(i){
    	$($(i.target.parentElement).find('img')[0]).attr("class","tileImage");    	
    }
	
}
app.controller ("ServiceController" , ["$scope" , "$location" , ServiceController]);

}());

