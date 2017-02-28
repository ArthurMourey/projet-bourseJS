angular.module('shop').controller('ArgentController',['$scope', '$http', 'Argent', 'ListeArgent', function($scope, $http, Argent, ListeArgent) {

    $http.get('http://localhost:3000/argent').then(function(response){
        $scope.listeArgent = [];
        var dateCol = ['Date'];
        var sommeCol = ['Somme'];
        response.data.forEach(function(data) {
            var newArgent = new Argent(data);
            ListeArgent.push(newArgent);
            $scope.listeArgent = ListeArgent;

            dateCol.push(newArgent.date);
            sommeCol.push(newArgent.somme);

        });



        $scope.chart = c3.generate({
            bindto: '#chart',
            data: {
                columns: [
                    dateCol,
                    sommeCol
                ]
            }
        });


    }, function(error){
      console.log(error);
    });

}]);