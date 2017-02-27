angular.module('shop').factory('Product', 
  ['$http','Argent', 'Portefeuille', 'ListeArgent', function($http, Argent, Portefeuille, ListeArgent) {
    var Product = function(data) {


        //console.log(data);


      this.id = data._id;
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
        console.log(response);
        Portefeuille.push(newProduct);
        console.log(Portefeuille);
      });
    }

    Product.prototype.sold = function() {

      $http.delete('http://localhost:3000/portefeuille/'+this.id)
          .then(function(response){
          var index = -1;
          for (var i = 0; i < Portefeuille.length;i++) {
              if (Portefeuille[i].id == this.id) {
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