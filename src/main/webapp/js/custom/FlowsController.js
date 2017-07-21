var app=angular.module("HomePageView");
//alert("from flow controller")
    app.controller('flowsController', function ($scope, $timeout,$location,flowData,$http,$location,$mdToast,$mdDialog) {
	
	
	$scope.Flows=function(){
    	$location.path("/Flows");
  }
  
		
	  
	   $scope.hidden = false;
      $scope.isOpen = false;
      $scope.hover = false;

      // On opening, add a delayed property which shows tooltips after the speed dial has opened
      // so that they have the proper position; if closing, immediately hide the tooltips
      $scope.$watch('isOpen', function(isOpen) {
        if (isOpen) {
          $timeout(function() {
            $scope.tooltipVisible = isOpen;
          }, 600);
        } else {
          $scope.tooltipVisible = isOpen;
        }
      });
		
		
		
	$scope.$watch('tree_data', function () {console.log("watcher called")});
      $scope.availableModes = ['md-fling', 'md-scale'];
      $scope.selectedMode = 'md-fling';
        var tree;
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

       


        var myTreeData = flowData.getData1();
		$scope.myTreeControl = {};
		$scope.myTreeControl.click = function(branch,ev) {
		
		console.log("You clicked this branch:" , branch.Type)
		//alert("clicked");
		
		$http({
	  				method : 'POST',
	  				url : "http://10.227.85.208:8089/rest1/cc-console/home/getUICamelContextInfoByName",
	  				data : $.param({
	  					
	  					contextName: branch.Name
	  					
	  	               
	  	            }),
	  				
	  				headers : {
	  					'Content-Type' : 'application/x-www-form-urlencoded'
	  				}
	  			}).then(
	  				       function(response1){
	  				    	  
	  				    	   
							   var response =response1.data;
							   console.log(response);
							   var title ="Flow Details";
							   
					$scope.flowDetailsDialog(response,ev,title);
	  				    	  
	  				           // success callback
	  				         }, 
	  				         function(response){
	  				           // failure callback
	  				         }
	  				      );
		

		//console.log($scope.tree_data)
    }
	
	$scope.myTreeControl.getRouteDetails = function(branch,ev) {
		
		console.log("You clicked this branch:" , branch.Type)
		//alert("clicked");
		
		$http({
	  				method : 'POST',
	  				url : "http://10.227.85.208:8089/rest1/cc-console/home/getUIRouteById",
	  				data : $.param({
	  					
	  					
						
						contextName:branch.ContextName,
						routeName:branch.Name
	  					
	  	               
	  	            }),
	  				
	  				headers : {
	  					'Content-Type' : 'application/x-www-form-urlencoded'
	  				}
	  			}).then(
	  				       function(response1){
	  				    	  
	  				    	   
							   var response =response1.data;
							   console.log(response);
							 var title = "Route Details"  
					$scope.routeDetailsDialog(response,ev,title);
	  				    	  
	  				           // success callback
	  				         }, 
	  				         function(response){
	  				           // failure callback
	  				         }
	  				      );
		

		//console.log($scope.tree_data)
    }
	$scope.myTreeControl.submit = function(branch) {
	
	
	
	
		console.log("You clicked this submit button of the branch:" , branch.Type)
				var result = $scope.tree_data;
		console.log(result)
		
								
								
								if(branch.Status == "Started"){
								
								$http({
			method : 'POST',
			url : "http://10.227.85.208:8089/rest1/cc-console/home/suspendUIContext",
			data : $.param({

				contextName:branch.Name

			}),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(
			       function(response){
				  // alert("response recieved")
			    	  console.log(response.data)
			           // success callback
					   var message = response.data;
					   
					   branch.Status = "Suspended";
					  
					  
					  var endpoints = branch.children
					  console.log(endpoints)
					  
					  angular.forEach(endpoints,function(endpoint,key){
					  var routes = endpoint.children;
					   angular.forEach(routes,function(route,key){
					  route.Status="Stopped";
	
	
	
						})
	
	
	
						})
						$scope.showCustomToast1(message);
					  
					 
					  
					  
					   //$scope.tree_data = response.data;
			         }, 
			         function(response){
			           // failure callback
			         }
			      );
								
								
								}
								if(branch.Status == "Suspended"){
								
								$http({
			method : 'POST',
			url : "http://10.227.85.208:8089/rest1/cc-console/home/startUIContext",
			data : $.param({

				contextName:branch.Name

			}),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(
			       function(response){
				   //alert("response recieved")
				   console.log(response.data)
				   var resp = response.data;
			    	  //  alert(resp.message)
			           // success callback
					   var routesBackend = resp.body;
					   branch.Status = "Started";
					   var endpoints = branch.children
					 // console.log(endpoints)
					  
					  angular.forEach(endpoints,function(endpoint,key){
					  var routes = endpoint.children;
					   angular.forEach(routes,function(route,key){
						angular.forEach(routesBackend,function(routeBackend,key){
						if(route.RouteId == routeBackend.routeId){
						route.Status = routeBackend.status;
						}

					  
	
						})
					//  route.Status="Suspended";
	
						})
						})
						
						$scope.showCustomToast1(resp.message);
					   //$scope.tree_data = response.data;
			         }, 
			         function(response){
			           // failure callback
			         }
			      );
								
								
								}
								
								
								
								
								
							
		//alert("clicked");
    }
	$scope.myTreeControl.submitRouteTest = function(rows,branch) {
	//alert(branch.Name)
	console.log(rows)
	
	angular.forEach(rows,function(row,key){
	
	if(row.level == 1){
	var branchuid = branch.uid;
	var childrens =  row.branch.children
	childloop(branchuid,childrens);
	function childloop(branchuid,childrens){
	var parentuid;
	
	angular.forEach(childrens,function(children,key){
	console.log(children)
	var childrenuid = children.uid;
	console.log(childrenuid)
	if(childrenuid == branchuid){
	console.log(children.parent_uid)
	}
	childrens = childrens.children;
	})
	
	
	childloop(branchuid,childrens);
	
	
	//console.log(row.branch.uid)
	}
	
	
	
	
	}
	})
	}
	
	$scope.myTreeControl.submitRoute = function(branch) {
	
	
	
	
		console.log("You clicked this submit button of the branch:" , branch.Type)
				
	
								if(branch.Status == "Started"){
								
								$http({
			method : 'POST',
			url : "http://10.227.85.208:8089/rest1/cc-console/home/suspendUIRoute",
			data : $.param({

				contextName:branch.ContextName,
				routeName:branch.Name

			}),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(
			       function(response){
				   //alert("response recieved")
			    	   //alert(response.data)
			           // success callback
					   
					   branch.Status = "Suspended";
					   $scope.showCustomToast1(response.data);
			         }, 
			         function(response){
			           // failure callback
			         }
			      );
								
								
								}
								if(branch.Status == "Suspended" || branch.Status == "Stopped"){
								
								$http({
			method : 'POST',
			url : "http://10.227.85.208:8089/rest1/cc-console/home/startUIRoute",
			data : $.param({

				contextName:branch.ContextName,
				routeName:branch.Name

			}),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(
			       function(response){
				   //alert("response recieved")
			    	   //alert(response.data)
			           // success callback
					   if(response.data != "Context is in suspended state. Please resume context first."){
					   branch.Status = "Started";
					   }
					   
					   $scope.showCustomToast1(response.data);
			         }, 
			         function(response){
			           // failure callback
			         }
			      );
								
								
								}
								
								
								
								
								
								
		//alert("clicked");
    }
	
	
	$scope.myTreeControl.stopRoute = function(branch) {
	$http({
			method : 'POST',
			url : "http://10.227.85.208:8089/rest1/cc-console/home/stopUIRoute",
			data : $.param({

				contextName:branch.ContextName,
				routeName:branch.Name

			}),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(
			       function(response){
				   
					   branch.Status = "Stopped";
					   $scope.showCustomToast1(response.data);
			         }, 
			         function(response){
			           // failure callback
			         }
			      );
	
	}
	
	
	
	 	$scope.flowDetailsDialog = function(value,ev,title) {
		$scope.Title = title;
		$scope.flowDetailsResp = value;
    $mdDialog.show({
                  clickOutsideToClose: true,
                  scope: $scope,
                  preserveScope: true, 
				  targetEvent: ev,
				  
   
						  
                  template: '<md-dialog class="flowDetailsWrap" aria-label="Flow Details">'+
  '<form ng-cloak>'+
    '<md-toolbar>'+
      '<div class="md-toolbar-tools">'+
	  '<h2 style="color:#FFFFFF;">{{Title}}</h2>'+
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
       ' <span spanclass="md-subhead"><p><b userlabel>Context_ID:</b>&nbsp;&nbsp;{{flowDetailsResp.context_ID}}</p></span>'+
		' <span spanclass="md-subhead"><p><b userlabel>Exchanges Completed:&nbsp;&nbsp;</b>{{flowDetailsResp.exchangesCompleted}}</p></span>'+
		' <span spanclass="md-subhead"><p><b userlabel>Failed Exchanges:&nbsp;&nbsp;</b>{{flowDetailsResp.failedExchanges}}</p></span>'+
		' <span spanclass="md-subhead"><p><b userlabel>Inflight Exchanges:&nbsp;&nbsp;</b>{{flowDetailsResp.inflightExchanges}}</span>'+
		' <span spanclass="md-subhead"><p><b userlabel>Total Exchanges:&nbsp;&nbsp;</b>{{flowDetailsResp.totalExchanges}}</span>'+
		' <span spanclass="md-subhead"><p><b userlabel>Uptime:&nbsp;&nbsp;</b>{{flowDetailsResp.uptime}}</span>'+
			
	   '</md-list-item>'+
	   '</md-content>'+
	   
    '</md-dialog-content>'+
  '</form>'+
'</md-dialog>',
                  controller: function flowDetailsDialogController($scope, $mdDialog) {
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
  
  $scope.routeDetailsDialog = function(value,ev,title) {
		$scope.Title = title;
		$scope.routeDetailsResp = value;
    $mdDialog.show({
                  clickOutsideToClose: true,
                  scope: $scope,
                  preserveScope: true, 
				  targetEvent: ev,
				  
   
						  
                  template: '<md-dialog class="flowDetailsWrap" aria-label="Route Details">'+
  '<form ng-cloak>'+
    '<md-toolbar>'+
      '<div class="md-toolbar-tools">'+
	  '<h2 style="color:#FFFFFF;">{{Title}}</h2>'+
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
       ' <span spanclass="md-subhead"><p><b userlabel>Route ID:</b>&nbsp;&nbsp;{{routeDetailsResp.routeId}}</p></span>'+
	   ' <span spanclass="md-subhead"><p><b userlabel>Source:&nbsp;&nbsp;</b>{{routeDetailsResp.source}}</span>'+
		' <span spanclass="md-subhead"><p><b userlabel>Exchanges Completed:&nbsp;&nbsp;</b>{{routeDetailsResp.exchangesCompleted}}</p></span>'+
		' <span spanclass="md-subhead"><p><b userlabel>Failed Exchanges:&nbsp;&nbsp;</b>{{routeDetailsResp.failedExchanges}}</p></span>'+
		' <span spanclass="md-subhead"><p><b userlabel>Inflight Exchanges:&nbsp;&nbsp;</b>{{routeDetailsResp.inflightExchanges}}</span>'+
		' <span spanclass="md-subhead"><p><b userlabel>Total Exchanges:&nbsp;&nbsp;</b>{{routeDetailsResp.totalExchanges}}</span>'+
		' <span spanclass="md-subhead"><p><b userlabel>Description:&nbsp;&nbsp;</b>{{routeDetailsResp.description}}</span>'+
		
	   '</md-list-item>'+
	   '</md-content>'+
	   
    '</md-dialog-content>'+
  '</form>'+
'</md-dialog>',
                  controller: function flowDetailsDialogController($scope, $mdDialog) {
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
	
	
	
	 $scope.myTreeControl.scope = this;
        $scope.tree_data = myTreeData;
        $scope.my_tree = tree = {};
        $scope.expanding_property = {
            field: "Name",
            displayName: "Name",
            sortable: true,
            filterable: true,
            cellTemplate: "<i>{{row.branch[expandingProperty.field]}}</i>"
        };
        $scope.col_defs = [
            
            {
                field: "Type",
                sortable: true,
                filterable: true
            },
            {
                field: "RouteId",
                sortable: true,
            },
			 {
                field: "Status",  
            },
			{
                field: "Action",
				displayName: "Action",
                cellTemplate: '<md-button class="md-fab md-mini" style="width: 2rem;height: 2rem; margin-top: 0px;  margin-bottom: 0px;" ng-show="row.branch.Type==\'root\' && row.branch.Status==\'Suspended\'" ng-click="treeControl.submit(row.branch)">'+
				'<ng-md-icon icon="play_circle_fill" style="fill:white" aria-label="show dialog"></ng-md-icon>'+
				'</md-button>'+
							  '<md-button class="md-fab md-mini md-warn" style="width: 2rem;height: 2rem; margin-top: 0px;  margin-bottom: 0px;" ng-show="row.branch.Type==\'root\' && row.branch.Status==\'Started\'" ng-click="treeControl.submit(row.branch)">'+
							  '<ng-md-icon icon="pause_circle_filled" style="fill:white" aria-label="show dialog"></ng-md-icon>'+
							  '</md-button>'+
							  
							  '<md-button class="md-fab md-mini" style="width: 2rem;height: 2rem; margin-top: 0px;  margin-bottom: 0px;" ng-show="row.branch.Type==\'route\' && (row.branch.Status==\'Stopped\' || row.branch.Status==\'Suspended\')" ng-click="treeControl.submitRoute(row.branch)">'+
							  '<ng-md-icon icon="play_circle_fill" style="fill:white" aria-label="show dialog"></ng-md-icon>'+
							  '</md-button>'+
							  '<md-button class="md-fab md-mini" style="width: 2rem;height: 2rem; margin-top: 0px;  margin-bottom: 0px;" ng-show="row.branch.Type==\'route\' && row.branch.Status==\'Started\'" ng-click="treeControl.submitRoute(row.branch)">'+
							  '<ng-md-icon icon="pause_circle_filled" style="fill:white" aria-label="show dialog"></ng-md-icon>'+
							  '</md-button>'+
							  '<md-button class="md-fab md-mini" style="width: 2rem;height: 2rem; margin-top: 0px;  margin-bottom: 0px;" ng-show="row.branch.Type==\'route\' && (row.branch.Status==\'Started\' || row.branch.Status==\'Suspended\')" ng-click="treeControl.stopRoute(row.branch)">'+
							  '<ng-md-icon icon="stop" style="fill:white" aria-label="show dialog"></ng-md-icon>'+
							  '</md-button>'
             
                
            },
            {	field: "Details",
                displayName: "Details",
                cellTemplate: '<md-button class="md-fab md-mini" style="width: 2rem;height: 2rem; margin-top: 0px;  margin-bottom: 0px;" ng-show="row.branch.Details && row.branch.Type==\'root\' " ng-click="treeControl.click(row.branch,$event)">'+
				'<ng-md-icon icon="folder_open" style="fill:white" aria-label="show dialog"></ng-md-icon>'+
				'</md-button>'+
				'<md-button class="md-fab md-mini" style="width: 2rem;height: 2rem; margin-top: 0px;  margin-bottom: 0px;" ng-show="row.branch.Details && row.branch.Type==\'route\' " ng-click="treeControl.getRouteDetails(row.branch,$event)">'+
				'<ng-md-icon icon="folder_open" style="fill:white" aria-label="show dialog"></ng-md-icon>'+
				'</md-button>'
            }
        ];
        $scope.my_tree_handler = function (branch) {
            //console.log('you clicked on', branch)
        }
		

        

    });
