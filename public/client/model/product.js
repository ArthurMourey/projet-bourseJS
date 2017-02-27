angular.module('shop').factory('Product', 
  ['$http','Portefeuille', function($http, Portefeuille) {
    var Product = function(data) {
      if(data.name === 'undefined'){
        this.name = data.name;
      }
      else{
        this.name = data.Name;
      }

      this.symbol = data.symbol;
      if(typeof data.price === 'undefined'){
          if(typeof data.Ask != 'undefined' && data.Ask != null) {
              this.ask = data.Ask + "$";
          }
          else{
              this.ask = "";
          }
      }
      else{
        this.ask = data.price+"$";
      }
    }
    
    Product.prototype.buy = function() {
      console.log(this.name);
      $http.post('http://localhost:3000/portefeuille',this)
      .then(function(response){
        var newProduct = new Product(response);
        Portefeuille.push(newProduct);
      });
    }

    Product.prototype.sold = function() {
      $http.delete('http://localhost:3000/portefeuille',this)
      .then(function(){
        console.log("prout");
      });
    }
    
    return Product;
  }]);