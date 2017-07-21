var app=angular.module("HomePageView");
var createUserController = function($scope,$http,$location,srvShareData,userData){
		  alert("smhfjklh");
		  $scope.domain=null;
		  $scope.country=null;
		  $scope.userType=null;
		  $scope.roleType=null;
		  $scope.pwdexpformat=null;
		  $scope.acctokexpformat=null;
		  $scope.reftokenexptimeformat=null;
		  $scope.appendedacctoken =null;
		  $scope.sharedData1 = null;
		  $scope.accesstoken = null;
		  $scope.Usertable=null;
		  $scope.sharedDatatemp = srvShareData.getData();
		  $scope.sharedData = $scope.sharedDatatemp[$scope.sharedDatatemp.length - 1];
		  
		//  $scope.acctokexptm=null;
		 
		
		 
		  	$scope.createUser = function(){
		  		$scope.appendpwdexptm =$scope.pwdexptm+$scope.pwdexpformat;
		  		$scope.appendedacctoken = $scope.acctokexptm+$scope.acctokexpformat;
		  		$scope.appendreftokenexptime = $scope.reftokenexptime+$scope.reftokenexptimeformat;
		  		
		  		//alert("ksjhdfjh");
		  		//alert("roletype: "+ $scope.firstName);
		  		alert("roletype: "+ $scope.roleType+"country:"+ $scope.country+"domain:"+ $scope.domain+"usertype:"+$scope.userType);
		  		alert($scope.appendpwdexptm);
		  		alert($scope.appendedacctoken);
		  		alert($scope.appendreftokenexptime);
		  		sharedData1 =  $scope.sharedData;
		  		accesstoken=sharedData1.accessCredentials.apiToken;
		  		alert(accesstoken);
		  		
		  		$http({
	  				method : 'POST',
	  				url : "http://10.227.85.208:8089/rest1/cc-console/home/createUser",
	  				data : $.param({
	  					accessToken:accesstoken,
	  					securityDomain:$scope.domain,
	  					userId:$scope.userId,
	  					password:$scope.password,
	  					fname:$scope.firstName,
	  					lname:$scope.lastName,
	  					email:$scope.email,
	  					country:$scope.country,
	  					passExpTime:$scope.appendpwdexptm,
	  					accessTokExpTime:$scope.appendedacctoken,
	  					refreshTokExpTime:$scope.appendreftokenexptime,
	  					userType:$scope.userType,
	  					roleType:$scope.roleType
	  					
	  					
	  	               
	  	            }),
	  	            
//	  	          String accessToken, String securityDomain,
//	  	    	String userId, String password, String fname, String lname,
//	  	    	String email, String country, String passExpTime,
//	  	    	String accessTokExpTime, String refreshTokExpTime, String userType,
//	  	    	String roleType)

	  					
	  					

	  				
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
	  				    	   window.location.href = "tables.html";
	  				    	  
	  				           // success callback
	  				         }, 
	  				         function(response){
	  				           // failure callback
	  				         }
	  				      );
		  		
		  		
		  	};
		  	
		  }
app.controller("createUserController",createUserController);