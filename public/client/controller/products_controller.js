angular.module('shop').controller('ProductsController',['$scope', '$http', 'Product', function($scope, $http, Product) {

    $scope.products = [];
    $scope.init = true;


    $scope.search = function() {
        $http.get('http://localhost:3000/stocks?symbol='+ $scope.searchText).then(function(response) {
        var newProduct = new Product(response.data.query.results.quote);
        if($scope.init === false){
          if(newProduct.name != null){
            $scope.products.push(newProduct);
          }
        }
        $scope.init = false;

      }, function(error) {
        console.log(error);
      });
    }
    
}]);