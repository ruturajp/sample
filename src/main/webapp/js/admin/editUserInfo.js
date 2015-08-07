app.controller('editUserInfoCtrl',['$scope', '$http','$q', '$window', '$timeout','sharedDataService', '$log', '$rootScope','$location','userService', 'clientService',function($scope, $http, $q, $window, $timeout, sharedData, $log, $rootScope, $location, userService, clientService) {

	$scope.userToEdit = sharedDataService.getuserToEdit();
	$scope.info = $rootScope.info;
	$scope.hideRoles = true;
	$scope.message = "";
	$scope.clientList=[];
	$scope.calendar = false;
	$scope.hideCal = true;
	$scope.hideDetails = true;
	
	$scope.days = [
	   			"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
	   	];
	   	$scope.hours = [
	   	   			"1", "1.5", "2", "2.5", "3"
	   	   	];
	$scope.status = {
		    isFirstOpen: true,
		    open: true 
		  };
	
	clientService.getClientInfo()
	 .then(setClientList);

	function setClientList(data){
		angular.forEach(data, function(client){
			$scope.clientList.push(client.clientName);
		})
	}
	
	
	$scope.update = function(){
		userService.updateUser($scope.userToEdit)
			.then(function(msg){
				$scope.sendNotification(msg,'/admin/users');
			})
			.catch(function(msg){
				$scope.message=msg;
				$scope.cls=appConstants.ERROR_CLASS;
			})
		
	}
	

	$scope.alHide =  function(){
	    $scope.message = "";
	    $scope.cls = '';
	}
		
	$scope.editRoles = function(){
		$scope.hideRoles = false;
		$scope.hideView = true;
		$scope.tempRoles=$scope.userToEdit.roles;
	}
	
	$scope.openCal = function(){
		$scope.calendar = true;
		$scope.hideCal = false;
	}
	
	$scope.closeCal = function(){
		$scope.calendar = false;
		$scope.hideCal = true;
	}
	
	$scope.hideEdit = function(){
		if($scope.userToEdit.roles=== undefined)
		{
			  $scope.message="Select at least one Role";
			  $scope.cls=appConstants.ERROR_CLASS;
			  $timeout( function(){ $scope.alHide(); }, 5000);
			  $scope.userToEdit.roles = $scope.tempRoles;
			return;
		}
		angular.forEach($scope.userToEdit.roles, function(value, key) {
			if(value.toString()== "ROLE_INTERVIEWER"){
				$scope.hideDetails = false;
			}
		});
		
		$scope.hideRoles = true;
		$scope.hideView = false;	
	}

	$scope.today = function() {
	   $scope.dt = new Date();
	};

	$scope.clear = function () {
	   $scope.dt = null;
	};

	$scope.dateOptions = {
	  formatYear: 'yy',
	  startingDay: 1
	};

	$scope.addSlot = function(){
		if(angular.isUndefined($scope.userToEdit.timeSlots) || $scope.userToEdit.timeSlots === null){
			$scope.userToEdit.timeSlots = [];
		}
		$scope.userToEdit.timeSlots.push({
			day : "",
			time : "",
			hour: ""
		});
	}
	
	$scope.removeSlot = function (index) {
		$scope.userToEdit.timeSlots.splice(index, 1);
    }
	
}]);