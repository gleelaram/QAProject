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



app.controller('QAViewCntrl',['$scope','$http','$firebaseObject','$firebaseArray','$firebaseAuth','$q','$firebaseStorage','$window','$filter',function($scope,$http,$firebaseObject,$firebaseArray,$firebaseAuth,$q,$firebaseStorage,$window,$filter){
	
	
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
	
	/*var db = firebase.database().ref().child('QA');
	$scope.questionList=$firebaseArray(db);*/
	
	$scope.firebaseUser=JSON.parse($window.sessionStorage.getItem("userDetails"));
	
	$scope.countObj={company: undefined,skill : undefined,subskill : undefined , location : undefined};
	$scope.SearchObj={};
	
	var count =0;
	var max = 0;
	$scope.backsearch=false;
	
	$scope.searchCompany=function(QAObject)
	{ 
		if(count > 4 || QAObject.company == null)
			{
			  return
			}else{
				
				var tempList=$scope.questionList;
				
				$scope.SearchObj.company = QAObject.company;
				
				count=count+1;
				$scope.countObj.company = count;
				
				max = $scope.countObj.company;
				
				$scope.questionList=$filter('filter')(tempList,$scope.SearchObj);
				
				console.log(QAObject);
				$scope.backsearch=true;
			}
		
		
	}
	
	$scope.searchskill=function(QAObject)
	{ 
		if(count > 4  || QAObject.skill == null)
		{
		  return
		}else{
		var tempList=$scope.questionList;
		$scope.SearchObj.skill =  QAObject.skill;
		count=count+1;
		$scope.countObj.skill = count;
		max = $scope.countObj.skill;
		$scope.questionList=$filter('filter')(tempList,$scope.SearchObj);
		console.log(QAObject);
		$scope.backsearch=true;
		}
		
	}
	
	$scope.searchsubskill=function(QAObject)
	{ 
		if(count > 4 || QAObject.subskill == null)
		{
		  return
		}else{
		var tempList=$scope.questionList;
		
		$scope.SearchObj.subskill = QAObject.subskill;
		count=count+1;
		$scope.countObj.subskill = count;
		max = $scope.countObj.subskill;
		$scope.questionList=$filter('filter')(tempList, $scope.SearchObj);
		
		console.log(QAObject);
		$scope.backsearch=true;
		}
		
	}
	
	$scope.searchlocation=function(QAObject)
	{ 
		if(count > 4 || QAObject.location == null)
		{
		  return
		}else{
		var tempList=$scope.questionList;
		
		$scope.SearchObj.location = QAObject.location;
		count=count+1;
		$scope.countObj.location =count;
		max = $scope.countObj.location;
	
		$scope.questionList=$filter('filter')(tempList, $scope.SearchObj);
		
		console.log(QAObject);
		$scope.backsearch=false;
		}
		
	}
	
   
	
	$scope.back = function()
	{
	  if($scope.countObj.company === max)
		  {
		    max = max-1;
		    count = count-1;
		    $scope.countObj.company = undefined;
		    delete $scope.SearchObj.company;
		    var tempList=$scope.fixedQuestionList;
		    $scope.questionList=$filter('filter')(tempList,$scope.SearchObj);
		    
		    if(count ==0)
		    	{
		    	$scope.backsearch=false;
		    	}
		    
		  }
	  else if ($scope.countObj.skill === max)
		  {
		    max = max-1;
		    count = count-1;
		    $scope.countObj.skill = undefined;
		    delete $scope.SearchObj.skill;
		    var tempList=$scope.fixedQuestionList;
		    $scope.questionList=$filter('filter')(tempList,$scope.SearchObj);
		    if(count ==0)
	    	{
	    	$scope.backsearch=false;
	    	}
		  }
	  else if ($scope.countObj.subskill === max)
	  {
		  max = max-1;
		    count = count-1;
		    $scope.countObj.subskill = undefined;
		   delete $scope.SearchObj.subskill;
		    var tempList=$scope.fixedQuestionList;
		    $scope.questionList=$filter('filter')(tempList,$scope.SearchObj);
		    if(count ==0)
	    	{
	    	$scope.backsearch=false;
	    	}
	  }
	  else if ($scope.countObj.location === max)
	  {
		    max = max-1;
		    count = count-1;
		    $scope.countObj.location = undefined;
		    delete $scope.SearchObj.location;
		    var tempList=$scope.fixedQuestionList;
		    $scope.questionList=$filter('filter')(tempList,$scope.SearchObj);
		    if(count ==0)
	    	{
	    	$scope.backsearch=false;
	    	}
	  }
	  else{
		  console.log("some condition");
		  $scope.questionList=$scope.fixedQuestionList;
		  $scope.backsearch=false;
	  }
		
	}
	
	
	
	$scope.signOut=function()
	{
		$firebaseAuth().$signOut().then(function(){
			$window.sessionStorage.clear();
			$location.path('/');
		});
		
	};
	
	$http.get('/QAProject/rest/getQuestions').then(function(response){
		$scope.fixedQuestionList = response.data;
		$scope.questionList=response.data;
		
		console.log(response.data);
		
	},function(error){
		console.log("error");
	});
	
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
	if($scope.QAF.subskill==undefined)
	{
	$scope.QAF.subskill="";
	}
	if($scope.QAF.location==undefined)
	{
	$scope.QAF.location="";
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
			/*$scope.questionList.$add($scope.QAF).then(function(ref) {
			  var id = ref.key;
			  console.log("added record with id " + id);
			});*/
			
			var object=JSON.stringify($scope.QAF)
			$http.post('/QAProject/rest/addQuestion',object).then(function(response){
				console.log(response.data);
				$scope.questionList=response.data;
				
			},function(error){
				console.log(error);
			});
			
		}
		
	
		
	
	};
	$scope.errorclose=function()
	{
		$scope.errorMultiflag=false;
		$scope.errorMultiMsg="";
	}
	
	$scope.successclose=function()
	{
		$scope.successMultiflag=false;
		 $scope.successMultiMsg="";
	}
	
	$scope.upload=function(){
		$scope.errorMultiflag=false;
		$scope.successMultiflag=false;
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
					 if(ObjCre.iValue==data.length-1)
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
							  $scope.errorMultiflag=true;
							  $scope.errorMultiMsg=ObjCre.error;
							
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
			defer.resolve({count:$scope.count,iValue:iValue,error:$scope.errorMultiMsg});
			return defer.promise;
		
		}
		if(object.question==undefined ||object.question.trim()=="")
		{
			$scope.errorMultiflag=true;
			$scope.errorMultiMsg="Upload excel in correct format";
			defer.resolve({count:$scope.count,iValue:iValue,error:$scope.errorMultiMsg});
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
		if(object.subskill==undefined||object.subskill.trim()=="")
		{
			object.subskill="";
		}
		if(object.location==undefined||object.location.trim()=="")
		{
			object.location="";
		}
		/*$scope.questionList.$add(object).then(function(ref) {
			  var id = ref.key;
			  console.log("added record with id " + id);
			
			  $scope.count=$scope.count+1;
			  defer.resolve({count:$scope.count,iValue:iValue,error:""});
			});*/
		
		$http.post('/QAProject/rest/addQuestion',object).then(function(response){
			console.log(response.data);
			 $scope.count=$scope.count+1;
			 $scope.questionList=response.data;
			 defer.resolve({count:$scope.count,iValue:iValue,error:""});
		},function(error){
			console.log(error);
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
		  if(file.type =='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type=='application/vnd.ms-excel')
			  {
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
		  else
			  {
			  defer.resolve();//undefined
			   return defer.promise;
			  }
		 
		  
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

app.controller('signupCntrl',['$scope','$http','$firebaseAuth','$location','$window',function($scope,$http,$firebaseAuth,$location,$window){
	
	 $scope.signuperror=true;
	    $scope.signupsuccess=false;
	
	$scope.createAccount=function()
	{
		
		$firebaseAuth().$createUserWithEmailAndPassword($scope.user.email,$scope.user.password).then(function(firebaseUser) {
		    console.log("User " + firebaseUser.uid + " created successfully!");
		    $scope.signuperror=true;
		    $scope.signupsuccess=true;
		    $window.sessionStorage.setItem("userDetails",firebaseUser);
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


app.controller('LoginCntrl',['$scope','$http','$location','$firebaseAuth','$window',function($scope,$http,$location,$firebaseAuth,$window){
	
	  $scope.signinerror=true;
	  $scope.signinsuccess=false;
	$scope.SignIn=function(){
	     
		$firebaseAuth().$signInWithEmailAndPassword($scope.user.email,$scope.user.password).then(function(firebaseUser){
			 console.log("Logged in as:", firebaseUser.uid);
			 $scope.message="Logged in as:"+$scope.user.email;
			 $window.sessionStorage.setItem("userDetails",JSON.stringify(firebaseUser));
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










