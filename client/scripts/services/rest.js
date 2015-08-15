angular.module('menuApp.services', ['ngResource'])
  .factory('TemplateListREST', function($resource){
    return $resource('/api/templates', {})
  })
  .factory('TemplateDetailsREST', ['$resource', function($resource){
    return $resource('/api/templates/:id', {id: '@id'})
  }])
  .value('version', '0.1');
