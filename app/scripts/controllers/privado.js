'use strict';

angular.module('webApp')
  .controller('PrivadoCtrl', function ($scope, $rootScope, fire, $firebaseArray, 
    $firebaseObject, $timeout, Map) {

    $timeout(function() {
    	var ref = new Firebase(fire.clients+'/clients/'+$rootScope.algo);
      var cliente = $firebaseArray(ref);
      var obj = $firebaseObject(ref.child('user'));
      
      obj.$bindTo($scope, 'client').then(function() {
        //console.log($scope.client.places);

        $rootScope.PAGE = $scope.client.firstname; 

        $scope.cuantosTengo = $scope.client.places[0].music.length;

        angular.forEach($scope.client.places[0].music, function(){
          $scope.masEstilos();
          //console.log('hola');
        }); 
      });

      $scope.cantidad = 0;

      $scope.estilos = [];

      $scope.masEstilos = function(){
        $scope.estilos.push({
          cantidad: $scope.cantidad
        });
        $scope.cantidad ++;
      };
    });

  	$('#ingresar').closeModal();

  	$rootScope.btn = true;

  	$( document ).ready(function() {

      $('.collapsible').collapsible({
        accordion : false 
      });

      Map.init();

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

    $scope.cambiarFecha = function(client){
      
      if (typeof client.aniversary !== 'string') {
        client.aniversary = client.aniversary.toJSON();

        console.log(client.aniversary);
      }
    };

    $scope.search = function() {
        $scope.apiError = false;
        Map.search($scope.searchPlace)
        .then(
            function(res) { // success
                Map.addMarker(res);
                $scope.client.places[0].address = res.name;
                $scope.client.places[0].latitude = res.geometry.location.lat();
                $scope.client.places[0].longitude= res.geometry.location.lng();
            },
            function(status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }
        );
    };
  });
