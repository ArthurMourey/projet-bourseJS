angular.module('shop').directive('product', 
  [function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/template/product.html',
      link: function(scope, element, attrs) {
        scope.buy = function() { scope.product.buy(); }
      }
    }
  }]);
