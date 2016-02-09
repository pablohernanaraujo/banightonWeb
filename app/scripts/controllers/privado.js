'use strict';

angular.module('webApp')
  .controller('PrivadoCtrl', function ($scope, $rootScope) {

  	$rootScope.PAGE = 'privado';

  	$('#ingresar').closeModal();

  	$rootScope.btn = true;
  	
  });
