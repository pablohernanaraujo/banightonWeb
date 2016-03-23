'use strict';

angular.module('webApp')
  .controller('InicioCtrl', function ($scope, $rootScope) {
  	
    $rootScope.PAGE = 'inicio';

    $scope.abrirModalVideo = function(){
      $('#modal2').openModal();
    };

    $( document ).ready(function() {
      var ancho = $( window ).width();

      var mostrarImagen = function(){
        if(ancho>1280){
          $scope.imagenInicio = './images/poster-800.jpg';
          $scope.pushiar = false;
          $scope.verVideo = true;
        }
        if(ancho<=1280){
          $scope.imagenInicio = './images/poster-800.jpg';
          $scope.pushiar = false;
          $scope.verVideo = true;
        }
        if(ancho<=800){
          $scope.imagenInicio = './images/poster-800.jpg';
          $scope.pushiar = false;
          $scope.verVideo = false;
        }
        if(ancho<=600){
          $scope.imagenInicio = './images/poster-600.jpg';
          $scope.pushiar = true;
          $scope.verVideo = false;
        }
      };

      mostrarImagen();
      $('.parallax').parallax();

      $(window).resize(function() {
        ancho = $( window ).width();
          
          if(ancho>1280){
            $scope.$apply(function(){
              $scope.imagenInicio = './images/poster-800.jpg';
              $scope.pushiar = false;
              $scope.verVideo = true;
            });
        }
        if(ancho<=1280){
            $scope.$apply(function(){
              $scope.imagenInicio = './images/poster-800.jpg';
              $scope.pushiar = false;
              $scope.verVideo = true;
            });
        }
        if(ancho<=800){
            $scope.$apply(function(){
              $scope.imagenInicio = './images/poster-800.jpg';
              $scope.pushiar = false;
              $scope.verVideo = false;
            });
        }
        if(ancho<=600){
            $scope.$apply(function(){
              $scope.imagenInicio = './images/poster-600.jpg';
              $scope.pushiar = true;
              $scope.verVideo = false;
            });
        }
      });

    });
  });
