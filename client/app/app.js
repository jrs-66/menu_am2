'use strict';

angular.module('menuApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'btford.socket-io',
  'appConstants',
  'menuApp.services',
  'ng-slide-down',
  'ngFx',
  'ngAnimate'
])
.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider
    .otherwise('/');
  $locationProvider.html5Mode(true);
})
.factory('mySocket', function (socketFactory) {
  return socketFactory();
})
.factory('dataService', function() {
  var _dataObj = {};
  return {
    headerText: _dataObj
  };
})
.directive('jsToggle', function($compile) {
  return {
    scope: {data: '='},
    link: function(scope, element, attrs) {
      element.on("click", function() {
        scope.$apply(function() {
          var content = $compile(scope.data.formIcon[scope.data.widgetExpanded])(scope);
          element.html(content);
        })
      });
    }
  }
});
