'use strict';

angular.module('menuApp')
  .controller('PlayerActivateCtrl', ['$location', '$timeout', '$scope', '$http', 'mySocket', 'configuration', function($location, $timeout, $scope, $http, mySocket, configuration){

    $scope.data = {};
    $scope.$parent.headerText = "Activate Player";

    $scope.activate = function() {

      if ($scope.playerForm.$valid) {
        $http.post('/api/players', $scope.data).success(function(player){
          $timeout(function() {
            $scope.$parent.data.players.push(player);
            $scope.data = {};
            $('#toggle').click();
          }, 0);
        });
      } else {
        $scope.$parent.setMessage('There is an error in your form.');
      }

    };

  }])

  .controller('PlayerListCtrl', ['$scope', '$http', 'mySocket', 'configuration', 'TemplateListREST', function($scope, $http, mySocket, configuration, TemplateListREST){
    $scope.data = {
      widgetExpanded: 0,
      formIcon: ['<div class="left margin-right-20">Activate</div> <i class="fa fa-plus-circle"></i>', '<div class="left margin-right-20">Cancel</div> <i class="fa red fa-minus-circle"></i>']
    };

    $scope.$parent.headerText = "Players";
    TemplateListREST.query(function(response) {
      $scope.template_list = response;
    });
    $http.get('/api/players').success(function(data) {
      $scope.data.players = data;
    })

    $scope.selectTemplate = function(player) {
      $http.post('/api/players/template', player)
    }

    $scope.remove = function(player) {
      $http.delete('/api/players/' + player._id).success(function(result){
        console.log("player deleted")
      });
      var idx = $scope.data.players.indexOf(player);
      $scope.data.players.splice(idx,1);
    };

    $scope.activate = function() {
      $scope.data.widgetExpanded = $scope.data.widgetExpanded ? 0 : 1;
    }
  }])
