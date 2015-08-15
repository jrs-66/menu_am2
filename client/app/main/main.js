'use strict';

angular.module('menuApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/layout/home.html',
        controller: function($scope) {
          $scope.$parent.headerText = "";
        }
      })
      .state('templatelist', {
        url: '/templates',
        templateUrl: 'app/templates/list.html',
        controller: 'TemplateListCtrl'
      })
      .state('templateassign', {
        url: '/player/list',
        templateUrl: 'app/player/list.html',
        controller: 'PlayerListCtrl'
      })
  });
