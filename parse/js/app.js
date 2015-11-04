/*
    script for the index.html file
*/

<<<<<<< HEAD
Parse.initialize("HwGkNK09YRPy3ZajicPwpZMfX9vqCyc4ghFl2eh7", "14BQF3zAPvaOR1sh6aEzXX5Wk1LTnBFQopjr1Rbj");

$(function() {
    'use strict';

    // New Task Class for Parse
    // Think of it as a "Table Name".
    var Task = Parse.Object.extend('Task');

    // New query that will return all tasks ordered by createAt.
    // Get multiple objects at the same time.
    // What is "createdAt"? Date and Time the object was created.
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');

    // reference to the task list element using JQuery. $("CSS-SELECTOR");
    var tasksList = $('#tasks-list');

    // reference to the error message alert using JQuery. $("CSS-SELECTOR");
    var errorMessage = $('error-message');

    var tasks = [];

    // Takes an error object
    // .html can be script injected, .text does not
=======

//OK to call this before the DOM is ready
Parse.initialize("u8fq2u4IqxKXBa9PuPjHB40HA39gqnxMq8lKJYkG", "R9zpakOjl4dXU3quSQ9tvTwwe0uQA2IJj3GdNKTt");

//when the document is ready...
$(function() {
    'use strict';

    //define a new Task object class with Parse
    var Task = Parse.Object.extend('Task');

    //define a query for querying Task objects
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');

    //varible to hold the current list of tasks
    var tasks = [];

    //reference to our error message alert
    var errorMessage = $('#error-message');

    //reference to the tasks list element
    var tasksList = $('#tasks-list');

>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
    }

    function showSpinner() {
<<<<<<< HEAD
        $('fa-spin').show();
    }

    function hideSpinner() {
        $('fa-spin').hide();
    }

    // .then what to call during error is second argument
    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner);
=======
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
    }

    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
<<<<<<< HEAD
        // Reference to the ul, empty() clears out the contents.
        tasksList.empty();
        tasks.forEach(function(task) {
           $(document.createElement('li'))
               .text(task.get('title'))
               .appendTo(tasksList);
        });
    }

    // When the user submits the new task form...
    //evt = event object
    //preventDefault and false work for particular browsers, use both to encompass all of them.
    $("#new-task-form").submit(function(evt) {
        evt.preventDefault();

        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set('title', title);
        // Functions without parentheses.
        task.save().then(fetchTasks, displayError);

        return false;
    });


    // Go and fetch tasks from the Server
    fetchTasks();

    window.setInterval(fetchTasks, 3000);
});
=======
        tasksList.empty();
        tasks.forEach(function(task) {
            $(document.createElement('li'))
                .text(task.get('title'))
                .appendTo(tasksList);
        });
    }

    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner);
    }

    $('#new-task-form').submit(function(evt) {
        //tell the browser not to do its default behavior
        evt.preventDefault();

        //find the input element in this form 
        //with a name attribute set to "title"
        var titleInput = $(this).find('[name="title"]');
        
        //get the current value
        var title = titleInput.val();

        //create a new Task and set the title
        var task = new Task();
        task.set('title', title);

        //save the new task to your Parse database
        //if save is successful, fetch the tasks again
        //otherwise display the error
        //regardless, clear the title input
        //so the user can enter the next new task
        task.save()
            .then(fetchTasks, displayError)
            .then(function() {
                titleInput.val('');
            });

        //some browsers also require that we return false to
        //prevent the default behavior
        return false;
    }); //on new task form submit

    //fetch the tasks to kick everything off...
    fetchTasks();

    //refetch the tasks every so often
    //to get new tasks created by others
    window.setInterval(fetchTasks, 10000);
}); //on doc ready
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
