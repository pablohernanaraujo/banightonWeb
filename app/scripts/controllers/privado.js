'use strict';

angular.module('webApp')
  .controller('PrivadoCtrl', function ($scope, $rootScope, fire, $firebaseArray, $firebaseObject) {

  	var ref = new Firebase(fire.clients+'/clients/'+$rootScope.algo);
    var cliente = $firebaseArray(ref);

    cliente.$loaded().then(function(){
        $scope.cliente = cliente;
        $scope.client = $firebaseObject(ref.child('user'));
    });

    $rootScope.PAGE = 'privado';

  	$('#ingresar').closeModal();

  	$rootScope.btn = true;

  	$( document ).ready(function() {
      var ancho = $( window ).width();

      var mostrarImagen = function(){
        if(ancho>1280){
          $scope.imagenPrivado = './images/privado1920.jpg';
        }
        if(ancho<=1280){
          $scope.imagenPrivado = './images/privado1280.jpg';
        }
        if(ancho<=800){
          $scope.imagenPrivado = './images/privado800.jpg';
        }
        if(ancho<=600){
          $scope.imagenPrivado = './images/privado600.jpg';
        }
      };

      mostrarImagen();

      $(window).resize(function() {
        ancho = $( window ).width();
          
          if(ancho>1280){
            $scope.$apply(function(){
              $scope.imagenPrivado = './images/privado1920.jpg';
            });
        }
        if(ancho<=1280){
            $scope.$apply(function(){
              $scope.imagenPrivado = './images/privado1280.jpg';
            });
        }
        if(ancho<=800){
            $scope.$apply(function(){
              $scope.imagenPrivado = './images/privado800.jpg';
            });
        }
        if(ancho<=600){
            $scope.$apply(function(){
              $scope.imagenPrivado = './images/privado600.jpg';
            });
        }
      });
    });
  	
  });
