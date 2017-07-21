var app = angular.module("HomePageView");
var CreateUserController = function($scope,$http,$location,srvShareData,userData)
{
$scope.CreateUser=function(){
                $location.path("/CreateUser");
  }            
   $scope.domainNames = ['Default'];
  
   $scope.countries = ['Argentina', 'Australia', 'Austria', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Brazil', 'Bulgaria', 'Canada',  'Chile', 'China',
                       'Colombia', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Dominican Republic', 'Egypt', 'Estonia', 'Finland',
					   'France', 'Georgia', 'Germany', 'Gibraltar', 'Greece', 'Hong Kong S.A.R., China', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran',
					   'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Kazakhstan', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lithuania','Luxembourg', 'Macedonia', 'Malaysia', 'Malta', 'Mexico', 'Moldova', 'Monaco', 'Montenegro', 'Morocco', 'Netherlands', 
					   'New Zealand', 'Nicaragua', 'North Korea', 'Norway', 'Pakistan', 'Palestinian Territory', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Tunisia', 'Turkey', 'Ukraine', 'United Arab Emirates',
                       'United Kingdom', 'USA', 'Uzbekistan', 'Vietnam', 'Zimbabwe'];                                                                               

   $scope.passtime = ['Day', 'Minute', 'Hour'];
   
   $scope.acctime = ['Day', 'Minute', 'Hour'];
   
   $scope.reftime = ['Day', 'Minute', 'Hour'];
   
   $scope.usertypes = ['EXTERNAL EXPIRY TOKEN',
                       'INTERNAL NON EXPIRY TOKEN'];

   $scope.roletypes = ['USER', 'ADMIN'];  
   
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
			switch ($scope.pwdexpformat) {
            case 'Day':
			$scope.appendpwdexptm =$scope.pwdexptm+"D";
               // alert("Selected Case Number is 1");
                break;
            case 'Minute':
			$scope.appendpwdexptm =$scope.pwdexptm+"M";
               // alert($scope.appendpwdexptm );
                break;
				case 'Hour':
			$scope.appendpwdexptm =$scope.pwdexptm+"H";
               // alert($scope.appendpwdexptm );
                break;
            default:

        }
		switch ($scope.acctokexpformat) {
            case 'Day':
			$scope.appendedacctoken = $scope.acctokexptm+"D";
                // alert($scope.appendedacctoken );
                break;
            case 'Minute':
			$scope.appendedacctoken = $scope.acctokexptm+"M";
               // alert($scope.appendedacctoken );
                break;
				case 'Hour':
			$scope.appendedacctoken = $scope.acctokexptm+"H";
                //alert($scope.appendedacctoken );
                break;
            default:

        }
		switch ($scope.reftokenexptimeformat) {
            case 'Day':
			$scope.appendreftokenexptime =$scope.reftokenexptime+"D";
                //alert($scope.appendreftokenexptime );
                break;
            case 'Minute':
			$scope.appendreftokenexptime =$scope.reftokenexptime+"M";
                //alert($scope.appendreftokenexptime );
                break;
				case 'Hour':
			$scope.appendreftokenexptime =$scope.reftokenexptime+"H";
                //alert($scope.appendreftokenexptime );
                break;
            default:

        }
		  		
		  		
		  		
		  		
		  		//alert("ksjhdfjh");
		  		//alert("roletype: "+ $scope.firstName);
		  		//alert("roletype: "+ $scope.roletyperes+"country:"+ $scope.country+"domain:"+ $scope.domain+"usertype:"+$scope.userTyperes);
		  		//alert($scope.appendpwdexptm);
		  		//alert($scope.appendedacctoken);
		  		//alert($scope.appendreftokenexptime);
		  		sharedData1 =  $scope.sharedData;
		  		accesstoken=sharedData1.accessCredentials.apiToken;
		  		//alert(accesstoken);
		  		
		  		$http({
	  				method : 'POST',
	  				url : "http://10.227.85.208:8089/rest1/cc-console/home/createUser",
	  				data : $.param({
	  					accessToken:accesstoken,
	  					securityDomain:$scope.domainNew,
	  					userId:$scope.userId,
	  					password:$scope.passwordNew,
	  					fname:$scope.firstName,
	  					lname:$scope.lastName,
	  					email:$scope.email,
	  					country:$scope.country,
	  					passExpTime:$scope.appendpwdexptm,
	  					accessTokExpTime:$scope.appendedacctoken,
	  					refreshTokExpTime:$scope.appendreftokenexptime,
	  					userType:$scope.userTyperes,
	  					roleType:$scope.roletyperes
	  					
	  					
	  	               
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
	  				    	    window.location = "#/ManageUsers";
	  				    	  
	  				           // success callback
	  				         }, 
	  				         function(response){
	  				           // failure callback
	  				         }
	  				      );
		  		
		  		
		  	};
                
}
app.controller ("CreateUserController" , CreateUserController);
