angular.module('shop').controller('Argent',['$scope', '$http', function($scope, $http) {

    $http.get('http://localhost:3000/argent').then(function(response){
        $scope.argent = response.data.last();
    }, function(error){
      console.log(error);
    });

}]);