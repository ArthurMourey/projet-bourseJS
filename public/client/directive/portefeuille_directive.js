angular.module('shop').directive('portefeuille', 
  [function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/template/portefeuille.html',
      link: function(scope, element, attrs) {
        scope.sold = function() { scope.product.sold(); }
      }
    }
  }]);
