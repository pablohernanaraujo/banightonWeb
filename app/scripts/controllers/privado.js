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

    /* cambiar email */

    $scope.cambioEmailMensaje = 'Conectando...';
    $scope.cambioPasswordMensaje = 'Conectando...';
    $scope.LoadingCambioEmailMensaje = false;
    $scope.LoadingCambioPasswordMensaje = false;
    var cambiarDatos = new Firebase('https://clientsbnoapp.firebaseio.com/');

    $scope.cambiarEmail = function(change){
      $scope.LoadingCambioEmailMensaje = true;

      cambiarDatos.changeEmail({
        oldEmail: change.oldEmail,
        newEmail: change.newEmail,
        password: change.password
      }, function(error) {
        if (error) {
          switch (error.code) {
            case 'INVALID_PASSWORD':
              $timeout(function() {
                $scope.cambioEmailMensaje = 'La contraseña es incorrecta.';
              });
              break;
            case 'INVALID_USER':
              $timeout(function() {
                $scope.cambioEmailMensaje = 'El usuario no existe.';
              });
              
              console.log($scope.cambioEmailMensaje );
              break;
            default:
              $timeout(function() {
                $scope.cambioEmailMensaje = 'Error creando usuario:'+ error;
              });
          }
        } else {
          $timeout(function() {
            $scope.cambioEmailMensaje = 'Usuario email cambiado con exito!';
            $scope.client.email = change.newEmail;
            $scope.change = null;
          });
        }
      });
    };

    /* cambiar password */

    $scope.cambiarPassword = function(change){
      $scope.LoadingCambioPasswordMensaje = true;
      cambiarDatos.changePassword({
        email: change.passwordEmail,
        oldPassword: change.passwordOld,
        newPassword: change.passwordNew
      }, function(error) {
        if (error) {
          switch (error.code) {
            case 'INVALID_PASSWORD':
              console.log('The specified user account password is incorrect.');
              $timeout(function() {
                $scope.cambioPasswordMensaje = 'La contraseña es incorrecta';
              });
              break;
            case 'INVALID_USER':
              console.log('The specified user account does not exist.');
              $timeout(function() {
                $scope.cambioPasswordMensaje = 'El usuario no existe';
              });
              break;
            default:
              console.log('Error changing password:', error);
              $timeout(function() {
                $scope.cambioPasswordMensaje = 'Error cambiando contraseña' + error;
              });
          }
        } else {
          console.log('User password changed successfully!');
          $timeout(function() {
            $scope.cambioPasswordMensaje = 'Usuario contraseña cambiada con exito!';
            $scope.change = null;
            $scope.register = null;
          });
        }
      });
    };
  });
