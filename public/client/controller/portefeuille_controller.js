angular.module('shop').controller('PortefeuilleController',['$scope', '$http', 'Product', 'Portefeuille', function($scope, $http, Product, Portefeuille) {

    $http.get('http://localhost:3000/portefeuille').then(function(response){
        response.data.forEach(function(data){
            var newProduct = new Product(data);
            Portefeuille.push(newProduct);
            $scope.portefeuille = Portefeuille;
        });
    }, function(error){
      console.log(error);
    });
    
}]);