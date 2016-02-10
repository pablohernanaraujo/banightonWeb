'use strict';

angular.module('webApp')
  .controller('NavCtrl', function ($scope, $rootScope, $timeout, Authentication) {

    $rootScope.btn = true;

    var bloquear = function(){
      $('.navegador').css({'height':'100%'});
      $('#cerrarAllModals').css({'display':'block'});
      $rootScope.btn = false;
    };
    var desbloquear = function(){
      $('#menu').closeModal();
      $('#ingresar').closeModal();
      $('.navegador').css({'height':'1%'});
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

    $( document ).ready(function() {
      var ancho = $( window ).width();

      var mostrarImagen = function(){
        if(ancho>1280){
          $scope.logo = './images/banighton.png';
        }
        if(ancho<=1280){
          $scope.logo = './images/banighton.png';
        }
        if(ancho<=800){
          $scope.logo = './images/banighton.png';
        }
        if(ancho<=600){
          $scope.logo = './images/logo.png';
        }
      };

      mostrarImagen();

      $(window).resize(function() {
        ancho = $( window ).width();
          
        if(ancho<=1280){
          $scope.$apply(function(){
            $scope.logo = './images/banighton.png';
          });
        }

        if(ancho<=600){
          $scope.$apply(function(){
            $scope.logo = './images/logo.png';
          });
        }
      });
    });

    function vaciarMensaje() {
      $('#mensaje').animate({
        opacity:0
      }, 500, function(){
        $rootScope.message = '';
      });
    }

    $rootScope.$watch('message', function() {
        //console.log($rootScope.message);

        if ($rootScope.message === 'Usuario inexistente.' || $rootScope.message === 'Contraseña incorrecta.') {
          $('#mensaje').css({
          opacity:1
        });
          $timeout(vaciarMensaje, 3000);
        }
    });   

  });