/*
    script file for the index.html page
*/

// The array contains strings from the ui-router module
angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .constant('storageKey', 'contacts-list')
    .factory('contacts', function(uuid, localStorageService, storageKey) {
        return localStorageService.get(storageKey) || [];
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', { // Name called list
                url: '/contacts',
                templateUrl: 'views/contacts-list.html', // injects into empty <div>
                controller: 'ContactsController'
            })
            .state('detail', { // Name called detail
                url: '/contacts/:id',
                templateUrl: 'views/contact-detail.html',
                controller: 'ContactDetailController'
            })
            .state('edit', {
                url: '/contacts/:id/edit',
                templateUrl: 'views/edit-contact.html',
                controller: 'EditContactController'
            });
        $urlRouterProvider.otherwise('/contacts');
    })
    // (Name, function): register a directive for custom validation of dates in the past.
    .directive('inThePast', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, controller) {
                controller.$validators.inThePast = function(modelValue) {
                    var today = new Date(); // Returns right now, with nothing in it.
                    return (new Date(modelValue) <= today);
                }
            }
        };
    })
    .controller('ContactsController', function($scope, contacts) { // Takes factory param 'contacts'
        $scope.contacts = contacts;
    })
    .controller('ContactDetailController', function($scope, $stateParams, localStorageService, storageKey, $state, contacts) {
        $scope.delete = function() {
            contacts.pop($scope.contact);
            localStorageService.set(storageKey, contacts);
            // Goes to the 'list', the first page we created with .state
            $state.go('list');
        };

       $scope.contact = contacts.find(function(contact) {
          return contact.id === $stateParams.id;// We used :id in the second .state() if :foo we would use .foo instead of .id

       });

    })
    .controller('EditContactController', function($scope, $stateParams, uuid, localStorageService, storageKey,
                                                  $state, contacts) {
        var existingContact = contacts.find(function(contact) {
            return contact.id === $stateParams.id;
        });

        $scope.contact = angular.copy(existingContact);

        $scope.save = function() {
            if ($scope.contact.id) {
                angular.copy($scope.contact, existingContact);
            } else {
                $scope.contact.id = uuid.v4();
                contacts.push($scope.contact);
            }

            localStorageService.set(storageKey, contacts);
            $state.go('list');
        };
    });
