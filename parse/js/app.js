/*
    script for the index.html file
*/

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
    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
    }

    function showSpinner() {
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
    }

    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
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