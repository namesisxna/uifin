var app=angular.module("HomePageView");
var UserController = function($scope,userData,$httpParamSerializerJQLike, srvShareData,$http,$location,$mdDialog,ngClipboard,$mdToast){
    $scope.ManageUsers=function(){
    	$location.path("/ManageUsers");
  }
  $scope.renewRefreshDialogFlag=true;
   $scope.renewPasswordDialogFlag=true;
  $scope.users = ['Sumit', 'Subrata'];
  $scope.$watch('userAll', function () {console.log("watcher called")});
 
 
  
   $scope.showAlert = function(ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .textContent('You can specify some description text in here.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  }; 
  $scope.showCustomToast = function() {
	
        $mdToast.show({
          hideDelay   : 500,
          position    : 'top right',
          controller  : function($scope, $mdToast){
		$scope.message="Token copied to clipboard";
	  },
          template : '<md-toast>'+
					'<span class="md-toast-text" flex>{{message}}</span>'+
					'<md-button ng-click="closeToast()">'+
						'Close'+
					'</md-button>'+
					'</md-toast>'
        });
      };
	  $scope.showCustomToast1 = function() {
		console.log("toast called")
        $mdToast.show({
          hideDelay   : 2000,
          position    : 'top right',
          controller  : function($scope, $mdToast){
		$scope.message="Password Expiry Time renewed Successfully.";
	  },
          template : '<md-toast>'+
					'<span class="md-toast-text" flex>{{message}}</span>'+
					'<md-button ng-click="closeToast()">'+
						'Close'+
					'</md-button>'+
					'</md-toast>'
        });
      };
	  $scope.showCustomToast2 = function() {
		console.log("toast called")
        $mdToast.show({
          hideDelay   : 10000,
          position    : 'top right',
          controller  : function($scope, $mdToast){
		$scope.message="User unlocked.";
	  },
          template : '<md-toast>'+
					'<span class="md-toast-text" flex>{{message}}</span>'+
					'<md-button ng-click="closeToast()">'+
						'Close'+
					'</md-button>'+
					'</md-toast>'
        });
      };
	 
	  $scope.toClipboard = ngClipboard.toClipboard;
  
	  
   	$scope.userAll = userData.getData1().users;
	  	$scope.selectedUserId=null;
	  	$scope.selecteddomain=null;
	  	$scope.sharedDatatemp = srvShareData.getData();
		$scope.sharedData = $scope.sharedDatatemp[$scope.sharedDatatemp.length - 1];
		$scope.sharedData1=null;
		
		 $scope.item = {
    'salesStatus' : 'old'
  };
	  	
	  	
	  	$scope.testclick = function(value){
	  		$scope.selectedvalue = value;
	  		//alert(value);
	  		
	  	};
		
	  	$scope.resetPassword = function(value,ev){
	  		console.log("restecalled");
			$scope.user = value;
	  		 sharedData1 =  $scope.sharedData;
		  		accessToken=sharedData1.accessCredentials.apiToken;
		  		console.log(accessToken);
		  		console.log(sharedData1.accessCredentials.securityDomain);
		  		console.log($scope.selectedvalue);
		  		$http({
	  				method : 'POST',
	  				url : "http://10.227.85.208:8089/rest1/cc-console/home/resetPassword",
	  				data : $.param({
	  					
	  					accessToken: accessToken,
	  					securityDomain:sharedData1.accessCredentials.securityDomain,
	  					userId:$scope.user.userId
	  					
	  	               
	  	            }),
	  				
	  				headers : {
	  					'Content-Type' : 'application/x-www-form-urlencoded'
	  				}
	  			}).then(
	  				       function(response1){
	  				    	  
	  				    	   
							   var response =response1.data;
							   console.log(response);
							   $scope.resetPassWordSucessDialog(response);
					
	  				    	  
	  				           // success callback
	  				         }, 
	  				         function(response){
	  				           // failure callback
	  				         }
	  				      );
	  		
	  	};
	  	
	  	
		
		$scope.resetPasswordExpTime = function(){
			$scope.requestObj=$scope.renewPassDialogObj;
			securityDomain=$scope.requestObj.securityDomain;
			userId = $scope.requestObj.userId;
			
			switch ($scope.renewpassreftokenexptimeformat) {
            case 'Day':
			renewappendreftokenexptime =$scope.renewPassreftokenexptime+"D";
                
                break;
            case 'Minute':
			renewappendreftokenexptime =$scope.renewPassreftokenexptime+"M";
               
                break;
				case 'Hour':
			renewappendreftokenexptime =$scope.renewPassreftokenexptime+"H";
               
                break;
            default:

        }
	  		 sharedData1 =  $scope.sharedData;
		  		accessToken=sharedData1.accessCredentials.apiToken;
		  		
		  		
		  		
		  		$http({
	  				method : 'POST',
	  				url : "http://10.227.85.208:8089/rest1/cc-console/home/renewPasswwordExpTime",
	  				data : $.param({
	  					
	  					accessToken: accessToken,
	  					securityDomain:securityDomain,
	  					userId:userId,
	  					passwordExpTime:renewappendreftokenexptime
	  					
	  					
	  	               
	  	            }),
	  				
	  				headers : {
	  					'Content-Type' : 'application/x-www-form-urlencoded'
	  				}
	  			}).then(
	  				       function(response1){
						   $scope.renewPasswordDialogFlag=false;
	  				    	  $scope.showCustomToast1();
							  angular.forEach($scope.userAll, function(value, key){
							 
								console.log(key + ': ' + value.userId);
								if(value.userId == $scope.requestObj.userId){
								value.userActivationType = "active";
								}
								});
								//userData.addData1(testUserdata);
								//$scope.userAll={"test:"}; 
								//console.log("changed");
								//$scope.userAll = userData.getData1().users;
	  				    	  
	  				    	  
	  				           // success callback
	  				         }, 
	  				         function(response){
	  				           // failure callback
	  				         }
	  				      );
	  		
	  	};
		
		$scope.refreshTokenExptime = function(){
	  		
			securityDomain=$scope.renewRefreshDialogObj.securityDomain;
			userId = $scope.renewRefreshDialogObj.userId;
	  		
	  		
		  		accessToken=$scope.sharedData.accessCredentials.apiToken;
		  		
				switch ($scope.renewaccesstokenexptimeformat) {
            case 'Day':
			renewappendaccesstokenexptime =$scope.renewaccesstokenexptime+"D";

                break;
            case 'Minute':
			renewappendaccesstokenexptime =$scope.renewaccesstokenexptime+"M";
               
                break;
				case 'Hour':
			renewappendaccesstokenexptime =$scope.renewaccesstokenexptime+"H";
               
                break;
            default:

        }
		switch ($scope.renewreftokenexptimeformat) {
            case 'Day':
			appendrenewreftokenexptime =$scope.renewreftokenexptime+"D";
               
                break;
            case 'Minute':
			appendrenewreftokenexptime =$scope.renewreftokenexptime+"M";
              
                break;
				case 'Hour':
			appendrenewreftokenexptime =$scope.renewreftokenexptime+"H";

                break;
            default:

        }
				
		  		$http({
	  				method : 'POST',
	  				url : "http://10.227.85.208:8089/rest1/cc-console/home/renewRefreshTokenExpTime",
	  				data : $.param({
	  					
	  					accessToken: accessToken,
	  					securityDomain:securityDomain,
	  					userId:userId,
	  					accessTokenExpiryTime:renewappendaccesstokenexptime,
	  					refreshTokenExpiryTime:appendrenewreftokenexptime
	  					
	  					
	  	               
	  	            }),
	  				
	  				headers : {
	  					'Content-Type' : 'application/x-www-form-urlencoded'
	  				}
	  			}).then(
	  				       function(response1){
						   $scope.renewRefreshDialogFlag=false;
						   $scope.resetPassWordSucessDialog(response1.data.generatedPassword);
	  				    	  
	  				    	   
	  				         }, 
	  				         function(response){
	  				           // failure callback
	  				         }
	  				      );
	  		
	  	};
		
		$scope.unlockUser = function(value,ev){
		$scope.user = value;
	  		
	  		 sharedData1 =  $scope.sharedData;
		  		accessToken=sharedData1.accessCredentials.apiToken;
		  		
		  		
		  		$http({
	  				method : 'POST',
	  				url : "http://10.227.85.208:8089/rest1/cc-console/home/unlockUser",
	  				data : $.param({
	  					
	  					accessToken: accessToken,
	  					securityDomain:sharedData1.accessCredentials.securityDomain,
	  					userId:$scope.user.userId
	  					
	  					
	  					
	  	               
	  	            }),
	  				
	  				headers : {
	  					'Content-Type' : 'application/x-www-form-urlencoded'
	  				}
	  			}).then(
	  				       function(response1){
	  				    	  $scope.showCustomToast2()
	  				    	   //alert(response1.data);
	  				    	  
	  				           // success callback
	  				         }, 
	  				         function(response){
	  				           // failure callback
	  				         }
	  				      );
	  		
	  	};
	  	//alert(userData.getData1().userinfo[0].userId);
	  	//alert(user);
	  	
	  	//$scope.createUser = function($location){
	  		//window.location.href = "forms.html";
	  	//};
		
		$scope.showUserDetails = function(value,ev) {
		$scope.user = value;
    $mdDialog.show({
                  clickOutsideToClose: true,
                  scope: $scope,        
                  preserveScope: true, 
				  parent: angular.element(document.body),
				  targetEvent: ev,				  
                  template: '<md-dialog class="userDetailsWrap" aria-label="User Details">'+
  '<form ng-cloak>'+
    '<md-toolbar>'+
      '<div class="md-toolbar-tools">'+
	  '<h2 style="color:#FFFFFF;">User Details</h2>'+
	  '<span flex></span>'+
	  '<md-button class="md-icon-button" ng-click="cancel()">'+
         '<md-icon md-svg-src="img/icons/ic_close_24px.svg" aria-label="Close dialog"></md-icon>'+
        '</md-button>'+
		'</div>'+
    '</md-toolbar>'+

    '<md-dialog-content>'+
      '<div class="md-dialog-content">'+
	  '<md-content class="md-padding">'+
	  '<md-list-item class="md-1-line">'+
        '<div class="md-list-item-text" layout="column">'+
       ' <span spanclass="md-subhead"><p><b userlabel>UserId:</b>&nbsp;&nbsp;{{user.userId}}</p></span>'+
		' <span spanclass="md-subhead"><p><b userlabel>FirstName:&nbsp;&nbsp;</b>{{user.firstName}}</p></span>'+
		' <span spanclass="md-subhead"><p><b userlabel>LastName:&nbsp;&nbsp;</b>{{user.lastName}}</p></span>'+
		' <span spanclass="md-subhead"><p><b userlabel>Email:&nbsp;&nbsp;</b>{{user.email}}</span>'+
		' <span spanclass="md-subhead"><p><b userlabel>AccessTokenExpiryTime:&nbsp;&nbsp;</b>{{user.accessTokenExpiryTime}}</span>'+
		' <span spanclass="md-subhead"><p><b userlabel>RefreshTokenExpiryTime:&nbsp;&nbsp;</b>{{user.refreshTokenExpiryTime}}</span>'+
		' <span spanclass="md-subhead"><p><b userlabel>PasswordExpiryTime:&nbsp;&nbsp;</b>{{user.passwordExpiryTime}}</span>'+
		' <span spanclass="md-subhead"><p><b userlabel>Role:&nbsp;&nbsp;</b>{{user.role}}</span>'+
		' <span spanclass="md-subhead"><p><b userlabel>Country:&nbsp;&nbsp;</b>{{user.country}}</span>'+
		' <span spanclass="md-subhead"><p><b userlabel>CreatedBy:&nbsp;&nbsp;</b>{{user.createdBy}}</span>'+
		' <span spanclass="md-subhead"><p><b userlabel>CreateDate:&nbsp;&nbsp;</b>{{user.createDate}}</span></div>'+		
	   '</md-list-item>'+
	   '</md-content>'+
    '</md-dialog-content>'+
  '</form>'+
'</md-dialog>',
                  controller: function DialogController($scope, $mdDialog) {

                     $scope.closeDialog = function() {
                        $mdDialog.hide();
                     }
					 $scope.cancel = function() {
					  $mdDialog.cancel();
					};
                  }
               });
  };
  
  $scope.renewPasswordDialog = function(value,ev) {
		$scope.renewPasswordDialogFlag=true;
		$scope.user = value;
		$scope.domainrenew =  $scope.sharedData.accessCredentials.securityDomain;
		  		
				$scope.renewPassDialogObj={securityDomain:$scope.domainrenew,userId:$scope.user.userId},
    $mdDialog.show({
                  clickOutsideToClose: true,
                  scope: $scope,        
                  preserveScope: true, 
				  parent: angular.element(document.body),
				  targetEvent: ev,				  
                  template: '<md-dialog class="userDetailsWrap" aria-label="Renew Password Expiry Time" ng-show="renewPasswordDialogFlag">'+
  '<form ng-cloak>'+
    '<md-toolbar>'+
      '<div class="md-toolbar-tools">'+
	  '<h2 style="color:#FFFFFF;">Renew Password Expiry Time</h2>'+
	  '<span flex></span>'+
	  '<md-button class="md-icon-button" ng-click="cancel()">'+
         '<md-icon md-svg-src="img/icons/ic_close_24px.svg" aria-label="Close dialog"></md-icon>'+
        '</md-button>'+
		'</div>'+
    '</md-toolbar>'+

    '<md-dialog-content>'+
      '<div class="md-dialog-content">'+
	  '<md-content class="md-padding">'+
	  '<div layout="row" >'+
	  '<md-list-item class="md-1-line">'+
        '<div class="md-list-item-text" layout="column">'+
       ' <span spanclass="md-subhead"><p><b>UserId:</b>&nbsp;&nbsp;{{user.userId}}</p></span>'+
		' <span spanclass="md-subhead"><p><b>Domain:&nbsp;&nbsp;</b>{{domainrenew}}</span></div>'+
		'</md-list-item>'+
		'</div><br>'+
			
			'<div layout-gt-xs="row" >'+
				'<md-input-container flex-gt-xs class="md-block">'+
            '<label for="renewPassreftokenexptime">Refresh Token Expiry Time:*</label>'+
            '<input ng-model="renewPassreftokenexptime" type="number" class="dialog-close">'+
        '</md-input-container>'+
		'<md-input-container flex-gt-xs class="md-block"> <label for="renewpassreftokenexptimeformat">Time format</label>'+
			'<md-select ng-model="renewpassreftokenexptimeformat" material-select> '+
			'<md-option ng-value="timeformat" ng-repeat="timeformat in renewpassreftimeFor">{{ timeformat }}</md-option>'+
			'</md-select>'+ 
			'</md-input-container>'+
		'</div>'+
		'<div layout-gt-xs="row" layout-align="center center">'+
		'<md-button class="md-raised md-primary" ng-click="resetPasswordExpTime()">Submit</md-button>'+		
		'</div>'+
	   '</md-content>'+
    '</md-dialog-content>'+
  '</form>'+
'</md-dialog>',
                  controller: function renewPassDialogController($scope, $mdDialog) {
				  $scope.test="hello";
					$scope.renewpassreftimeFor = ['Day', 'Minute', 'Hour'];
                     $scope.closeDialog = function() {
                        $mdDialog.hide();
                     }
					 $scope.cancel = function() {
					  $mdDialog.cancel();
					};
                  }
               });
  };
  
  $scope.renewRefreshDialog = function(value,ev) {
  $scope.renewRefreshDialogFlag=true;
		$scope.user = value;
		$scope.domainrenew =  $scope.sharedData.accessCredentials.securityDomain;
		  		
				$scope.renewRefreshDialogObj={securityDomain:$scope.domainrenew,userId:$scope.user.userId},
    $mdDialog.show({
                  clickOutsideToClose: true,
                  scope: $scope,        
                  preserveScope: true, 
				  parent: angular.element(document.body),
				  targetEvent: ev,				  
                  template: '<md-dialog class="userDetailsWrap" aria-label="Renew Password Expiry Time" ng-show="renewRefreshDialogFlag">'+
  '<form ng-cloak>'+
    '<md-toolbar>'+
      '<div class="md-toolbar-tools">'+
	  '<h2 style="color:#FFFFFF;">Renew Refresh Token</h2>'+
	  '<span flex></span>'+
	  '<md-button class="md-icon-button" ng-click="cancel()">'+
         '<md-icon md-svg-src="img/icons/ic_close_24px.svg" aria-label="Close dialog"></md-icon>'+
        '</md-button>'+
		'</div>'+
    '</md-toolbar>'+

    '<md-dialog-content>'+
      '<div class="md-dialog-content">'+
	  '<md-content class="md-padding">'+
	  '<div layout="row" >'+
	  '<md-list-item class="md-1-line">'+
        '<div class="md-list-item-text" layout="column">'+
       ' <span spanclass="md-subhead"><p><b>UserId:</b>&nbsp;&nbsp;{{user.userId}}</p></span>'+
		' <span spanclass="md-subhead"><p><b>Domain:&nbsp;&nbsp;</b>{{domainrenew}}</span></div>'+
		'</md-list-item>'+
		'</div><br>'+
			
			'<div layout-gt-xs="row" >'+
				'<md-input-container flex-gt-xs class="md-block">'+
            '<label for="renewaccesstokenexptime">Refresh Token Expiry Time:*</label>'+
            '<input ng-model="renewaccesstokenexptime" type="number" class="dialog-close">'+
        '</md-input-container>'+
		'<md-input-container flex-gt-xs class="md-block"> <label for="renewaccesstokenexptimeformat">Time format</label>'+
			'<md-select ng-model="renewaccesstokenexptimeformat" material-select> '+
			'<md-option ng-value="timeformat" ng-repeat="timeformat in renewAccesstimeFormat">{{ timeformat }}</md-option>'+
			'</md-select>'+ 
			'</md-input-container>'+
		'</div>'+
			'<div layout-gt-xs="row" >'+
				'<md-input-container flex-gt-xs class="md-block">'+
            '<label for="renewreftokenexptime">Access Token Expiry Time:*</label>'+
            '<input ng-model="renewreftokenexptime" type="number" class="dialog-close">'+
        '</md-input-container>'+
		'<md-input-container flex-gt-xs class="md-block"> <label for="renewreftokenexptimeformat">Time format</label>'+
			'<md-select ng-model="renewreftokenexptimeformat" material-select> '+
			'<md-option ng-value="timeformat" ng-repeat="timeformat in renewreftimeFormat">{{ timeformat }}</md-option>'+
			'</md-select>'+ 
			'</md-input-container>'+
		'</div>'+
		
		'<div layout-gt-xs="row" layout-align="center center">'+
		'<md-button class="md-raised md-primary" ng-click="refreshTokenExptime()">Submit</md-button>'+		
		'</div>'+
	   '</md-content>'+
    '</md-dialog-content>'+
  '</form>'+
'</md-dialog>',
                  controller: function renewRefDialogController($scope, $mdDialog) {
				  $scope.test="hello";
					$scope.renewreftimeFormat = ['Day', 'Minute', 'Hour'];
					$scope.renewAccesstimeFormat = ['Day', 'Minute', 'Hour'];
                     $scope.closeDialog = function() {
                        $mdDialog.hide();
                     }
					 $scope.cancel = function() {
					  $mdDialog.cancel();
					};
                  }
               });
  };
  
  $scope.unlockUserDialog = function(value,ev) {
  
		$scope.user = value;
		$scope.domainrenew =  $scope.sharedData.accessCredentials.securityDomain;

				$scope.unlockUserDialogObj={securityDomain:$scope.domainrenew,userId:$scope.user.userId},
    $mdDialog.show({
                  clickOutsideToClose: true,
                  scope: $scope,        
                  preserveScope: true, 
				  parent: angular.element(document.body),
				  targetEvent: ev,				  
                  template: '<md-dialog  aria-label="Renew Password Expiry Time">'+
  '<form ng-cloak>'+
    '<md-toolbar>'+
      '<div class="md-toolbar-tools">'+
	  '<h2 style="color:#FFFFFF;">Renew Refresh Token</h2>'+
	  '<span flex></span>'+
	  '<md-button class="md-icon-button" ng-click="cancel()">'+
         '<md-icon md-svg-src="img/icons/ic_close_24px.svg" aria-label="Close dialog"></md-icon>'+
        '</md-button>'+
		'</div>'+
    '</md-toolbar>'+

    '<md-dialog-content>'+
      '<div class="md-dialog-content">'+
	  '<md-content class="md-padding">'+
	  '<div layout="row" >'+
	  '<md-list-item class="md-1-line">'+
        '<div class="md-list-item-text" layout="column">'+
       ' <span spanclass="md-subhead"><p><b>UserId:</b>&nbsp;&nbsp;{{user.userId}}</p></span>'+
		' <span spanclass="md-subhead"><p><b>Domain:&nbsp;&nbsp;</b>{{domainrenew}}</span></div>'+
		'</md-list-item>'+
		'</div><br>'+
			
			
			
		
		
	   '</md-content>'+
    '</md-dialog-content>'+
  '</form>'+
'</md-dialog>',
                  controller: function renewRefDialogController($scope, $mdDialog) {
				  $scope.test="hello";
					$scope.renewreftimeFormat = ['Day', 'Minute', 'Hour'];
					$scope.renewAccesstimeFormat = ['Day', 'Minute', 'Hour'];
                     $scope.closeDialog = function() {
                        $mdDialog.hide();
                     }
					 $scope.cancel = function() {
					  $mdDialog.cancel();
					};
                  }
               });
  };
  
  	$scope.resetPassWordSucessDialog = function(value) {
  
		$scope.resetPassWordSucessResp = value;
    $mdDialog.show({
                  clickOutsideToClose: true,
                  scope: $scope,
                  preserveScope: true, 
				  parent: angular.element(document.body),
				  
   
						  
                  template: '<md-dialog class="resetPasswordsWrap" aria-label="Renew Password Expiry Time">'+
  '<form ng-cloak>'+
    '<md-toolbar>'+
      '<div class="md-toolbar-tools">'+
	  '<h2 style="color:#FFFFFF;">Regenerated Password </h2>'+
	  '<span flex></span>'+
	  '<md-button class="md-icon-button" ng-click="cancel()">'+
         '<md-icon md-svg-src="img/icons/ic_close_24px.svg" aria-label="Close dialog"></md-icon>'+
        '</md-button>'+
		'</div>'+
    '</md-toolbar>'+

    '<md-dialog-content>'+
      '<div class="md-dialog-content">'+
	  '<md-content class="md-padding">'+
	  '<md-list-item class="md-2-line">'+
        '<div class="md-list-item-text" layout="column"><h1 class="tokenWord"> {{resetPassWordSucessResp}}</h1></div>'+
			
			'<p>'+
			'<md-button style="margin-top: 30px; "class="md-fab md-fab-bottom-right md-accent md-hue-2" ng-click="toClipboard(resetPassWordSucessResp);showCustomToast()"'+ 
			'aria-label="copy accesstoken"> '+
			'<md-icon md-svg-icon="../cloudConnectorUI/img/icons/copy.svg"></md-icon>'	+
			'<md-tooltip md-direction="bottom">copy to clipboard</md-tooltip></p>'+
			
	   '</md-list-item>'+
	   '</md-content>'+
	   
    '</md-dialog-content>'+
  '</form>'+
'</md-dialog>',
                  controller: function resetPassWordSucessDialogController($scope, $mdDialog) {
				  $scope.message = "Token copied to clipboard";
				  $scope.test="hello";
                     $scope.closeDialog = function() {
                        $mdDialog.hide();
                     }
					 $scope.cancel = function() {
					  $mdDialog.cancel();
					};
                  }
               });
  };
  
  
  $scope.testclick = function(value){
	  		$scope.selectedvalue = value;
	  		
	  	};
  
  

  
}
app.controller ("UserController" , UserController);