'use strict';

angular.module('webApp')
  .controller('NavCtrl', function ($scope, Authentication) {
    
    $scope.abrirModal = function(modal){
        if (modal === 'ingresar') {
           $('#ingresar').openModal(); 
       }
       if (modal === 'menu') {
           $('#menu').openModal();
       }
    	
    };

    $scope.clientLogin = function(client){
        Authentication.login(client);
    };

    $scope.clientLogout = function(){
        Authentication.logout();
    };
  });