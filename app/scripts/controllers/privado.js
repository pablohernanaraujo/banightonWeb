'use strict';

angular.module('webApp')
  .controller('PrivadoCtrl', function ($scope, $rootScope, fire, $firebaseArray, 
    $firebaseObject, $timeout, Map) {

    $timeout(function() {
    	var ref = new Firebase(fire.clients+'/clients/'+$rootScope.algo);
      var cliente = $firebaseArray(ref);
      var obj = $firebaseObject(ref.child('user'));
      
      obj.$bindTo($scope, 'client').then(function() {
        //console.log($scope.client);  
      });
    });

    // cliente.$loaded().then(function(){

    //     $scope.client = $firebaseObject(ref.child('user'));

    //     console.log(cliente);
  
    // });

    $rootScope.PAGE = 'privado';

  	$('#ingresar').closeModal();

  	$rootScope.btn = true;

  	$( document ).ready(function() {
      $('.collapsible').collapsible({
        accordion : false 
      });

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
                $scope.client.b1.address = res.name;
                $scope.client.b1.latitude = res.geometry.location.lat();
                $scope.client.b1.longitude = res.geometry.location.lng();
            },
            function(status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }
        );
    }; 

    $timeout(function() {
      Map.init();
    }, 1000);
  	
  });
