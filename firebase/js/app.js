
angular.module('ChatApp', ['firebase'])
    //
    .constant('firebaseUrl', 'https://info343chat.firebaseio.com/messages')
    // Pass the constant to the function so it can be used by functions in the controller.
    .controller('ChatController', function($scope, $firebaseArray, firebaseUrl) {
        // creating a reference to firebase.
        var ref = new Firebase(firebaseUrl);
        ref.limitToLast(1000);
        // Cretaes a synced array, anytime it changes in local it pushes to server when server
        // changes then copy changes too
        $scope.messages = $firebaseArray(ref);
        $scope.name = null;
        $scope.body = null;

        $scope.sendMessage = function() {
            // $add special call to add things to the server, adds a new object to the array and synchronizes
            // with the server
            $scope.messages.$add({
                name: $scope.name,
                body: $scope.body,
                createdAt: Firebase.ServerValue.TIMESTAMP
            });

            // Clears the body for a new messge.
            $scope.body = null;
        }; //sendMessage()
    });
