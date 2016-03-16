'use strict';

angular.module('webApp')
  .controller('ServiciosCtrl', function ($scope, $rootScope) {

  	$rootScope.PAGE = 'servicios';

  	$( document ).ready(function() {
      $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
      });
      var ancho = $( window ).width();

      var mostrarImagen = function(){
        if(ancho>1280){
          $scope.imagenServicios = './images/servicios1920.jpg';
        }
        if(ancho<=1280){
          $scope.imagenServicios = './images/servicios1280.jpg';
        }
        if(ancho<=800){
          $scope.imagenServicios = './images/servicios800.jpg';
        }
        if(ancho<=600){
          $scope.imagenServicios = './images/servicios600.jpg';
        }
      };

      mostrarImagen();

      $(window).resize(function() {
        ancho = $( window ).width();
          
          if(ancho>1280){
            $scope.$apply(function(){
              $scope.imagenServicios = './images/servicios1920.jpg';
            });
        }
        if(ancho<=1280){
            $scope.$apply(function(){
              $scope.imagenServicios = './images/servicios1280.jpg';
            });
        }
        if(ancho<=800){
            $scope.$apply(function(){
              $scope.imagenServicios = './images/servicios800.jpg';
            });
        }
        if(ancho<=600){
            $scope.$apply(function(){
              $scope.imagenServicios = './images/servicios600.jpg';
            });
        }
      });
    });
  });