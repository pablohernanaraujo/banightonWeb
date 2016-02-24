'use strict';

angular.module('webApp')
  .controller('InicioCtrl', function ($scope, $rootScope) {
  	
    $rootScope.PAGE = 'inicio';

    $( document ).ready(function() {
      var ancho = $( window ).width();

      var mostrarImagen = function(){
        if(ancho>1280){
          $scope.imagenInicio = './images/inicio1920.jpg';
        }
        if(ancho<=1280){
          $scope.imagenInicio = './images/inicio1280.jpg';
        }
        if(ancho<=800){
          $scope.imagenInicio = './images/inicio800.jpg';
        }
        if(ancho<=600){
          $scope.imagenInicio = './images/inicio600.jpg';
        }
      };

      mostrarImagen();

      $(window).resize(function() {
        ancho = $( window ).width();
          
          if(ancho>1280){
            $scope.$apply(function(){
              $scope.imagenInicio = './images/inicio1920.jpg';
            });
        }
        if(ancho<=1280){
            $scope.$apply(function(){
              $scope.imagenInicio = './images/inicio1280.jpg';
            });
        }
        if(ancho<=800){
            $scope.$apply(function(){
              $scope.imagenInicio = './images/inicio800.jpg';
            });
        }
        if(ancho<=600){
            $scope.$apply(function(){
              $scope.imagenInicio = './images/inicio600.jpg';
            });
        }
      });

    });
  });
