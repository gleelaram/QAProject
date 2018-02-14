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
	
	$scope.addQA=function(){
		
		console.log($scope.QAF);
		$scope.questionList.$add($scope.QAF).then(function(ref) {
		  var id = ref.key;
		  console.log("added record with id " + id);
		});
	};
	
	$scope.dummy=function()
	{
		console.log("Hai in modal");
	};
	
}]);

app.controller('signupCntrl',['$scope','$http','$firebaseAuth','$location',function($scope,$http,$firebaseAuth,$location){
	
	 $scope.signuperror=true;
	    $scope.signupsuccess=false;
	
	$scope.createAccount=function()
	{
		
		$firebaseAuth().$createUserWithEmailAndPassword($scope.user.email,$scope.user.password).then(function(firebaseUser) {
		    console.log("User " + firebaseUser.uid + " created successfully!");
		    $scope.signuperror=true;
		    $scope.signupsuccess=true;
		    $scope.message="User with email"+$scope.user.email+" created successfully!";
		    $location.path('/');
		  }).catch(function(error) {
		    console.error("Error: ", error);
		    $scope.message=error.message;
		    $scope.signuperror=false;
		    $scope.signupsuccess=false;
		  });
		
	};
	
	
	
}]);


app.controller('LoginCntrl',['$scope','$http','$location','$firebaseAuth',function($scope,$http,$location,$firebaseAuth){
	
	  $scope.signinerror=true;
	  $scope.signinsuccess=false;
	$scope.SignIn=function(){
	     
		$firebaseAuth().$signInWithEmailAndPassword($scope.user.email,$scope.user.password).then(function(firebaseUser){
			 console.log("Logged in as:", firebaseUser.uid);
			 $scope.message="Logged in as:"+$scope.user.email;
			 $scope.signinerror=true;
			  $scope.signinsuccess=true;
			 $location.path('/QAView');
		}).catch(function(error){
			var errorCode = error.code;
			  var errorMessage = error.message;
			  $scope.message=error.message;
			  $scope.signinerror=false;
			  $scope.signinsuccess=false;
			
		});
};


$scope.SignUpPage=function(){
	
	
	$location.path('/signup');
};
}]);








