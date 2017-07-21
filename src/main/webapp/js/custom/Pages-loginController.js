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