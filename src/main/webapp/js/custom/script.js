angular.module('testApp',['ngClipboard'])
  .controller('testController',function($scope,ngClipboard){
    $scope.toClipboard = ngClipboard.toClipboard;

    
  });
