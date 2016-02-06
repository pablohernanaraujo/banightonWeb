'use strict';

/**
 * @ngdoc overview
 * @name webApp
 * @description
 * # webApp
 *
 * Main module of the application.
 */
angular
  .module('webApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .constant('fire',{
      'clients' : 'https://clientsbnoapp.firebaseio.com'
    })
  .run(['$rootScope', '$location',
    function($rootScope, $location){
      $rootScope.$on('$routeChangeError', 
        function(event, next, previous, error){
          if(error === 'AUTH_REQUIRED'){
            $rootScope.message = 'Sorry, you must log in to access thar page';
            $location.path('/inicio');
          }
        });
    }])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('inicio', {
        url: '/inicio',
        templateUrl: 'views/inicio.html',
        controller:'InicioCtrl'
      })
      .state('servicios', {
        url: '/servicios',
        templateUrl: 'views/servicios.html',
        controller:'ServiciosCtrl'
      })
      .state('clientes', {
        url: '/clientes',
        templateUrl: 'views/clientes.html',
        controller:'ClientesCtrl'
      })
      .state('privado', {
        url: '/privado',
        templateUrl: 'views/privado.html',
        controller:'PrivadoCtrl',
        resolve: {
          currentAuth: function(Authentication){
            return Authentication.requireAuth();
          }
        }
      });
      $urlRouterProvider.otherwise('/inicio');
  });
