
angular.module('ChatApp', ['firebase'])
    .constant('firebaseUrl', 'https://info343chatauth.firebaseio.com/')
    .controller('ChatController', function($scope, $firebaseArray, $firebaseObject, $firebaseAuth, firebaseUrl) {
        //create reference to the Firebase
        var rootRef = new Firebase(firebaseUrl);

        //create an authentication service for this firebase
        var auth = $firebaseAuth(rootRef);

        //when the user clicks the signin button...
        $scope.signin = function() {
            //authenticate with github using a popup window
            auth.$authWithOAuthPopup('github')
                .catch(function(err) {
                    console.error(err);
                });
        };

        //when the user clicks the signout button...
        $scope.signout = function() {
            //un-authenticate (sign out)
            auth.$unauth();
        };

        //when the authentication state changes...
        auth.$onAuth(function(authData) {
            //if we have authentication data
            if (authData) {
                //get the users object
                $scope.users = $firebaseObject(rootRef.child('users'));
                //when it's finished loading...
                $scope.users.$loaded().then(function() {
                    //add this user to the users object using the github username
                    //as the key
                    $scope.users[authData.github.username] = authData.github;

                    //and save the users object
                    $scope.users.$save();
                });

                //add the github user data to the scope
                $scope.user = authData.github;

                //get the last 1000 messages and add those to the scope
                var messagesRef = rootRef.child('messages');
                messagesRef.limitToLast(1000);
                $scope.messages = $firebaseArray(messagesRef);
            }
            else {
                //not authenticated, so reset all the scope values to null
                $scope.users = null;
                $scope.user = null;
                $scope.messages = null;
            }
        }); //$onAuth()

        //when the user clicks the send message button...
        $scope.sendMessage = function() {
            //add a new object to messages
            //the .$add() method will add the object and synchronize with the server
            //don't use .push() here or it won't be synchronized
            $scope.messages.$add({
                username: $scope.user.username,
                body: $scope.body,
                createdAt: Firebase.ServerValue.TIMESTAMP
            })
                .then(function() {
                    //after the add is done, clear the body field
                    $scope.body = null;
                    //and any error
                    $scope.error = null;
                })
                .catch(function(err) {
                    console.error(err);
                    $scope.error = err;
                });
        }; //sendMessage()

    }); //ChatController

// new data and auth are magic variables in Firebase

// Gonna take notes about team Github stuff

/* New repository: Team Demo 2
 Descr
 Initialize with Read Me
 Can add git.ignore or do it manually
 adding people:
 Settings > Collaborators >
 The newly added collaborator should clone (actually both should clone)
 File a new bug under Issues Module when your teammates introduce new bugs
 Assign issues to collaborators
 Don't party on the master branch
 Create a new branch in the repo for each new feature
 Create and do things in the branch
 git checkout -b "some name"(switches branches and creates a new branch)Different names please
 git push origin "name of feature branch" (origin is the repo from which it came or was cloned from)
 create a pull request:
    to ask team members to review it
    merge pull request to confirm the merge into the master branch
    #issue number can automatically close the issue for you
    go back to master: git checkout master
    git pull origin master (pulls Caleb's changes)

    git merge master: merge all the things from master into the feature branch
    gitk: opens a graphical display
    git branch to see what branch you are on
    git push origin feature2 (Pushes the feature2 branch)

    Something is wrong with the code, don't merge right away bounce back to the sender
    All code is isolated from Master until we want to merge the code

    git branch
    git status
    git commit -am "resolves #2 for real" (adds and commits in one line)
    git push origin feature2

    other dude must merge and then confirm the merge then close the pull request
    git branch -d feature2 (delete the branch)

    I MADE A HORRIBLE MISTAKE (What if you did the commit)
    git revert HEAD (revert the last commit made in the repo, HEAD refers to the last commit made in repo)
    undoes the commit
    -1, -2, -3, HEAD does a new opposite commit.

    Release Version 1
    git tag -a v1.0 -m "release 1.0"
    git push origin master doesn't push the tags
    git push --tags
    This pushes the tags

 */