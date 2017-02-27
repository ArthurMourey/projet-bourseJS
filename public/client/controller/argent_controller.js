angular.module('shop').controller('ArgentController',['$scope', '$http', 'Argent', 'ListeArgent', function($scope, $http, Argent, ListeArgent) {

    $http.get('http://localhost:3000/argent').then(function(response){
        $scope.listeArgent = [];
        response.data.forEach(function(data) {
            var newArgent = new Argent(data);
            ListeArgent.push(newArgent);
            $scope.listeArgent = ListeArgent;
        });
    }, function(error){
      console.log(error);
    });

}]);