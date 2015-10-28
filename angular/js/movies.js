// MVC Model View Controller
// Angular.js
// Models = data
// Views = way to represent
// Controller = get model out of storage and merge into view

angular.module('Movies', [])
    .controller('MoviesController', function($scope, $http) {
       $http.get('data/movies-2014.min.json')
           .then(function(results) {
               // Data from the server
              $scope.movies = results.data;
           });
    });