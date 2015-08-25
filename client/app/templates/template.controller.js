'use strict';

angular.module('menuApp')
  .controller('TemplateListCtrl', ['$scope', 'TemplateFactory', 'TemplateListREST', '$http', 'mySocket', 'configuration', '$window', 'CONSTANT', function($scope, TemplateFactory, TemplateListREST, $http, mySocket, configuration, $window, CONSTANT){

    $scope.$parent.headerText = "Templates";
    $scope.data = {
      widgetExpanded: 0,
      formIcon: ['<div class="left margin-right-20">Add Template</div> <i class="fa fa-plus-circle"></i>', '<div class="left margin-right-20">Cancel</div> <i class="fa red fa-minus-circle"></i>']
    };

    TemplateFactory.getTemplates().then(function(data) {
      $scope.data.templates = data;
    });

    $scope.build = function(id) {
      $window.location.href = '/api/templates/' + id;
    }

    $scope.remove = function(template) {
      TemplateFactory.service.delete({template: template});
    };

    $scope.add = function() {
      $scope.data.widgetExpanded = $scope.data.widgetExpanded ? 0 : 1;
    }

  }])
  .controller('TemplateAddCtrl', ['$scope', '$timeout', '$http', 'mySocket', 'configuration', 'TemplateFactory', 'CONSTANT', function($scope, $timeout, $http, mySocket, configuration, TemplateFactory, CONSTANT){

    $scope.data = {};
    $scope.$parent.headerText = "Add a Template";

    $scope.addTemplate = function() {

      TemplateFactory.add($scope.data).then(
        function() {
          $timeout(function() {
            $scope.data = {};
            $('#temp_toggle').click();
          });
        }
      );
    };

  }])
