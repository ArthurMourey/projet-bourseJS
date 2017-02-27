angular.module('shop').directive('argent',
  [function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/template/argent.html'
    }
  }]);
