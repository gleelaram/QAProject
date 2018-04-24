var app=angular.module("QAApp",['ngRoute','firebase','angularUtils.directives.dirPagination']);

app.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider){
	
	 $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	
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
	.when('/403',{
		templateUrl: 'pages/403.html',
	})
	 .otherwise({
	        template : "<h1>None</h1><p>Nothing has been selected</p>"
	    });
	
}]);



app.controller('QAViewCntrl',['$scope','$http','$firebaseObject','$firebaseArray','$firebaseAuth','$q','$firebaseStorage','$window','$filter','$location',function($scope,$http,$firebaseObject,$firebaseArray,$firebaseAuth,$q,$firebaseStorage,$window,$filter,$location){
	
	
    $scope.tableshow=true;
	$scope.globalselect=false;
	$scope.errorflag=false;
	$scope.currentPage = 1;
	$scope.numPerPage = 20;
	$scope.maxSize = 3;
	
	/*var db = firebase.database().ref().child('QA');
	$scope.questionList=$firebaseArray(db);*/
	
	$scope.firebaseUser=JSON.parse($window.sessionStorage.getItem("userDetails"));
	$scope.deletePermission=JSON.parse($window.sessionStorage.getItem("deletePerm"));
	
	if($scope.deletePermission==true)
		{
		  $scope.colspan=8;
		}
	else
		{
		 $scope.colspan=6;
		}
	$scope.countObj={company: undefined,skill : undefined,subskill : undefined , location : undefined};
	$scope.SearchObj={};
	
	var count =0;
	var max = 0;
	$scope.backsearch=false;
	
	
	$scope.selectall=function()
	{
		console.log("currentpage:"+$scope.currentPage);
		var start=($scope.currentPage-1)*$scope.numPerPage;
		console.log("start:"+start);
		var end=$scope.currentPage*$scope.numPerPage;
		console.log("end:"+end);
		
		if(end > $scope.questionList.length)
			{
			end=$scope.questionList.length;
			console.log("end:"+end);
			}
		
	   for(var i=start;i<end;i++)
		   {
		    $scope.questionList[i].selected=$scope.globalselect;
		   }
	    
	}
	
	$scope.deleteSelected=function()
	{
		var dummyarray=[];
		$scope.questionList.forEach(function(qa){
			if(qa.selected)
				{
				delete qa.selected;
				dummyarray.push(qa);
				}
		})
		if(dummyarray.length!=0)
			{
		$http.post('/QAProject/rest/delSelQues',dummyarray).then(function(response){
			console.log(response.data);
			$scope.fixedQuestionList = response.data;
			$scope.questionList=response.data;
			if($scope.questionList.length==0)
				{
				 $scope.tableshow=false;
				 $scope.TableMsq="NO DATA";
				 return;
				}
			$scope.globalselect=false;
			$scope.questionList.forEach(function(qa)
					{
				      qa.selected=false;
					})
			/*$scope.currentPage=1;
			 var begin = (($scope.currentPage - 1) * $scope.numPerPage)
			    , end = begin + $scope.numPerPage;
			    
			    $scope.questionList = $scope.fixedQuestionList.slice(begin, end);
			    $scope.lengthOfQA=$scope.fixedQuestionList.length;*/
		},function(error){
			console.log(error);
		});
		
			}
		
		
	}
	

	
	$scope.searchCompany=function(QAObject)
	{ 
		if(count > 4 || QAObject.company == null || $scope.countObj.company!= undefined )
			{
			  return
			}else{
				
				var tempList=$scope.fixedQuestionList;
				
				$scope.SearchObj.company = QAObject.company;
				
				count=count+1;
				$scope.countObj.company = count;
				
				max = $scope.countObj.company;
				
				$scope.questionList=$filter('filter')(tempList,$scope.SearchObj);
				/*$scope.lengthOfQA=$scope.questionList.length;
				
				   if( $scope.currentPage==1)
				    {
				    	 var begin = (($scope.currentPage - 1) * $scope.numPerPage)
				         , end = begin + $scope.numPerPage;
				         $scope.questionList = $scope.questionList.slice(begin, end);
				    }else{
				    	 $scope.currentPage=1;
				    }*/
				
				console.log(QAObject);
				$scope.backsearch=true;
			}
		
		
	}
	
	$scope.searchskill=function(QAObject)
	{ 
		if(count > 4  || QAObject.skill == null || $scope.countObj.skill!= undefined )
		{
		  return
		}else{
		var tempList=$scope.fixedQuestionList;
		$scope.SearchObj.skill =  QAObject.skill;
		count=count+1;
		$scope.countObj.skill = count;
		max = $scope.countObj.skill;
		$scope.questionList=$filter('filter')(tempList,$scope.SearchObj);

		/*$scope.lengthOfQA=$scope.questionList.length;
		
		   if( $scope.currentPage==1)
		    {
		    	 var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		         , end = begin + $scope.numPerPage;
		         $scope.questionList = $scope.questionList.slice(begin, end);
		    }else{
		    	 $scope.currentPage=1;
		    } */
		   
		   
		console.log(QAObject);
		$scope.backsearch=true;
		}
		
	};
	
	$scope.searchsubskill=function(QAObject)
	{ 
		if(count > 4 || QAObject.subskill == null ||$scope.countObj.subskill!= undefined )
		{
		  return
		}else{
		var tempList=$scope.fixedQuestionList;
		
		$scope.SearchObj.subskill = QAObject.subskill;
		count=count+1;
		$scope.countObj.subskill = count;
		max = $scope.countObj.subskill;
		$scope.questionList=$filter('filter')(tempList, $scope.SearchObj);
	/*	$scope.lengthOfQA=$scope.questionList.length;
		
		   if( $scope.currentPage==1)
		    {
		    	 var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		         , end = begin + $scope.numPerPage;
		         $scope.questionList = $scope.questionList.slice(begin, end);
		    }else{
		    	 $scope.currentPage=1;
		    }*/
		
		console.log(QAObject);
		$scope.backsearch=true;
		}
		
	};
	
	$scope.searchlocation=function(QAObject)
	{ 
		if(count > 4 || QAObject.location == null ||$scope.countObj.location!= undefined )
		{
		  return
		}else{
		var tempList=$scope.fixedQuestionList;
		
		$scope.SearchObj.location = QAObject.location;
		count=count+1;
		$scope.countObj.location =count;
		max = $scope.countObj.location;
	
		$scope.questionList=$filter('filter')(tempList, $scope.SearchObj);
	/*	$scope.lengthOfQA=$scope.questionList.length;
		
		if( $scope.currentPage==1)
	    {
	    	 var begin = (($scope.currentPage - 1) * $scope.numPerPage)
	         , end = begin + $scope.numPerPage;
	         $scope.questionList = $scope.questionList.slice(begin, end);
	    }else{
	    	 $scope.currentPage=1;
	    }*/
		
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
		   /* $scope.lengthOfQA=$scope.questionList.length;
		    if( $scope.currentPage==1)
		    {
		    	 var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		         , end = begin + $scope.numPerPage;
		         $scope.questionList = $scope.questionList.slice(begin, end);
		    }else{
		    	 $scope.currentPage=1;
		    }*/
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
		  /*  $scope.lengthOfQA=$scope.questionList.length;
		    
		    if( $scope.currentPage==1)
		    {
		    	 var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		         , end = begin + $scope.numPerPage;
		         $scope.questionList = $scope.questionList.slice(begin, end);
		    }else{
		    	 $scope.currentPage=1;
		    }*/
		    
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
		  /*  $scope.lengthOfQA=$scope.questionList.length;
		    
		    if( $scope.currentPage==1)
		    {
		    	 var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		         , end = begin + $scope.numPerPage;
		         $scope.questionList = $scope.questionList.slice(begin, end);
		    }else{
		    	 $scope.currentPage=1;
		    }*/
		    
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
		   /* $scope.lengthOfQA=$scope.questionList.length;
		    
		    if( $scope.currentPage==1)
		    {
		    	 var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		         , end = begin + $scope.numPerPage;
		         $scope.questionList = $scope.questionList.slice(begin, end);
		    }else{
		    	 $scope.currentPage=1;
		    }*/
		    
		    if(count ==0)
	    	{
	    	$scope.backsearch=false;
	    	}
	  }
	  else{
		  console.log("some condition");
		  $scope.questionList=$scope.fixedQuestionList;
		 /* $scope.lengthOfQA=$scope.questionList.length;*/
		  $scope.backsearch=false;
	/*	  if( $scope.currentPage==1)
		    {
		    	 var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		         , end = begin + $scope.numPerPage;
		         $scope.questionList = $scope.questionList.slice(begin, end);
		    }else{
		    	 $scope.currentPage=1;
		    }*/
	  }
		
	}
	
	
	
	$scope.signOut=function()
	{
		/*$firebaseAuth().$signOut().then(function(){
			$window.sessionStorage.clear();
			$location.path('/');
		});*/
		$window.sessionStorage.clear();
		$http.post('/QAProject/rest/j_spring_security_logout',object).then(function(response){
			console.log(response.data);
		
			
		},function(error){
			console.log(error);
		});
		
	}
	
	$scope.deleteQuestion=function(QAObject)
	{
		console.log(QAObject);
		delete QAObject.selected;
		
		$http.post('/QAProject/rest/deleteQuestion',QAObject).then(function(response){
			
			console.log(response.data);
			$scope.fixedQuestionList = response.data;
			$scope.questionList=response.data;
			
			if($scope.questionList.length==0)
			{
				 $scope.TableMsq="NO DATA";
			      $scope.tableshow=false;
			      return;
			}
			
			$scope.questionList.forEach(function(qa)
					{
				      qa.selected=false;
					})
			console.log($scope.questionList);
			
		},function(error){
			$scope.errorMultiflag=true;
			$scope.errorMultiMsg="You are not authurized to delete the record."
		});
	}
	
	
	$http.get('/QAProject/rest/getQuestions').then(function(response){
		$scope.fixedQuestionList = response.data;
		$scope.questionList=response.data;
		
		if($scope.questionList.length==0)
		{
			 $scope.TableMsq="NO DATA";
		      $scope.tableshow=false;
		      return;
		}
		
		$scope.questionList.forEach(function(qa)
				{
			      qa.selected=false;
				})
		console.log($scope.questionList);
		
		
		 
		/* $scope.tableParams = new NgTableParams({}, { dataset: response.data}); 
		 var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		    , end = begin + $scope.numPerPage;
		    
		    $scope.questionList = $scope.fixedQuestionList.slice(begin, end);
		    $scope.lengthOfQA=$scope.fixedQuestionList.length;
		console.log(response.data);*/
		
	},function(error){
		console.log(error);
		/*$scope.errorMultiflag=true;
		$scope.errorMultiMsg="Access Denined";*/
		$location.path('/403');
	});
	
	/*  $scope.$watch('currentPage + numPerPage', function() {
		  var check =0;
		    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		    , end = begin + $scope.numPerPage;
		    
		    for(var key in $scope.countObj)
		    {
		    	if($scope.countObj[key]!=undefined)
		    	{
		    		check=1;
		    		break;
		    	}
		    }
		    if(check==1)
		    {
		    	$scope.questionList=$filter('filter')($scope.fixedQuestionList,$scope.SearchObj);
		    	$scope.questionList = $scope.questionList.slice(begin, end);

		    }else{
		    	 $scope.questionList = $scope.fixedQuestionList.slice(begin, end);
		    $scope.lengthOfQA=$scope.fixedQuestionList.length;
		    console.log($scope.fixedQuestionList.length);
		    }
		  });*/
	
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
				$scope.fixedQuestionList = response.data;
				$scope.questionList=response.data;
				$scope.tableshow=true;
				$scope.questionList.forEach(function(qa)
						{
					      qa.selected=false;
						})
				/*$scope.currentPage=1;
				 var begin = (($scope.currentPage - 1) * $scope.numPerPage)
				    , end = begin + $scope.numPerPage;
				    
				    $scope.questionList = $scope.fixedQuestionList.slice(begin, end);
				    $scope.lengthOfQA=$scope.fixedQuestionList.length;*/
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
		
		object.question.trim();
		object.company.trim();
		object.skill.trim();
		object.subskill.trim();
		object.location.trim();
		
		
		$http.post('/QAProject/rest/addQuestion',object).then(function(response){
			console.log(response.data);
			 $scope.count=$scope.count+1;
			 $scope.questionList=response.data;
			 $scope.tableshow=true;
			 $scope.questionList.forEach(function(qa)
						{
					      qa.selected=false;
						})
			 
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
	    
	    $scope.roleList=[{role:"ROLE_USER",check:false,disabled:false},{role:"ROLE_ADMIN",check:false,disabled:true}];
	
	$scope.createAccount=function()
	{
		
		/*$firebaseAuth().$createUserWithEmailAndPassword($scope.user.email,$scope.user.password).then(function(firebaseUser) {
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
		  });*/

		var userProfiles=[];
		
		$scope.roleList.forEach(function(role){
			if(role.check)
				{
				 userProfiles.push({"role":role.role});
				}
		});
		
		if(userProfiles.length==0)
			{
			userProfiles.push({role:"ROLE_USER"});
			}
		$scope.user.userProfiles=userProfiles;
		$scope.user.enabled=1;
		
		if($scope.user.username==undefined ||$scope.user.username=="")
			{
			$scope.message="UserName is required"
			 $scope.signuperror=true;
			return;
			}
		
		if($scope.user.password==undefined ||$scope.user.password=="")
		{
		$scope.message="password is required"
		 $scope.signuperror=true;
		return;
		}
	
		
		$http.post('/QAProject/rest/addUser',$scope.user).then(function(response){
			
			if(response.data=="Added")
				{
				 $scope.message="Added new user "+$scope.user.username;
				 $scope.signupsuccess=true;
				 
				}
		},function(error){
			$scope.message="New user"+$scope.user.username+"not added.Please try again";
			 $scope.signuperror=true;
		});
		
		
	};
	
	
	
}]);


app.controller('LoginCntrl',['$scope','$http','$location','$firebaseAuth','$window',function($scope,$http,$location,$firebaseAuth,$window){
	
	  $scope.signinerror=true;
	  $scope.signinsuccess=false;
	$scope.SignIn=function(){
	     
	/*	$firebaseAuth().$signInWithEmailAndPassword($scope.user.email,$scope.user.password).then(function(firebaseUser){
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
			
		});*/
		 var string = $scope.user.username+":"+$scope.user.password;
		 var encode = btoa(string);
		 var encode = "Basic "+encode;
		 var config = {
	               
	                headers: {"cache-control": "no-cache","authorization":encode}
	            };
		
		$http.post('/QAProject/rest/login1',$scope.user,config).then(function(response){
		
			console.log(response.data);
			var userInfo = response.data;
			var deletePerm;
			userInfo.authorities.forEach(function(authority){
				if(authority.authority=="ROLE_ADMIN")
					{
					 deletePerm =true;
					}
			})
			if(deletePerm==undefined)
				{
				deletePerm=false;
				}
			 $window.sessionStorage.setItem("userDetails",JSON.stringify(response.data));
			 $window.sessionStorage.setItem("deletePerm",JSON.stringify(deletePerm));
			var check = userInfo.hasOwnProperty('status')?false:userInfo.authenticated;
			if(check)
				{
				 $location.url('/QAView');
				}
			else{
				$scope.message="UserName and Password is Wrong";
				$scope.signinerror=false;
			}
		},function(error){
			if(error.status==401)
				{
				$scope.message="UserName and Password is Wrong";
				$scope.signinerror=false;
				}
		});
};


$scope.SignUpPage=function(){
	
	
	$location.path('/signup');
};
}]);










