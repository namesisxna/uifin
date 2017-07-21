(function(){
 var app=angular.module('HomePageView', ['ngRoute' ,'ngMdIcons','ngClipboard', 'ui.bootstrap','ngMaterial','treeGrid']);



app.config(function($routeProvider) {
    $routeProvider
//    .when("/Home" ,{
//  	 templateUrl: "Index.html",  
//        controller: "HomePageController" 
//    })
    .when("/Profile", {  
        templateUrl: "Profile.html",  
        controller: "ProfileController"
		
    })
    .when("/ManageUsers", {  
        templateUrl: "ManageUsers.html",  
        controller: "UserController"  
    })
    .when("/Subscription", {  
        templateUrl: "Subscription.html",  
        controller: "SubscriptionController"  
    })
     .when("/Service", {  
        templateUrl: "Service.html",  
        controller: "ServiceController"  
    })
    .when("/ViewService", {  
        templateUrl: "ViewService.html",  
        controller: "ViewServiceController"  
    })
     .when("/ManageService", {  
        templateUrl: "ManageService.html",  
        controller: "ManageServiceController"  
    })
     .when("/Flow", {  
        templateUrl: "Flow.html",  
        controller: "FlowController"  
    })
      .when("/Destination", {  
        templateUrl: "Destination.html",  
        controller: "DestinationController"  
    })
     .when("/FlightInfoService", {  
        templateUrl: "FlightInfoService.html",  
        controller: "FlightInfoServiceController"  
    })
    .when("/AdministrationService", {  
        templateUrl: "AdministrationService.html",  
        controller: "AdministrationServiceController"  
    })
        .when("/TravelInfoService", {  
        templateUrl: "TravelInfoService.html",  
        controller: "TravelInfoServiceController"  
    })
    .when("/AirlineInfoService", {  
        templateUrl: "AirlineInfoService.html",  
        controller: "AirlineInfoServiceController"  
    })
    .when("/WeatherInfoService", {  
        templateUrl: "WeatherInfoService.html",  
        controller: "WeatherInfoServiceController"  
    })
    .when("/TransportInfoService", {  
        templateUrl: "TransportInfoService.html",  
        controller: "TransportInfoServiceController"  
    })
    .when("/FlightConnectionService", {  
        templateUrl: "FlightConnectionService.html",  
        controller: "FlightConnectionServiceController"  
    })
    .when("/MessageBroadcastService", {  
        templateUrl: "MessageBroadcastService.html",  
        controller: "MessageBroadcastServiceController"  
    })
    .when("/AirportInfoService", {  
        templateUrl: "AirportInfoService.html",  
        controller: "AirportInfoServiceController"  
    })
    .when("/Errors", {  
        templateUrl: "Errors.html",  
        controller: "ErrorController"  
    })
     .when("/AboutUs", {  
        templateUrl: "AboutUs.html",  
        controller: "AboutUsController"  
    })
	  .when("/CreateUser",{
		templateUrl: "CreateUser.html",  
        controller: "CreateUserController"  
	  })
	  .when("/CreateUser",{
		templateUrl: "CreateUser.html",  
        controller: "CreateUserController"  
	  })
	  .when("/Flows",{
		templateUrl: "Flows.html",  
        controller: "flowsController"  
	  })
    .otherwise({redirectTo: "/"})
})

app.config(['$locationProvider', function($locationProvider){$locationProvider.hashPrefix('');}]); 

var themeFunction = function($mdThemingProvider){
console.log("theme loaded")
var customPrimary = {
        '50': '#b5cff1',
        '100': '#9fc1ed',
        '200': '#8ab3e8',
        '300': '#75a5e4',
        '400': '#5f97e0',
        '500': '#4a89dc',
        '600': '#357bd8',
        '700': '#276ecc',
        '800': '#2363b6',
        '900': '#1f57a1',
        'A100': '#caddf5',
        'A200': '#e0eaf9',
        'A400': '#f5f8fd',
        'A700': '#1b4c8b'
    };
    $mdThemingProvider
        .definePalette('customPrimary', 
                        customPrimary);

    var customAccent = {
        '50': '#000a08',
        '100': '#00231d',
        '200': '#003d31',
        '300': '#005646',
        '400': '#00705a',
        '500': '#00896f',
        '600': '#00bc97',
        '700': '#00d6ac',
        '800': '#00efc0',
        '900': '#0affcf',
        'A100': '#00bc97',
        'A200': '#00a383',
        'A400': '#00896f',
        'A700': '#23ffd4'
    };
    $mdThemingProvider
        .definePalette('customAccent', 
                        customAccent);

    var customWarn = {
        '50': '#ff7b82',
        '100': '#ff626a',
        '200': '#ff4852',
        '300': '#ff2f3a',
        '400': '#ff1522',
        '500': '#fb000d',
        '600': '#e1000c',
        '700': '#c8000a',
        '800': '#ae0009',
        '900': '#950008',
        'A100': '#ff959a',
        'A200': '#ffaeb3',
        'A400': '#ffc8cb',
        'A700': '#7b0006'
    };
    $mdThemingProvider
        .definePalette('customWarn', 
                        customWarn);

    var customBackground = {
       
		'50': '#ffffff',
        '100': '#ffffff',
        '200': '#ECEFF1',
        '300': '#ffffff',
        '400': '#ffffff',
        '500': '#fff',
        '600': '#f2f2f2',
        '700': '#e6e6e6',
        '800': '#333333',
        '900': '#333333',
        'A100': '#ffffff',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#bfbfbf'
    };
    $mdThemingProvider
        .definePalette('customBackground', 
                        customBackground);

   $mdThemingProvider.theme('default')
       .primaryPalette('customPrimary')
       .accentPalette('customAccent')
       .warnPalette('customWarn')
       .backgroundPalette('customBackground')
}
app.config(themeFunction);
 
 
 
}());


