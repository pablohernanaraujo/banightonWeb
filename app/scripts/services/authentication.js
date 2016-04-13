'use strict';


angular.module('webApp')
    .factory('Authentication',['$rootScope', '$firebaseAuth', 'fire', '$location', '$firebaseObject', '$firebaseArray', 
    	function($rootScope, $firebaseAuth, fire, $location, $firebaseObject, $firebaseArray) {

    	var refUsers = new Firebase(fire.clients + '/clients'); 
    	var ref = new Firebase(fire.clients);
    	var auth = $firebaseAuth(ref);

    	auth.$onAuth(function(authUser){
            
    		if(authUser){
                
    			var userRef = new Firebase(fire.clients + '/clients/' + authUser.uid);
    			var userObj = $firebaseObject(userRef);
    			$rootScope.currentUser = userObj;
                $rootScope.algo = userObj.$id;

    		}else{
    			$rootScope.currentUser = '';
    		}
            
    	});

    	return {
    		login: function(user){
                $rootScope.dataLoading = true;
    			auth.$authWithPassword({
    				email: user.email,
    				password: user.password
    			}).then(function(regUser){
    				$location.path('/privado');
                    $rootScope.algo = regUser.uid;
                    $rootScope.dataLoading = false;
    			}).catch(function(error){
    				 if(error.message === 'The specified user does not exist.'){
                        $rootScope.message = 'Usuario inexistente.';
                    }else if(error.message === 'The specified password is incorrect.'){
                        $rootScope.message = 'Contraseña incorrecta.';
                    }else{
                        $rootScope.message = error.message;
                    }
                    $rootScope.dataLoading = false;
    			});
    		},

    		logout: function(){

    			$location.path('/inicio');
    			return auth.$unauth();
                
    		},

    		requireAuth: function(){
    			return auth.$requireAuth(); 
    		},

    		register: function(user){
                $rootScope.dataLoading = true;
    			auth.$createUser({
		  			email: user.email,
		  			password: user.password
		  		}).then(function(regUser){

		  			var regRef = new Firebase(fire.clients+ '/clients').child(regUser.uid).set({
		  				user:{
		  					date: Firebase.ServerValue.TIMESTAMP,
			  				regUser: regUser.uid,
			  				firstname: user.firstname,
			  				lastname: user.lastname,
			  				email: user.email,
			  				status: '1'
		  				}
		  			});
		  			$rootScope.message = 'Registering ' + user.firstname;
                    auth.$authWithPassword({
                        email: user.email,
                        password: user.password
                    }).then(function(regUser){
                        $rootScope.dataLoading = false;
                        $location.path('/privado');
                        $rootScope.algo = regUser.uid;
                    });
		  		}).catch(function(error){
		  			$rootScope.message = error.message;
		  		});
    		}
    	};

    }]);