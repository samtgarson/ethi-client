angular.module ('services', [])
    .value ('Endpoint', 'http://localhost:8081/')
    .factory ('Api', function (Endpoint, $resource) {
      return function (key) {
        return $resource(Endpoint + key, {}, {});
      };
    });