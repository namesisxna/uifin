var app = angular.module("HomePageView");
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