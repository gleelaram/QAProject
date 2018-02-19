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



app.controller('QAViewCntrl',['$scope','$http','$firebaseObject','$firebaseArray','$firebaseAuth','$q','$firebaseStorage',function($scope,$http,$firebaseObject,$firebaseArray,$firebaseAuth,$q,$firebaseStorage){
	
	
	/*$scope.$watchGroup(['Company', 'skill'], function(newVal, oldVal) { 
		
		if(newVal[0]=="")
			{
			$scope.Company=undefined;
			}
		if(newVal[1]=="")
		{
		$scope.skill=undefined;
		}
	});*/
	
	$scope.errorflag=false;
	
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
		
		//console.log($scope.QAF.company);
		
		if($scope.QAF==undefined)
			{
			 $scope.errorMsg="Please provide the mandatory fileds";
			 $scope.errorflag=true;
			 $("#QAModal").modal("show");
			 return;
			}
		
		if($scope.QAF.company==undefined)
		{
		$scope.QAF.company="";
		}
	
	if($scope.QAF.skill==undefined)
	{
	$scope.QAF.skill="";
	}
		
		if($scope.QAF==undefined||$scope.QAF.question==undefined)
		{
			 $scope.errorMsg="Please provide the mandatory fileds";
			 $scope.errorflag=true;
			 $("#QAModal").modal("show");
		}else{
			 $("#QAModal").modal("hide");
			 $scope.errorflag=false;
			 $scope.errorMsg="";
			console.log($scope.QAF);
			$scope.questionList.$add($scope.QAF).then(function(ref) {
			  var id = ref.key;
			  console.log("added record with id " + id);
			});
			
		}
		
	
		
	
	};
	
	$scope.upload=function(){
		
		$scope.count=0;
		readDataFromExcel().then(function(data){
			
			$("#QAMModal").modal("hide");
			
			if(data==undefined)
				{
				$scope.errorMultiflag=true;
				$scope.errorMultiMsg="Please select excel to upload.";
				return;
				}
			if(data.length!=0)
			{
				
				for(var i=0;i<data.length;i++)
				{
				 createAddQAObject(data[i],i).then(function(ObjCre){
					 if(ObjCre.iValue==data.length)
					 {
						 if($scope.count==data.length)
							{
						     $scope.errorMultiflag=false;
						     $scope.successMultiflag=true;
						     $scope.successMultiMsg="All questions added successfully";
							}
						else if($scope.count < data.length && $scope.count > 0 && data.length > 0 ){
							$scope.errorMultiflag=false;
						     $scope.successMultiflag=true;
						     $scope.successMultiMsg="some questions added successfully,remaining rows contain empty space and no data in that row ";
							
						}
						else{
							console.log("error");
						}
					}
				 });
				}
				
				
			}else{
				$scope.errorMultiflag=true;
				$scope.errorMultiMsg="No data found in the excel.";
			}
			
		});
		
	};
	
	function createAddQAObject(object,i)
	{
		var iValue=(function(){return i})(i);
		var defer=$q.defer();
		if(object==undefined)
		{
			$scope.errorMultiflag=true;
			$scope.errorMultiMsg="No data found in the excel.";
			defer.resolve({count:$scope.count,iValue:iValue});
			return defer.promise;
		
		}
		if(object.question==undefined ||object.question.trim()=="")
		{
			$scope.errorMultiflag=true;
			$scope.errorMultiMsg="Upload excel in correct format";
			defer.resolve({count:$scope.count,iValue:iValue});
			return defer.promise;
	
			
		}
		
		if(object.company==undefined||object.company.trim()=="")
		{
			object.company="";
		}
		if(object.skill==undefined||object.skill.trim()=="")
		{
			object.skill="";
		}
		$scope.questionList.$add(object).then(function(ref) {
			  var id = ref.key;
			  console.log("added record with id " + id);
			
			  $scope.count=$scope.count+1;
			  defer.resolve({count:$scope.count,iValue:iValue});
			});
		return defer.promise;
	}
	
	function readDataFromExcel()
	{
		var defer=$q.defer();
		var jsonoutput;
		 var files = document.getElementById("file-object").files;
		  console.log(files);
		  //var files = e.target.files,
		  // file;
		  if (!files || files.length === 0)
			  {
			  defer.resolve();//undefined
			  return defer.promise;
			  }
		  file = files[0];
		  //console.log(e);
		  var fileReader = new FileReader();
		  fileReader.onload = function(e) {
		    console.log(e);
		    console.log(e.target.result);
		    var filename = file.name;
		    // call 'xlsx' to read the file
		    var data = new Uint8Array(e.target.result);
		    var arr = [];
		    for (var i = 0; i != data.length; ++i)
		      arr[i] = String.fromCharCode(data[i]);
		    var bstr = arr.join("");
		    var oFile = XLSX.read(bstr, {
		      type: "binary",
		      cellDates: true,
		      cellStyles: true
		    });
		    // console.log(oFile);
		    oFile.SheetNames.forEach(function(sheetName) {
		      // console.log(oFile.Sheets[sheetName]);
		    jsonoutput = XLSX.utils.sheet_to_row_object_array(oFile.Sheets[sheetName]);
		      //console.log(roa);
		      
		     

		    });
		    defer.resolve(jsonoutput);
		  };

		  fileReader.readAsArrayBuffer(file);
		  return defer.promise;
	}
	
	$scope.dummy=function()
	{
		console.log("Hai in modal");
	};
	
	$scope.formatExcel=function()
	{
		var storageRef = firebase.storage().ref("questionsExcel.xlsx");
	    $scope.storage = $firebaseStorage(storageRef);
	    $scope.storage.$getDownloadURL().then(function(url) {
	    	  $scope.url = url;
	    	  var aTag=document.createElement("a")
	    	  aTag.href=url;
	    	  aTag.click();
         });
		
	}
	
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








