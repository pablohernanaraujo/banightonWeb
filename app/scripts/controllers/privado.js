'use strict';

angular.module('webApp')
  .controller('PrivadoCtrl', function ($scope, $rootScope, fire, $firebaseArray, 
    $firebaseObject, $timeout, Map) {

    $scope.lugares = 0;

    $scope.status = 0;

    $scope.ocultar = false;

    $timeout(function() {
    	var ref = new Firebase(fire.clients+'/clients/'+$rootScope.algo);
      var cliente = $firebaseArray(ref);
      var obj = $firebaseObject(ref.child('user'));
      
      obj.$bindTo($scope, 'client').then(function() {

        $rootScope.PAGE = $scope.client.firstname; 

        $scope.places = $scope.client.places.length;

        if($scope.client.places[$scope.lugares].music){
          $scope.cuantosTengo = $scope.client.places[$scope.lugares].music.length;

          angular.forEach($scope.client.places[$scope.lugares].music, function(){
            $scope.masEstilos();
          }); 
        }

        if(!$scope.client.places[$scope.lugares].status){
          $scope.client.places[$scope.lugares].status = 0;
        }

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

    $scope.seleccionado = [];

    $scope.seleccionado[0] = true;

    $scope.cambiarDeLugar = function(cam){

      $scope.lugares = cam;
      console.log($scope.lugares);

      for(var i = 0 ; i < $scope.places ; i++){
        $scope.seleccionado[i] = false;
      }

      $scope.seleccionado[cam] = true;
      
    };

  	$('#ingresar').closeModal();

    $scope.modalLugares = function(que){
      if(que === 'abrir'){
        $('#modalLugares').openModal();
      }
      if(que === 'cerrar'){
        $('#modalLugares').closeModal();
      }
      
    };

    $scope.ingresarNuevoLugar = function(){
      $scope.client.places[$scope.places].status = 0;

      $scope.modalLugares('cerrar');
    };

  	$rootScope.btn = true;

  	$( document ).ready(function() {

      $('ul.tabs').tabs();

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
                $scope.client.places[$scope.lugares].address = res.name;
                $scope.client.places[$scope.lugares].latitude = res.geometry.location.lat();
                $scope.client.places[$scope.lugares].longitude= res.geometry.location.lng();
            },
            function(status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }
        );
    };
  });
