'use strict';

angular.module('menuApp')
  .controller('TemplateListCtrl', ['$scope', 'TemplateListREST', '$http', 'mySocket', 'configuration', '$window', function($scope, TemplateListREST, $http, mySocket, configuration, $window){

    $scope.$parent.headerText = "Templates";
    $scope.data = {
      widgetExpanded: 0,
      formIcon: ['<div class="left margin-right-20">Add Template</div> <i class="fa fa-plus-circle"></i>', '<div class="left margin-right-20">Cancel</div> <i class="fa red fa-minus-circle"></i>']
    };

    TemplateListREST.query(function(response) {
      $scope.data.templates = response;
    });

    $scope.build = function(id) {
      $window.location.href = '/api/templates/' + id;
    }

    $scope.remove = function(template) {
      $http.delete('/api/templates/' + template._id).success(function(result){
        console.log("template deleted")
      });
      var idx = $scope.data.templates.indexOf(template);
      $scope.data.templates.splice(idx,1);
    };

    $scope.add = function() {
      $scope.data.widgetExpanded = $scope.data.widgetExpanded ? 0 : 1;
    }

  }])
  .controller('TemplateAddCtrl', ['$scope', '$timeout', '$http', 'mySocket', 'configuration', function($scope, $timeout, $http, mySocket, configuration){

    $scope.data = {};
    $scope.$parent.headerText = "Add a Template";
    $http.get('/api/templates').success(function(templates) {
      $scope.data.templates = templates;
    })

    $scope.addTemplate = function() {
      $http.post('/api/templates', $scope.data).success(function(template){

        $timeout(function() {
          $scope.$parent.data.templates.push(template);
          $scope.data = {};
          $('#temp_toggle').click();
        }, 0);

      });
    };

  }])
