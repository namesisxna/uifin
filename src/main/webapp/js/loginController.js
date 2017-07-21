var app = angular.module("loginapp", ['ngRoute']);
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $routeProvider
		.when("/", {
			templateUrl: "page1.html",
			controller: "MainCtrl"
		})
		.when("/index", {
			templateUrl: "index.html",
			controller: "SecondCtrl"
		})
		.when("/tables", {
			templateUrl: "tables.html",
			controller: "userController"
		});
		// .otherwise({ redirectTo: '/'})
		
}]);

app.service('srvShareData', function($window) {
    var KEY = 'App.SelectedValue';

    var addData = function(newObj) {
        var mydata = $window.localStorage.getItem(KEY);
        if (mydata) {
            mydata = JSON.parse(mydata);
        } else {
            mydata = [];
        }
        mydata.push(newObj);
        $window.localStorage.setItem(KEY, JSON.stringify(mydata));
    };

    var getData = function(){
        var mydata = $window.localStorage.getItem(KEY);
        if (mydata) {
            mydata = JSON.parse(mydata);
        }
        return mydata || [];
    };

    return {
        addData: addData,
        getData: getData
    };
});

app.service('userData', function($window) {
    var KEY = 'App.SelectedUserValue1';
    

    var addData1 = function(newObj1) {
    	//alert("from add data: "+JSON.stringify(newObj1))
    	var i = 0;
    	//alert("addcounter"+i++);
    	localStorage.removeItem(KEY);
        $window.sessionStorage.setItem(KEY, JSON.stringify(newObj1));
    };

    var getData1 = function(){
        var mydata1 = $window.sessionStorage.getItem(KEY);
        //alert("data from get"+mydata1);
        
        if (mydata1) {
            mydata1 = JSON.parse(mydata1);
           
        }
        return mydata1 || [];
    };

    return {
        addData1: addData1,
        getData1: getData1
    };
});


var mainfunction = function($scope,$http,$httpParamSerializerJQLike,$location,srvShareData) {
	$scope.domainNames = [ "Default" ];
	
	$scope.submitfunction = function(){
		alert($scope.username+" "+$scope.password+" "+$scope.domain);
		$http({
			method : 'POST',
			url : "http://10.227.85.208:8089/rest1/cc-console/home/authenticate",
			data : $httpParamSerializerJQLike({

				"username" : $scope.username,
				"password" : $scope.password,
				"domain" : $scope.domain

			}),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(
			       function(response){
			    	   $scope.User=response.data
			    	   srvShareData.addData($scope.User);
			    	   window.location.href = "index.html";
			    	  
			           // success callback
			         }, 
			         function(response){
			           // failure callback
			         }
			      );
	};
	

};

app.controller("loginappCon", mainfunction);
app.controller('SecondCtrl', function($scope,$http,$location,srvShareData,userData) {
	  
	//$scope.sharedData = srvShareData.getData();
	 $scope.sharedDatatemp = srvShareData.getData();
	  $scope.sharedData = $scope.sharedDatatemp[$scope.sharedDatatemp.length - 1];
	  
	  $scope.sharedData1 = null;
	  $scope.accesstoken = null;
	  $scope.Usertable=null;
	  	  
	  	  $scope.onclickfunction = function(){
	  		 sharedData1 =  $scope.sharedData;
	  		accesstoken=sharedData1.accessCredentials.apiToken;
	  		  //alert("xkjngvlxs");
	  			//alert($scope.username+" "+$scope.password+" "+$scope.domain);
//	  		  $scope.sharedDatatemp1 = srvShareData.getData();
//	  		  $scope.sharedData1 = $scope.sharedDatatemp1[$scope.sharedDatatemp1.length - 1];
	  			//alert(accesstoken);
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
	  				    	   window.location.href = "tables.html";
	  				    	  
	  				           // success callback
	  				         }, 
	  				         function(response){
	  				           // failure callback
	  				         }
	  				      );
	  		};
	  	  
	  	});
	  app.controller("userController",function($scope,userData){
	  	
	  	$scope.userAll = userData.getData1().users;
	  	
	  	
	  	//alert(userData.getData1().userinfo[0].userId);
	  	//alert(user);
	  	
	  });
	  app.controller("createUserController",function($scope,$http,$location,srvShareData,userData){
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
		  		alert($scope.appendreftokenexptime)
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
		  		
		  		
		  	}
		  	
		  });
 