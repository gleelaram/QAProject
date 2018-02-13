var app=angular.module("QAApp",['ngRoute','firebase']);

app.config(function($routeProvider){
	
	$routeProvider
	.when('/',{
		templateUrl: 'pages/login.html',
		controller: 'LoginCntrl'
	})
		.when('/signup',{
		templateUrl: 'pages/signup.html',
		controller: 'signupCntrl'
	})
	.when('/QAView',{
		templateUrl: 'pages/QAViewTable.html',
		controller: 'QAViewCntrl'
	})
	 .otherwise({
	        template : "<h1>None</h1><p>Nothing has been selected</p>"
	    });
	
});



app.controller('QAViewCntrl',['$scope','$http','$firebaseObject','$firebaseArray','$firebaseAuth',function($scope,$http,$firebaseObject,$firebaseArray,$firebaseAuth){
	
	
	
	var db = firebase.database().ref().child('QA');
	$scope.questionList=$firebaseArray(db);
	
	$scope.firebaseUser=$firebaseAuth().$getAuth();
	
	
	$scope.signOut=function()
	{
		$firebaseAuth().$signOut().then(function(){
			$location.path('/');
		});
		
	};
	
	
}]);

app.controller('signupCntrl',['$scope','$http','$firebaseAuth',function($scope,$http,$firebaseAuth){
	
	
	$scope.createAccount=function()
	{
		
		$firebaseAuth().$createUserWithEmailAndPassword($scope.user.email,$scope.user.password).then(function(firebaseUser) {
		    console.log("User " + firebaseUser.uid + " created successfully!");
		    $location.path('/');
		  }).catch(function(error) {
		    console.error("Error: ", error);
		  });
		
	};
	
	
	
}]);


app.controller('LoginCntrl',['$scope','$http','$location','$firebaseAuth',function($scope,$http,$location,$firebaseAuth){
	
	 
	$scope.SignIn=function(){
	     
		$firebaseAuth().$signInWithEmailAndPassword($scope.user.email,$scope.user.password).then(function(firebaseUser){
			 console.log("Logged in as:", firebaseUser.uid);
			 $location.path('/QAView');
		}).catch(function(error){
			var errorCode = error.code;
			  var errorMessage = error.message
			
		});
};


$scope.SignUpPage=function(){
	
	
	$location.path('/signup');
};
}]);








