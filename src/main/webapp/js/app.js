var app = angular.module('erApp', ['ngTagsInput','ngGrid','ngRoute','angularFileUpload','blockUI', 'ui.utils.masks', 'ui.router','xeditable','ui.bootstrap', 'ui.bootstrap.datetimepicker', 'ui.select','ngSanitize','ngNotify','components']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    
	$urlRouterProvider.otherwise('/');
        
    $stateProvider
    .state('main', {url:'/', views: {'': {templateUrl: 'views/index.html', controller: 'dashboardCtrl'}},
    	resolve : {
        	permission: function(authorizationService,$route) {
        		return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN","ROLE_USER"]);
               }
        }
    })
    .state('createProfile', {url:'/createProfile', views: {'': {templateUrl: 'views/createProfile.html', controller: 'createProfileCtrl'}},
    	resolve : {
        	permission: function(authorizationService,$route) {
        		return authorizationService.permissionCheck(["ROLE_ADMIN","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_USER"]);
               }
        }
    })
    .state('searchProfile', {url:'/searchProfile', views: {'': {templateUrl: 'views/searchProfile.html', controller: 'searchProfileCtrl'}},
    	resolve : {
        	permission: function(authorizationService,$route) {
        		return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN","ROLE_USER"]);
               }
        }
    })
    .state('editProfile', {url:'/editProfile', views: {'': {templateUrl: 'views/editProfile.html', controller: 'editProfileCtrl'}},
    	resolve : {
        	permission: function(authorizationService,$route) {
        		return authorizationService.permissionCheck(["ROLE_ADMIN","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_USER"]);
               }
        }
    })
    .state('viewProfile', {url:'/viewProfile', views: {'': {templateUrl: 'views/viewProfile.html', controller: 'editProfileCtrl'}},
    	resolve : {
        	permission: function(authorizationService,$route) {
        		return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN","ROLE_USER"]);
               }
        }
    })
    .state('createPosition', {url:'/createPosition', views: {'': {templateUrl: 'views/createPosition.html', controller: 'createPositionCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN","ROLE_HR"]);
            }
    	}
    })
    .state('searchPosition', {url:'/searchPosition', views: {'': {templateUrl: 'views/searchPosition.html', controller: 'searchPositionCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_MANAGER","ROLE_ADMIN"]);
            }
    	}
    })
    .state('viewPosition', {url:'/viewPosition', views: {'': {templateUrl: 'views/viewPosition.html', controller: 'editPositionCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_MANAGER","ROLE_ADMIN"]);
            }
    	}})
    .state('interviewManagement', {url:'/interviewManagement', views: {'': {templateUrl: 'views/interviewManagement.html', controller: 'interviewManagementCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN"]);
            }
    	}
    })
    .state('interviewFeedback', {url:'/interviewFeedback', views: {'': {templateUrl: 'views/interviewFeedback.html', controller: 'interviewFeedbackCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER"]);
            }
    	}})
    .state('scheduleInterview', {url:'/scheduleInterview', views: {'': {templateUrl: 'views/scheduleInterview.html', controller: 'scheduleInterviewCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER"]);
            }
    	}})
    .state('showInterview', {url:'/showInterview', views: {'': {templateUrl: 'views/showInterview.html', controller: 'showInterviewCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER"]);
            }
    	}})
    .state('viewUser', {url:'/viewUser', views: {'': {templateUrl: 'views/viewUser.html', controller: 'editUserCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN", "ROLE_USER"]);
            }
    	}})
    .state('routeForUnauthorizedAccess', {url:'/routeForUnauthorizedAccess', views: {'': {templateUrl: 'views/index.html'}}})
    
    .state('reportInfo', {url:'/reportInfo', views: {'': {templateUrl: 'views/reportInfo.html', controller: 'highChatCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER"]);
            }
    	}})  
		
		 
    .state('report', {url:'/report', views: {'': {templateUrl: 'views/report.html', controller: 'reportManagementCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN"]);
            }
    	}
    })
   .state('offer', {url:'/offer',abstract:true, views: {'': {templateUrl: 'views/offer/offer.html', controller: 'offerManagementCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN"]);
            }
    	}
    })
   .state('offer.list', {url:'', views: {'': {templateUrl: 'views/offer/candidatesList.html', controller: 'offerManagementCtrl'}},
	   resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN"]);
            }
    	}
    })
   .state('offer.createOffer', {url:'/createOffer', views: {'': {templateUrl: 'views/offer/createOffer.html', controller: 'createOfferCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN"]);
            }
    	}
    })
        
}]);

app.config(function(blockUIConfig) {
	  blockUIConfig.message = 'Loading...';
});

app.directive('numbersOnly', function(){
	   return {
	     require: 'ngModel',
	     link: function(scope, element, attrs, modelCtrl) {
	       modelCtrl.$parsers.push(function (inputValue) {
	           if (inputValue == undefined) return '' 
	           var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
	           if (transformedInput!=inputValue) {
	              modelCtrl.$setViewValue(transformedInput);
	              modelCtrl.$render();
	           }         

	           return transformedInput;         
	       });
	     }
	   };
	});

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

app.directive('uiSelectRequired', function() {
	  return {
	    require: 'ngModel',
	    link: function(scope, elm, attrs, ctrl) {
	      ctrl.$validators.uiSelectRequired = function(modelValue, viewValue) {

	        var determineVal;
	        if (angular.isArray(modelValue)) {
	          determineVal = modelValue;
	        } else if (angular.isArray(viewValue)) {
	          determineVal = viewValue;
	        } else {
	          return false;
	        }

	        return determineVal.length > 0;
	      };
	    }
	  };
});


