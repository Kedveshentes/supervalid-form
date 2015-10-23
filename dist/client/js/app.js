'use strict';

var momentModule = angular.module('moment', []);
momentModule.factory('moment', ['$window', function ($window) {
  return $window.moment;
}]);

var app = angular.module('supervalidFormApp', ['moment', 'offClick']);