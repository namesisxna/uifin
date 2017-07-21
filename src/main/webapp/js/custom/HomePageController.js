var app=angular.module("HomePageView");
var mainfunction = function($scope,$http,$httpParamSerializerJQLike,$location,srvShareData,userData,$window,$route,flowData,$mdToast,$mdDialog){
		$scope.domainNames = [ "Default" ];
		$scope.flag = false;
		$scope.bodylayout = "background-colorful";
		$scope.loginBackground = true;
		
		$scope.showCustomToast1 = function(value) {
		console.log("toast called")
        $mdToast.show({
          hideDelay   : 3000,
          position    : 'top right',
          controller  : function($scope, $mdToast){
		$scope.message = value;
	  },
          template : '<md-toast>'+
					'<span class="md-toast-text" flex>{{message}}</span>'+
					'<md-button ng-click="closeToast()">'+
						'Close'+
					'</md-button>'+
					'</md-toast>'
        });
      };
	  	$scope.logOut = function(){
		$scope.bodylayout = "background-colorful";
		$scope.flag = false;
		$scope.hidebox = true;
		var KEY = 'App.SelectedValue';
		var mydata = $window.localStorage.getItem(KEY);
		mydata.length = 0;
		
		$window.location.reload();
		}  
		$scope.hideMessageBox = function(){
		$scope.hidebox = true;
		}
		$scope.showMessageBox = function(){
		$scope.hidebox = false;
		}
	    	$location.path("/");
		$scope.submitfunction = function(){
		
		alert($scope.username+" "+$scope.password+" "+$scope.domain);
		$http({
			method : 'POST',
			url : "http://10.227.85.208:8089/rest1/cc-console/home/authenticate",
			data : $httpParamSerializerJQLike({

				"username" : $scope.username,
				"password" : $scope.password,
				"domain" : 	$scope.domain

			}),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(
			       function(response){
				   console.log(response.data);
				   var respdata = response.data;
				   if(respdata == "30001"){
				   var message ="Invalid username or password"
				   $scope.showCustomToast1(message);
				   }
				   else{
				   
			    	   $scope.User=response.data
			    	   srvShareData.addData($scope.User);
			    	   //window.location.href = "custom.html";
					   $scope.sharedDatatemp = srvShareData.getData();
						$scope.sharedData = $scope.sharedDatatemp[$scope.sharedDatatemp.length - 1];
					   
			    	  $scope.flag=true;
					  
					  window.location = "#/Profile";
					  $scope.bodylayout = "backgroundAll"
					  }
			           // success callback
			         }, 
			         function(response){
			           // failure callback
			         }
			      );
	};
			
        
	 
	  	    
			
	  
	  	  
	  	  $scope.onclickfunction = function(){
		  $scope.sharedDatatemp = srvShareData.getData();
		  $scope.sharedData = $scope.sharedDatatemp[$scope.sharedDatatemp.length - 1];
	      $scope.sharedData1 = null;
	      $scope.accesstoken = null;
	      $scope.Usertable=null;
	  		 sharedData1 =  $scope.sharedData;
	  		 accesstoken =sharedData1.accessCredentials.apiToken;
	  		
	  			$http({
	  				method : 'POST',
	  				url : "http://10.227.85.208:8089/rest1/cc-console/home/users",
	  				data : $.param({
	  					accesstoken: accesstoken
	  	               
	  	            }),
	  				
	  				headers : {
	  					'Content-Type' : 'application/x-www-form-urlencoded'
	  				}
	  			}).then(
	  				       function(response1){
	  				    	   //var i =0;
	  				    	   Usertable=response1.data;
	  				    	   userData.addData1(Usertable);
	  				    	   //alert(i++);
	  				    	   //alert(userData.getData1().userinfo[0].userId);
	  				    	   window.location = "#/ManageUsers";
	  				    	  
	  				           // success callback
	  				         }, 
	  				         function(response){
	  				          alert("invalid password")
	  				         }
	  				      );
	  		};
			
			  $scope.getFlows = function(){
		// alert("getFlows method called")
	      $scope.flowResult=null;
	  		 sharedData1 =  $scope.sharedData;
	  		 accesstoken =sharedData1.accessCredentials.apiToken;
	  		
	  			$http({
	  				method : 'GET',
	  				url : "http://localhost:8089/rest1/cc-console/home/getAllUiFlows",
	  				headers : {
	  					'Content-Type' : 'application/x-www-form-urlencoded'
	  				}
	  			}).then(
	  				       function(response1){
	  				    	   //var i =0;
	  				    	   flowResult=response1.data;
	  				    	   flowData.addData1(flowResult);
							   console.log(flowResult);
	  				    	   //alert(i++);
	  				    	   //alert(userData.getData1().userinfo[0].userId);
	  				    	   window.location = "#/Flows";
	  				    	  
	  				           // success callback
	  				         }, 
	  				         function(response){
	  				         
	  				         }
	  				      );
	  		};
			
			}
app.controller("HomePageController" , mainfunction );

