var app=angular.module("HomePageView");
var isDlgOpen;
var ProfileController = function($scope,$location,srvShareData,$mdDialog,ngClipboard,$mdToast){
	 $scope.sharedDatatemp = srvShareData.getData();
	 $scope.sharedData = $scope.sharedDatatemp[$scope.sharedDatatemp.length - 1];
	 $scope.showCustomToast = function() {
        $mdToast.show({
          hideDelay   : 500,
          position    : 'top right',
          controller  : 'ToastCtrl',
          template : '<md-toast>'+
					'<span class="md-toast-text" flex>Token copied to clipboard</span>'+
					'<md-button ng-click="closeToast()">'+
						'Close'+
					'</md-button>'+
					'</md-toast>'
        });
      };
	 $scope.toClipboard = ngClipboard.toClipboard;
	 
	 $scope.showValue = function() {
    $mdDialog.show({
                  clickOutsideToClose: true,
                  scope: $scope,        
                  preserveScope: true,           
                  template: '<md-dialog class="accessTokenWrap" aria-label="Access Token Details">'+
  '<form ng-cloak>'+
    '<md-toolbar>'+
      '<div class="md-toolbar-tools">'+
	  '<span font size="3" >Access Token Details</span>'+
        '<span flex></span>'+
        '<md-button class="md-icon-button" ng-click="cancel()">'+
          
        '</md-button>'+
      '</div>'+
    '</md-toolbar>'+

    '<md-dialog-content>'+
      '<div class="md-dialog-content">'+
	  '<md-content class="md-padding">'+
	  '<md-list-item class="md-2-line">'+
        '<div class="md-list-item-text" layout="column"><p class="accessTokenFontSize" >Access Token</p>'+
       ' <p class="tokenWord"> {{sharedData.accessCredentials.apiToken}}</p></div>'+
	   '<br>'+
			'<md-button class="md-fab md-fab-bottom-right md-accent md-hue-2" ng-click="toClipboard(sharedData.accessCredentials.apiToken);'+'showCustomToast()"'+ 
			'aria-label="copy accesstoken"> '+
			'<md-icon md-svg-icon="../cloudConnectorUI/img/icons/copy.svg"></md-icon>'	+
			'<md-tooltip md-direction="bottom">copy to clipboard</md-tooltip>'+
	   '</md-list-item>'+
	   '</md-content>'+
	   '<br>'+
	   '<md-content class="md-padding">'+
	   '<md-list-item class="md-2-line">'+
        '<div class="md-list-item-text"><p class="accessTokenFontSize">Refresh Token</p>'+
       ' <p class="tokenWord"> {{sharedData.accessCredentials.refreshToken}}</p></div>'+
	   '<br>'+
			'<md-button class="md-fab md-fab-bottom-right md-accent md-hue-2" ng-click="toClipboard(sharedData.accessCredentials.refreshToken);'+
			'showCustomToast()"'+ 
			'aria-label="copy accesstoken"> '+
			'<md-icon md-svg-icon="../cloudConnectorUI/img/icons/copy.svg"></md-icon>'	+
			'<md-tooltip md-direction="bottom">copy to clipboard</md-tooltip>'+
	 '</md-list-item>'+
	 '</md-content>'+
    '</md-dialog-content>'+
  '</form>'+
'</md-dialog>',
                  controller: function DialogController($scope, $mdDialog) {
                     $scope.closeDialog = function() {
                        $mdDialog.hide();
                     }
                  }
               });
  };

  
  	 $scope.showForm = function() {
    $mdDialog.show({
                  clickOutsideToClose: true,
                  scope: $scope,        
                  preserveScope: true,           
                  template: '<md-dialog aria-label="Change Password">'+
  '<form ng-cloak>'+
    '<md-toolbar>'+
      '<div class="md-toolbar-tools">'+
	  '<span font size="3" >Change Password</span>'+
        '<span flex></span>'+
	  '<md-button class="md-icon-button" ng-click="cancel()">'+
         '<md-icon md-svg-src="img/icons/ic_close_24px.svg" aria-label="Close dialog"></md-icon>'+
        '</md-button>'+
      '</div>'+
    '</md-toolbar>'+

    '<md-dialog-content>'+
      '<div class="md-dialog-content">'+
        '<div><label for="curpass">Current Password*:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="password" ng-model="curpass"></div>'+
	   '<br>'+
        '<div><label for="newpass">New Password*:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="password" ng-model="newpass"></div>'+
		'<br>'+
        '<div><label for="cnfpass">Confirm Password*:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="password" ng-model="cnfpass"></div>'+
     ' </div>'+
    '</md-dialog-content>'+
	
	'<md-dialog-actions layout="row">'+
     '<md-button ng-click="answer()">Submit'+
      '</md-button>'+
	  '</md-dialog-actions>'+
  '</form>'+
'</md-dialog>',
                  controller: function DialogController($scope, $mdDialog) {
                     $scope.cancel = function() {
      $mdDialog.cancel();
    };
                  }
               });
  };
  
  
  
	 
}

app.controller ("ProfileController" ,  ProfileController);
app.controller('ToastCtrl', function($scope, $mdToast, $mdDialog) {
	var isDlgOpen;
      $scope.closeToast = function() {
	 
        if (isDlgOpen) return;

        $mdToast
          .hide()
          .then(function() {
            isDlgOpen = false;
          });
          
      };

      
    });

