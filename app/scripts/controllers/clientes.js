'use strict';

angular.module('webApp')
  .controller('ClientesCtrl', function ($scope, $rootScope, Authentication) {

  	$rootScope.PAGE = 'clientes';

  	$( document ).ready(function() {
      var ancho = $( window ).width();

      var mostrarImagen = function(){
        if(ancho>1280){
          $scope.imagenClientes = './images/clientes1920.jpg';
        }
        if(ancho<=1280){
          $scope.imagenClientes = './images/clientes1280.jpg';
        }
        if(ancho<=800){
          $scope.imagenClientes = './images/clientes800.jpg';
        }
        if(ancho<=600){
          $scope.imagenClientes = './images/clientes600.jpg';
        }
      };

      mostrarImagen();

      $('.parallax').parallax();

      $(window).resize(function() {

        ancho = $( window ).width();
          
          if(ancho>1280){
            $scope.$apply(function(){
              $scope.imagenClientes = './images/clientes1920.jpg';
            });
        }
        if(ancho<=1280){
            $scope.$apply(function(){
              $scope.imagenClientes = './images/clientes1280.jpg';
            });
        }
        if(ancho<=800){
            $scope.$apply(function(){
              $scope.imagenClientes = './images/clientes800.jpg';
            });
        }
        if(ancho<=600){
            $scope.$apply(function(){
              $scope.imagenClientes = './images/clientes600.jpg';
            });
        }

      });

      $scope.register = function(client){
        if(client.client === undefined || client.client === ''){
            $rootScope.message = 'Debe seleccionar Disco o Dj porfavor.';
        }
        if(client.client === 'disco' || client.client === 'dj'){
            $rootScope.message = '';
            //Authentication.register($scope.client);
            console.log(client);
        }
      };

    });
  });