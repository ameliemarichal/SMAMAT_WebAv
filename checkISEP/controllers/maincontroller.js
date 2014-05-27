var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'views/partial-home.html'
        })

        // nested tab for the first building
		.state('home.ndc', {
	        url: '/ndc',
	        templateUrl: 'views/partial-home-building01.html',
	    })

		// nested tab for the second building
	    .state('home.branly', {
	        url: '/branly',
	        templateUrl: 'views/partial-home-building02.html'
	    })    

        // few tests
        .state('home.ndc.rdc', {
            url: '/rdc',
            template: 'TTTEEESSSSTTTT'
        }) 

        .state('home.ndc.first', {
            url: '/first',
            templateUrl: 'views/partial-home-floor00.html'
        }) 
});

routerApp.controller("maincontroller", function($scope){
    $scope.firstSelection=function(){
    	//console.log($scope.isActiveBranly);
    	if ($scope.isActiveBranly == true) {
    		$scope.isActiveBranly = !$scope.isActiveBranly;
    	};
    }
    $scope.secondSelection=function(){
    	// if ($scope.isActiveNdc1 == true || $scope.isActiveNdc2 == true || $scope.isActiveNdc3 == true || $scope.isActiveNdc4 == true || $scope.isActiveNdc5 == true || $scope.isActiveNdc6 == true {
    	// 	$scope.isActiveNdc 
    	// };
    	
    }
});