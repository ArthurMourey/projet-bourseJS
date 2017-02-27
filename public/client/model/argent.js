angular.module('shop').factory('Argent',
  [function() {
    var Argent = function(data){
        this.date = data.date;
        this.somme = data.somme;
    };
    
    return Argent;
  }]);