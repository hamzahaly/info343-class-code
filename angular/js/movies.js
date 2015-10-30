// MVC Model View Controller
// Angular.js
// Models = data
// Views = way to represent
// Controller = get model out of storage and merge into view

angular.module('Movies', ['ui.router'])
    .factory('moviesJSON', function($http) {
        return $http.get('data/movies-2014.min.json');
    })
    // These names are defined by ui-router module.
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('list', {
              url: "/movies",
              templateUrl: 'views/movies-list.html',
              controller: 'MoviesController'
          })
          .state('detail', {
              url: '/movies/:index',
              templateUrl: 'views/movies-detail.html',
              controller: 'MovieDetailController'
          });
        $urlRouterProvider.otherwise('/movies');
    })
    // Second controller
    .controller('MovieDetailController', function($scope, $stateParams, moviesJSON) {
        //.then is used because it could still be fetching.
        moviesJSON.then(function(results) {
            $scope.movie = results.data[$stateParams.index];
        })
    })
    .controller('MoviesController', function($scope, moviesJSON) {
        var ratingsMap = {
            'Not Rated': 0,
            'G': 1,
            'PG': 2,
            'PG-13': 3,
            'R': 4,
            'NC-17': 5,
            'X': 6
        };

        // Every promise has a .then function
        moviesJSON.then(function(results) {
               // Data from the server
              $scope.movies = results.data.map(function(movie) {
                  movie.ratingOrdinal = ratingsMap[movie.rating];
                  return movie;
              });

               $scope.distributors = _.uniq(_.pluck($scope.movies, 'distributor'));

           });

        $scope.setSort = function(propertyName) {
            if ($scope.sortCol === propertyName) {
                $scope.sortReverse = !$scope.sortReverse;
            } else {
                $scope.sortCol = propertyName;
                $scope.sortReverse = false;
            }
        };
    });

// Set sort order with orderBy
// right side is same as ng-repeat "d in distributors" d is a variable name.
// ng options what do you wnt the options element attribute value to be set to and text to be set to.
// left side is option display attribute