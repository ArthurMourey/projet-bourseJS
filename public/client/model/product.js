angular.module('shop').factory('Product', 
  ['$http','Argent', 'Portefeuille', 'ListeArgent', function($http, Argent, Portefeuille, ListeArgent) {
    var Product = function(data) {

      this.id = data._id;
      if(typeof data.name === 'undefined'){
        this.name = data.Name;
      }
      else{
        this.name = data.name;
      }

      this.symbol = data.symbol;
      if(typeof data.price === 'undefined'){
          if(typeof data.Ask != 'undefined' && data.Ask != null) {
              this.ask = data.Ask;
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
      console.log(this);
      $http.post('http://localhost:3000/portefeuille',this)
      .then(function(response){
        var newProduct = new Product(response.data);
        console.log("ASHAKA !!!! "+response.data);
        Portefeuille.push(newProduct);
        ListeArgent.push(new Argent({date: new Date(), somme: ListeArgent[ListeArgent.length - 1].somme - newProduct.ask}));
        console.log(Portefeuille);
      });
    }

    Product.prototype.sold = function() {

        var currentId = this.id;
      $http.delete('http://localhost:3000/portefeuille/'+this.id)
          .then(function(response){
          var index = -1;
          for (var i = 0; i < Portefeuille.length;i++) {
              if (Portefeuille[i].id == currentId) {
                  index = i;
                  break;
              }
          }

          if (index != -1){
              Portefeuille.splice(index,1);
          }
          var newArgent = new Argent(response.data);
          ListeArgent.push(newArgent);
      });
    }
    
    return Product;
  }]);