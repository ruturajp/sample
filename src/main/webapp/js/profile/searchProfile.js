app.controller('searchProfileCtrl',['$scope', '$http','$q', '$window','jobCodeService1','$rootScope', '$filter', '$log','appConstants', function($scope, $http, $q, $window, jobCodeService1,$rootScope, $filter,$log,appConstants) {
	
	$scope.errorHide = true;
	
	$scope.col=["Name","Email Id","Designation","Experience","Current Employer","Assigned Job Code"];
	
	$scope.att=["candidateName","emailId","designation","expYear","currentEmployer","jobcodeProfile"];
	$scope.att1=["jobcodeProfile"];
	//$scope.isArray = angular.isArray;
	var base_url = window.location.origin;
	for (i = 0; i< $rootScope.user.roles.length;i++){
    	if($rootScope.user.roles[i] == 'ROLE_USER'){
    		var URLL = base_url + '/EmployeeReferral/resources/profile?profilecreatedBy=' + $rootScope.user.emailId;
    	}else{
    		var URLL = base_url + '/EmployeeReferral/resources/profile';
    	}
    }
	$http.get(URLL).success(function(data, status, headers, config) {
		$scope.myData = data;
	}).error(function(data, status, headers, config) {
		$log.error("Failed To Get Prfiles! ---> "+data);
	});

	$scope.title = "Search";
	
		$scope.editProfile = function(data) {
			jobCodeService1.setprofileUserId(data.emailId);
			jobCodeService1.setjobCode(data.jobcodeProfile);
			location.href='#recruitment/viewProfile';
		};
		
	}]);
