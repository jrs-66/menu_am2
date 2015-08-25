app.factory('TemplateFactory', function($http, $q, CONSTANT) {
  var list = [];
  var listRetrieved = false;
  var service = {};

  service.add = function(data) {
    var deferred = $q.defer();

    $http.post(CONSTANT.API_HOST + '/api/templates', data).then(
      function(template){
        list.push(template.data);
        deferred.resolve(list);
      },
      function() {
        deferred.reject();
      }
    );
    return deferred.promise;
  }

  service.delete = function(data) {
    $http.delete('/api/templates/' + data.template._id).success(function(result){
      for (var i=0; i<list.length; i++) {
        if (list[i]._id === data.template._id) {
          console.log("removing from template list");
          list.splice(i, 1);
        };
      };
    });
  };

  function getTemplates () {
    var deferred = $q.defer();

    if (listRetrieved) {
      deferred.resolve(list);
    }
    $http.get('/api/templates').success(function(data) {
      list = data;
      listRetrieved = true;
      deferred.resolve(list);
    });
    return deferred.promise;
  };

  function getTemplate(id) {
    for (var i=0; i < list.length; i++) {
      if (list[i]._id === id) {
        return list[i];
      }
    }
  }

  return {
    service: service,
    add: service.add,
    list: list,
    delete: service.delete,
    getTemplates: getTemplates,
    getTemplate: getTemplate
  }
});
