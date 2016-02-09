'use strict';

angular.module('webApp')
  .controller('NavCtrl', function ($scope, $rootScope, Authentication) {

    $rootScope.btn = true;

    var bloquear = function(){
      $('.navegador').css({'height':'100%'});
      $('#cerrarAllModals').css({'display':'block'});
      $rootScope.btn = false;
    };
    var desbloquear = function(){
      $('#menu').closeModal();
      $('#ingresar').closeModal();
      $('.navegador').css({'height':'0%'});
      $('#cerrarAllModals').css({'display':'none'});
      $rootScope.btn = true;
    };

    $scope.btnCerrar = function(){
      desbloquear();
    };

    $scope.abrirModal = function(modal){
      if (modal === 'ingresar') {
        $('#ingresar').openModal(); 
        bloquear();
      }
      if (modal === 'menu') {
        $('#menu').openModal();
        bloquear();
      }
    };

    $scope.cerrarModal = function(){
      desbloquear();
    };

    $scope.clientLogin = function(client){
        Authentication.login(client);
    };

    $scope.clientLogout = function(){
        Authentication.logout();
    };

  });